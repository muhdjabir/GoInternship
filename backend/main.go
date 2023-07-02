package main

import (
	"backend/database"
	"backend/middlewares"
	"backend/models"
	"backend/routes"
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
	database.Database.AutoMigrate(&models.Resource{})
}

func setRoutes() {
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")

	// Public Routes
	public := router.Group("/api")
	public.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to GoInternship Golang Web App"})
	})
	public.POST("/register", routes.Register)
	public.POST("/login", routes.Login)

	// Protected Routes
	protected := router.Group("/api/admin")
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.GET("/user", routes.CurrentUser)
	protected.GET("/resource", routes.GetAllResources)
	protected.GET("/resource/:id", routes.GetResource)
	protected.POST("/resource", routes.CreateResource)
	protected.DELETE("/resource/:id", routes.DeleteResource)
	protected.PATCH("/resource/:id", routes.UpdateResource)
	router.Run("0.0.0.0:8080")
}
