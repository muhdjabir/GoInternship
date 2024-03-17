#!/bin/bash
terraform apply -var="TOKEN_HOUR_LIFESPAN=$TOKEN_HOUR_LIFESPAN" \
    -var="DB_HOST=$DB_HOST" \
    -var="DB_USER=$DB_USER" \
    -var="DB_PASSWORD=$DB_PASSWORD" \
    -var="DB_NAME=$DB_NAME" \
    -var="API_SECRET=$API_SECRET"

terraform destroy -var="TOKEN_HOUR_LIFESPAN=$TOKEN_HOUR_LIFESPAN" \
    -var="DB_HOST=$DB_HOST" \
    -var="DB_USER=$DB_USER" \
    -var="DB_PASSWORD=$DB_PASSWORD" \
    -var="DB_NAME=$DB_NAME" \
    -var="API_SECRET=$API_SECRET"