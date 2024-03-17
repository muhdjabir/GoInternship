package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	cors "backend/utils/http"
	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	// Connect to Database
	log.Printf("Connecting to RDS")
	database.Connect()
	database.Database.AutoMigrate(&models.User{}, &models.Resource{}, &models.Company{}, &models.Application{})

	// Starting up gin server
	log.Printf("Auth cold start")
	router := gin.Default()
	router.Use(cors.CORSMiddleware())
	public := router.Group("/api/auth")
	public.GET("/healthz", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"status": "healthy",
		})
	})
	public.POST("/register", routes.Register)
	public.POST("/login", routes.Login)

	ginLambda = ginadapter.New(router)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
