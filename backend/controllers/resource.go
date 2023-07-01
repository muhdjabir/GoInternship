package controllers

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ResourceInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	URL         string `json:"url" binding:"required"`
	UserID      int    `json:"user_id" binding:"required"`
}

func GetAllResources(c *gin.Context) {
	resources, err := models.GetResources()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "data": resources})
}

func CreateResource(c *gin.Context) {
	var input ResourceInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resource := models.Resource{}

	resource.Title = input.Title
	resource.Description = input.Description
	resource.URL = input.URL
	resource.UserID = input.UserID

	newEntry, err := resource.SaveResource()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": newEntry})
}

func GetResource(c *gin.Context) {
	idparam := c.Param("id")
	resource_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	resource, err := models.GetResourceByID(resource_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "data": resource})
}
