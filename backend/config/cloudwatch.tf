resource "aws_cloudwatch_log_group" "api_gw" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.lambdagateway.name}"
  retention_in_days = 14
}

# resource "aws_cloudwatch_log_group" "lambda_get" {
#   name              = "/aws/lambda/${aws_lambda_function.hello_world.function_name}"
#   retention_in_days = 14
# }
