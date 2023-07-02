package models

import (
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
