package models

import (
	"backend/database"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name        string `gorm:"not null;" json:"name"`
	Industry    string `gorm:"not null;" json:"industry"`
	Description string `gorm:"not null;" json:"description"`
	URL         string `gorm:"not null;" json:"url"`
	UserID      int
}

func (company *Company) SaveCompany() (*Company, error) {
	err := database.Database.Create(&company).Error
	if err != nil {
		return &Company{}, err
	}
	return company, nil
}

func GetCompanies() ([]Company, error) {
	var companies []Company
	result := database.Database.Find(&companies)
	fmt.Println(result)
	return companies, nil
}

func GetCompanyByID(companyid int) (Company, error) {

	var company Company

	if err := database.Database.First(&company, companyid).Error; err != nil {
		return company, errors.New("Company not found")
	}

	return company, nil
}

func DeleteCompanyByID(companyid int) (Company, error) {
	var company Company

	if err := database.Database.Delete(&Company{}, companyid).Error; err != nil {
		return company, errors.New(("Company not found"))
	}
	return company, nil
}

func UpdateCompanyByID(company Company, companyid int) (Company, error) {
	var updatedCompany Company
	if err := database.Database.First(&updatedCompany, companyid).Error; err != nil {
		return updatedCompany, errors.New("Company not found")
	}
	if err := database.Database.Model(&updatedCompany).Updates(company).Error; err != nil {
		return updatedCompany, err
	}
	return updatedCompany, nil
}
