package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
	Name string `json:"name"`
}

func HandleRequest(ctx context.Context, event interface{}) (string, error) {
	message := fmt.Sprintf("Hello %s!", "world")
	return message, nil
}

func main() {
	lambda.Start(HandleRequest)
}
