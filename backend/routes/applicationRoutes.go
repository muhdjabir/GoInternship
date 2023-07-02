package routes

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ApplicationInput struct {
	Role       string   `json:"role" binding:"required"`
	Status     string   `json:"status" binding:"required"`
	Process    []string `json:"process" binding:"required"`
	Platform   string   `json:"platform" binding:"required"`
	Assessment string   `json:"assessment" binding:"required"`
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

	application := models.Application{}

	application.Role = input.Role
	application.Status = input.Status
	application.Process = input.Process
	application.Platform = input.Platform
	application.Assessment = input.Assessment
	application.UserID = input.UserID
	application.CompanyID = input.CompanyID

	newEntry, err := application.SaveApplication()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application Created", "application": newEntry})
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
	applications, err := models.GetResourcesByUID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "company": applications})
}

func DeleteApplication(c *gin.Context) {
	idparam := c.Param("applicationid")
	application_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	application, err := models.DeleteApplicationByID(application_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Application Deleted", "application": application})
}

func UpdateApplication(c *gin.Context) {
	idparam := c.Param("applicationid")
	application_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var input ApplicationInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	application := models.Application{}

	application.Role = input.Role
	application.Status = input.Status
	application.Process = input.Process
	application.Platform = input.Platform
	application.Assessment = input.Assessment
	application.UserID = input.UserID
	application.CompanyID = input.CompanyID

	updatedEntry, err := models.UpdateApplicationByID(application, application_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application Updated", "application": updatedEntry})
}
