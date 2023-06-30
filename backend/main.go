package main

import (
	"backend/database"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")
	router.GET("/", GetUser)
	router.Run("0.0.0.0:8080")
}
