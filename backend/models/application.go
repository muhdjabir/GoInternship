package models

import (
	"backend/database"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Application struct {
	gorm.Model
	Role       string   `gorm:"not null;" json:"role"`
	Status     string   `gorm:"not null;" json:"status"`
	Process    []string `gorm:"not null;" json:"process"`
	Platform   string   `gorm:"not null;" json:"platform"`
	Assessment string   `gorm:"not null;" json:"assessment"`
	UserID     int
	CompanyID  int
}

func (application *Application) SaveApplication() (*Application, error) {
	err := database.Database.Create(&application).Error
	if err != nil {
		return &Application{}, err
	}
	return application, nil
}

func GetApplications() ([]Application, error) {
	var applications []Application
	result := database.Database.Find(&applications)
	fmt.Println(result)
	return applications, nil
}

func GetApplicationByID(applicationid int) (Application, error) {

	var application Application

	if err := database.Database.First(&application, applicationid).Error; err != nil {
		return application, errors.New("Application not found")
	}

	return application, nil
}

func DeleteApplicationByID(applicationid int) (Application, error) {
	var application Application

	if err := database.Database.Delete(&Application{}, applicationid).Error; err != nil {
		return application, errors.New(("Application not found"))
	}
	return application, nil
}

func UpdateApplicationByID(application Application, applicationid int) (Application, error) {
	var updatedApplication Application
	if err := database.Database.First(&updatedApplication, applicationid).Error; err != nil {
		return updatedApplication, errors.New("Application not found")
	}
	if err := database.Database.Model(&updatedApplication).Updates(application).Error; err != nil {
		return updatedApplication, err
	}
	return updatedApplication, nil
}
