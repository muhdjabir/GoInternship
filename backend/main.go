package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	fmt.Println("Server is listening")
	router.GET("/", GetUser)
	router.Run("localhost:8080")
}
