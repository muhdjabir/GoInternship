#!/bin/bash
terraform apply -var="message=Hooray!" \
    -var="DB_HOST=$DB_HOST" \
    -var="DB_USER=$DB_USER" \
    -var="DB_PASSWORD=$DB_PASSWORD" \
    -var="DB_NAME=$DB_NAME" \
    -var="API_SECRET=$API_SECRET"