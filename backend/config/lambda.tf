variable "message" {
  type = string
}

variable "DB_HOST" {
  type = string
}

variable "DB_USER" {
  type = string
}

variable "DB_PASSWORD" {
  type = string
}

variable "DB_NAME" {
  type = string
}

data "archive_file" "example" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/hello_world/bootstrap"
  output_path = "${path.module}/../zips/example.zip"
}

resource "aws_lambda_function" "hello_world" {
  depends_on    = [data.archive_file.example]
  function_name = "example_lambda_function"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/example.zip"
  environment {
    variables = {
      "message"     = var.message,
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
    }
  }
}
