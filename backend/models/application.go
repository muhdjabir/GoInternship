package models

import (
	"backend/database"
	"errors"
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

type SankeyProcess struct {
	Source string `json:"source"`
	Target string `json:"target"`
	Count  int    `json:"count"`
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

func GetApplicationByID(applicationid int) (Application, error) {

	var application Application

	if err := database.Database.First(&application, applicationid).Error; err != nil {
		return application, errors.New("Application not found")
	}

	return application, nil
}

func GetApplicationsByUID(userid int) ([]Application, error) {
	var applications []Application
	database.Database.Where("user_id = ?", userid).Find(&applications)
	return applications, nil
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

func GetApplicationsTallyByUID(userid int) (int64, int64, int64, error) {
	var offerCount int64
	var rejectCount int64
	var pendingCount int64
	database.Database.Model(&Application{}).Where("user_id = ? AND status = ?", userid, "Offered").Count(&offerCount)
	database.Database.Model(&Application{}).Where("user_id = ? AND status = ?", userid, "Rejected").Count(&rejectCount)
	database.Database.Model(&Application{}).Where("user_id = ? AND status = ?", userid, "Pending").Count(&pendingCount)
	return offerCount, rejectCount, pendingCount, nil
}

func GetProcessByUID(userid int) []SankeyProcess {
	var applications []pq.StringArray
	database.Database.Model(&Application{}).Select("process").Where("user_id = ?", userid).Find(&applications)
	destinations := generateMap()
	for i := 0; i < len(applications); i++ {
		for j := 0; j < len(applications[i])-1; j++ {
			fmt.Println(applications[i][j])
			destinations[applications[i][j]][applications[i][j+1]] += 1
		}
	}
	sankey := generateSankey(destinations)
	return sankey
}

func generateMap() map[string]map[string]int {
	destinations := map[string]map[string]int{}
	destinations["Applied"] = make(map[string]int)
	destinations["Applied"]["Online Assessment"] = 0
	destinations["Applied"]["Interview"] = 0
	destinations["Applied"]["Ghosted"] = 0
	destinations["Applied"]["Offered"] = 0
	destinations["Applied"]["Rejected"] = 0
	destinations["Online Assessment"] = make(map[string]int)
	destinations["Online Assessment"]["Interview"] = 0
	destinations["Online Assessment"]["Ghosted"] = 0
	destinations["Online Assessment"]["Offered"] = 0
	destinations["Online Assessment"]["Rejected"] = 0
	destinations["Interview"] = make(map[string]int)
	destinations["Interview"]["Ghosted"] = 0
	destinations["Interview"]["Offered"] = 0
	destinations["Interview"]["Rejected"] = 0
	return destinations
}

func generateSankey(process map[string]map[string]int) []SankeyProcess {
	var sankey []SankeyProcess
	for source, destination := range process {
		for target, count := range destination {
			if count == 0 {
				continue
			}
			sankey = append(sankey, SankeyProcess{
				Source: source,
				Target: target,
				Count:  count,
			})
		}
	}
	return sankey
}
