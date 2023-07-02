package routes

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
	c.JSON(http.StatusOK, gin.H{"message": "Resources Retrieved", "resources": resources})
}

func GetUserResources(c *gin.Context) {
	idparam := c.Param("userid")
	user_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	resources, err := models.GetResourcesByUID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "company": resources})
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

	c.JSON(http.StatusOK, gin.H{"message": "Resource Created", "resource": newEntry})
}

func GetResource(c *gin.Context) {
	idparam := c.Param("resourceid")
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
	c.JSON(http.StatusOK, gin.H{"message": "success", "resource": resource})
}

func DeleteResource(c *gin.Context) {
	idparam := c.Param("resourceid")
	resource_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	resource, err := models.DeleteResourceByID(resource_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Resource Deleted", "resource": resource})
}

func UpdateResource(c *gin.Context) {
	idparam := c.Param("resourceid")
	resource_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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

	updatedEntry, err := models.UpdateResourceByID(resource, resource_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Resource Updated", "resource": updatedEntry})
}
