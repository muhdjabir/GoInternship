resource "null_resource" "function_binary" {
    provisioner "local-exec" {
      command = "GOOS=linux GOARCH=amd64 CGO_ENABLED=0 GOFLAGS=-trimpath go build -mod=readonly -ldflags='-s -w' -o ${path.module}/bin/hello_world ${path.module}/backend/lambda/auth/hello-world"
    }
}

data "archive_file" "example" {
    depends_on = [null_resource.function_binary]
    type = "zip"
    source_dir = "${path.module}/bin/hello_world"
    output_path = "${path.module}/zips/example.zip"
}

resource "aws_lambda_function" "hello_world" {
    function_name = "example_lambda_function"
    role = aws_iam_role.lambda_role.arn
    handler = "main"
    runtime = "go1.x"
    filename = "${path.module}/zips/example.zip"
}