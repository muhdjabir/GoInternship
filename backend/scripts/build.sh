#!/bin/bash
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 GOFLAGS=-trimpath go build -mod=readonly -ldflags='-s -w' -o ./bin/auth/bootstrap ./lambda/auth/hello-world