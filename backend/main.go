package main

import (
	"backend/controllers"
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	migrations()
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to GoInternship Golang Web App"})
	})
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.Run("0.0.0.0:8080")
}

func migrations() {
	fmt.Println("Running Migrations")
	database.Database.AutoMigrate(&models.User{})
}
