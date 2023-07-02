package routes

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CompanyInput struct {
	Name        string `json:"name" binding:"required"`
	Industry    string `json:"industry" binding:"required"`
	Description string `json:"description" binding:"required"`
	URL         string `json:"url" binding:"required"`
	UserID      int    `json:"user_id" binding:"required"`
}

func GetAllCompanies(c *gin.Context) {
	companies, err := models.GetCompanies()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Companies Retrieved", "companies": companies})
}

func GetUserCompanies(c *gin.Context) {
	idparam := c.Param("userid")
	user_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	companies, err := models.GetCompaniesByUID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "company": companies})
}

func CreateCompany(c *gin.Context) {
	var input CompanyInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	company := models.Company{}

	company.Name = input.Name
	company.Industry = input.Industry
	company.Description = input.Description
	company.URL = input.URL
	company.UserID = input.UserID

	newEntry, err := company.SaveCompany()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Company Created", "company": newEntry})
}

func GetCompany(c *gin.Context) {
	idparam := c.Param("companyid")
	company_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	company, err := models.GetCompanyByID(company_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "company": company})
}

func DeleteCompany(c *gin.Context) {
	idparam := c.Param("companyid")
	company_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	company, err := models.DeleteCompanyByID(company_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Company Deleted", "company": company})
}

func UpdateCompany(c *gin.Context) {
	idparam := c.Param("companyid")
	company_id, err := strconv.Atoi(idparam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var input CompanyInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	company := models.Company{}

	company.Name = input.Name
	company.Description = input.Description
	company.URL = input.URL
	company.UserID = input.UserID

	updatedEntry, err := models.UpdateCompanyByID(company, company_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Company Updated", "company": updatedEntry})
}
