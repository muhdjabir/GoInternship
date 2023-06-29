package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")
	router.GET("/", GetUser)
	router.Run("0.0.0.0:8080")
}
