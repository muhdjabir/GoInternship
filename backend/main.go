package main

import (
	"backend/controllers"
	"backend/database"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to GoInternship Golang Web App"})
	})
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.Run("0.0.0.0:8080")
}
