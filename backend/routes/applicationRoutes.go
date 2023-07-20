package routes

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// "github.com/lib/pq"

type ApplicationInput struct {
	Role       string   `json:"role" binding:"required"`
	Status     string   `json:"status" binding:"required"`
	Process    []string `json:"process" binding:"required"`
	Platform   string   `json:"platform" binding:"required"`
	Assessment string   `json:"assessment" binding:"required"`
	Company    string   `json:"company" binding:"required"`
	UserID     int      `json:"user_id" binding:"required"`
	CompanyID  int      `json:"company_id" binding:"required"`
}

func GetAllApplications(c *gin.Context) {
	applications, err := models.GetApplications()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Applications Retrieved", "applications": applications})
}

func CreateApplication(c *gin.Context) {
	var input ApplicationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	application := models.Application{
		Role:       input.Role,
		Status:     input.Status,
		Process:    input.Process,
		Platform:   input.Platform,
		Assessment: input.Assessment,
		Company:    input.Company,
		UserID:     input.UserID,
		CompanyID:  input.CompanyID,
	}

	newApplication, err := application.Create()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application created successfully", "application": newApplication})
}

func GetApplication(c *gin.Context) {
	idparam := c.Param("applicationid")
	application_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	application, err := models.GetApplicationByID(application_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "application": application})
}

func GetUserApplications(c *gin.Context) {
	idparam := c.Param("userid")
	user_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	applications, err := models.GetApplicationsByUID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "applications": applications})
}
