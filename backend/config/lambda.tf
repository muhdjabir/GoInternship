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
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}

data "archive_file" "application" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/application/bootstrap"
  output_path = "${path.module}/../zips/application.zip"
}

resource "aws_lambda_function" "application" {
  depends_on    = [data.archive_file.application]
  function_name = "application"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/application.zip"
  environment {
    variables = {
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}

data "archive_file" "company" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/company/bootstrap"
  output_path = "${path.module}/../zips/company.zip"
}

resource "aws_lambda_function" "company" {
  depends_on    = [data.archive_file.company]
  function_name = "company"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/company.zip"
  environment {
    variables = {
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}

data "archive_file" "dashboard" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/dashboard/bootstrap"
  output_path = "${path.module}/../zips/dashboard.zip"
}

resource "aws_lambda_function" "dashboard" {
  depends_on    = [data.archive_file.dashboard]
  function_name = "dashboard"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/dashboard.zip"
  environment {
    variables = {
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}

data "archive_file" "resource" {
  # depends_on = [null_resource.function_binary]
  type        = "zip"
  source_file = "${path.module}/../bin/resource/bootstrap"
  output_path = "${path.module}/../zips/resource.zip"
}

resource "aws_lambda_function" "resource" {
  depends_on    = [data.archive_file.resource]
  function_name = "resource"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main"
  runtime       = "provided.al2023"
  filename      = "${path.module}/../zips/resource.zip"
  environment {
    variables = {
      "DB_HOST"     = var.DB_HOST,
      "DB_USER"     = var.DB_USER,
      "DB_PASSWORD" = var.DB_PASSWORD,
      "DB_NAME"     = var.DB_NAME,
      "API_SECRET"  = var.API_SECRET
    }
  }
}
