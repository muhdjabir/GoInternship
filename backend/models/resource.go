package models

import (
	"backend/database"
	"errors"

	// "html"
	// "strings"
	"fmt"

	"gorm.io/gorm"
)

type Resource struct {
	gorm.Model
	Title       string `gorm:"not null;" json:"title"`
	Description string `gorm:"not null;" json:"description"`
	URL         string `gorm:"not null;" json:"url"`
	UserID      int
}

func (resource *Resource) SaveResource() (*Resource, error) {
	err := database.Database.Create(&resource).Error
	if err != nil {
		return &Resource{}, err
	}
	return resource, nil
}

func GetResources() ([]Resource, error) {
	var resources []Resource
	result := database.Database.Find(&resources)
	fmt.Println(result)
	return resources, nil
}

func GetResourceByID(resourceid int) (Resource, error) {

	var resource Resource

	if err := database.Database.First(&resource, resourceid).Error; err != nil {
		return resource, errors.New("Resource not found")
	}

	return resource, nil

}
