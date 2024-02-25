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

variable "API_SECRET" {
  type = string
}

data "archive_file" "auth" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/hello_world/bootstrap"
  output_path = "${path.module}/../zips/auth.zip"
}

resource "aws_lambda_function" "auth" {
  depends_on    = [data.archive_file.auth]
  function_name = "example_lambda_function"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/auth.zip"
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

data "archive_file" "get_user" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/get_user/bootstrap"
  output_path = "${path.module}/../zips/get_user.zip"
}

resource "aws_lambda_function" "get_user" {
  depends_on    = [data.archive_file.get_user]
  function_name = "get_user"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/get_user.zip"
  environment {
    variables = {
      "message"     = var.message,
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}
