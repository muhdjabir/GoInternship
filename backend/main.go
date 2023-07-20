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
	database.Database.AutoMigrate(&models.User{}, &models.Resource{}, &models.Company{}, &models.Application{})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func setRoutes() {
	router := gin.Default()
	fmt.Println("Server is listening at PORT:8080")
	router.Use(CORSMiddleware())

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

	// Resources Routes
	protected.GET("/resource", routes.GetAllResources)
	protected.GET("/resource/:resourceid", routes.GetResource)
	protected.GET("/resource/user/:userid", routes.GetUserResources)
	protected.POST("/resource", routes.CreateResource)
	protected.DELETE("/resource/:resourceid", routes.DeleteResource)
	protected.PATCH("/resource/:resourceid", routes.UpdateResource)

	// Company Routes
	protected.GET("/company", routes.GetAllCompanies)
	protected.GET("/company/:companyid", routes.GetCompany)
	protected.GET("/company/user/:userid", routes.GetUserCompanies)
	protected.POST("/company", routes.CreateCompany)
	protected.DELETE("/company/:companyid", routes.DeleteCompany)
	protected.PATCH("/company/:companyid", routes.UpdateCompany)

	// Application Routes
	protected.GET("/application", routes.GetAllApplications)
	protected.GET("/application/:applicationid", routes.GetApplication)
	protected.GET("/application/user/:userid", routes.GetUserApplications)
	protected.POST("/application", routes.CreateApplication)
	protected.DELETE("/application/:applicationid", routes.DeleteApplication)
	protected.PATCH("/application/:applicationid", routes.UpdateApplication)
	router.Run("0.0.0.0:8080")
}
