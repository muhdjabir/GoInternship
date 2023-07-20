package models

import (
	"backend/database"
	"fmt"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Application struct {
	gorm.Model
	Role       string         `gorm:"not null;" json:"role"`
	Status     string         `gorm:"not null;" json:"status"`
	Process    pq.StringArray `gorm:"type:text[];" json:"process"`
	Platform   string         `gorm:"not null;" json:"platform"`
	Assessment string         `gorm:"not null;" json:"assessment"`
	Company    string         `gorm:"not null;" json:"company"`
	UserID     int
	CompanyID  int
}

func GetApplications() ([]Application, error) {
	var applications []Application
	result := database.Database.Find(&applications)
	fmt.Println(result)
	return applications, nil
}

func (application *Application) Create() (*Application, error) {
	if err := database.Database.Create(&application).Error; err != nil {
		return nil, err
	}
	return application, nil
}

func GetApplicationsByUID(userid int) ([]Application, error) {
	var applications []Application
	database.Database.Where("user_id = ?", userid).Find(&applications)
	return applications, nil
}
