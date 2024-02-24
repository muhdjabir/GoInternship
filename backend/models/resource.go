package models

import (
	"backend/database"
	logging "backend/utils/log"
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
		logging.Error.Println(err.Error())
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

func GetResourcesByUID(userid int) ([]Resource, error) {
	var resources []Resource
	database.Database.Where("UserID = ?", userid).Find(&resources)
	return resources, nil
}

func GetResourceByID(resourceid int) (Resource, error) {

	var resource Resource

	if err := database.Database.First(&resource, resourceid).Error; err != nil {
		logging.Error.Println(err.Error())
		return resource, errors.New("Resource not found")
	}

	return resource, nil
}

func DeleteResourceByID(resourceid int) (Resource, error) {
	var resource Resource

	if err := database.Database.Delete(&Resource{}, resourceid).Error; err != nil {
		logging.Error.Println(err.Error())
		return resource, errors.New(("Resource not found"))
	}
	return resource, nil
}

func UpdateResourceByID(resource Resource, resourceid int) (Resource, error) {
	var updatedResource Resource
	if err := database.Database.First(&updatedResource, resourceid).Error; err != nil {
		logging.Error.Println(err.Error())
		return updatedResource, errors.New("Resource not found")
	}
	if err := database.Database.Model(&updatedResource).Updates(resource).Error; err != nil {
		logging.Error.Println(err.Error())
		return updatedResource, err
	}
	return updatedResource, nil
}
