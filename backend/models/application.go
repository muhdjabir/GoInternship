package models

import (
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
