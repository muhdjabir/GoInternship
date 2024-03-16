resource "aws_apigatewayv2_api" "lambdagateway" {
  name          = "gointernship"
  description   = "API Gateway for GoInternship lambda functions"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambdastage" {
  api_id      = aws_apigatewayv2_api.lambdagateway.id
  name        = "$default"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn
    format = jsonencode({
      "requestId" : "$context.requestId",
      "extendedRequestId" : "$context.extendedRequestId",
      "ip" : "$context.identity.sourceIp",
      "caller" : "$context.identity.caller",
      "user" : "$context.identity.user",
      "requestTime" : "$context.requestTime",
      "httpMethod" : "$context.httpMethod",
      "resourcePath" : "$context.resourcePath",
      "status" : "$context.status",
      "protocol" : "$context.protocol",
      "responseLength" : "$context.responseLength",
      "integrationErrorMessage" : "$context.integrationErrorMessage",
      "errorMessage" : "$context.error.message",
      "errorResponseType" : "$context.error.responseType"
    })
  }
}

resource "aws_apigatewayv2_route" "lambda_get_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "ANY /api"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_get_integration.id}"
}


resource "aws_apigatewayv2_integration" "lambda_get_integration" {
  description          = "HTTP Integration HTTP GET to Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.auth.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_get" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "lambda_get_user_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "GET /api/admin/user"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_get_user_integration.id}"
}

resource "aws_apigatewayv2_integration" "lambda_get_user_integration" {
  description          = "HTTP Integration HTTP GET to Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.get_user.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_get_user" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_user.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "lambda_application_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "ANY /api/admin/application"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_application_integration.id}"
}

resource "aws_apigatewayv2_integration" "lambda_application_integration" {
  description          = "HTTP Integration HTTP GET to Application Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.application.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_application" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.application.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "lambda_company_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "ANY /api/admin/company"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_company_integration.id}"
}

resource "aws_apigatewayv2_integration" "lambda_company_integration" {
  description          = "HTTP Integration HTTP GET to Company Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.company.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_company" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.company.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "lambda_dashboard_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "ANY /api/admin/dashboard"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_dashboard_integration.id}"
}

resource "aws_apigatewayv2_integration" "lambda_dashboard_integration" {
  description          = "HTTP Integration HTTP GET to Dashboard Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.dashboard.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_dashboard" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.dashboard.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "lambda_resource_route" {
  api_id    = aws_apigatewayv2_api.lambdagateway.id
  route_key = "ANY /api/admin/resource"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_resource_integration.id}"
}

resource "aws_apigatewayv2_integration" "lambda_resource_integration" {
  description          = "HTTP Integration HTTP GET to resource Lambda"
  api_id               = aws_apigatewayv2_api.lambdagateway.id
  integration_type     = "AWS_PROXY"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.resource.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_lambda_permission" "api_gw_resource" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.resource.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambdagateway.execution_arn}/*/*"
}
