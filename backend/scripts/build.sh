#!/bin/bash
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 GOFLAGS=-trimpath go build -mod=readonly -ldflags='-s -w' -o ./bin/hello_world/bootstrap ./lambda/auth/hello-world