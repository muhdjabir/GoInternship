package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	fmt.Println("API SERVICE WORKING")
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Your first API ENDPOINT"})
}
