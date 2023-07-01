package main

import (
	"backend/controllers"
	"backend/database"
	"backend/middlewares"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	loadDatabase()
	setRoutes()
}

func loadDatabase() {
	database.Connect()
	fmt.Println("Running Migrations")
	database.Database.AutoMigrate(&models.User{})
}

func setRoutes() {
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")

	// Public Routes
	public := router.Group("/api")
	public.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to GoInternship Golang Web App"})
	})
	public.POST("/register", controllers.Register)
	public.POST("/login", controllers.Login)

	// Protected Routes
	protected := router.Group("/api/admin")
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.GET("/user", controllers.CurrentUser)
	router.Run("0.0.0.0:8080")
}
