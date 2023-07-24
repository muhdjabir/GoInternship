package routes

import (
	"backend/models"
	"backend/utils/token"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DashboardData struct {
	Offered   int64                  `json:"offered"`
	Rejected  int64                  `json:"rejected"`
	Pending   int64                  `json:"pending"`
	Companies int64                  `json:"companies"`
	Sankey    []models.SankeyProcess `json:"sankey"`
}

func GetUserDashboard(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	offerCount, rejectCount, pendingCount, err := models.GetApplicationsTallyByUID(int(user_id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	companyCount, err := models.GetCompanyTallyByUID(int(user_id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	sankey := models.GetProcessByUID(int(user_id))
	data := DashboardData{
		Offered:   offerCount,
		Rejected:  rejectCount,
		Pending:   pendingCount,
		Companies: companyCount,
		Sankey:    sankey,
	}
	c.JSON(http.StatusOK, gin.H{"message": "success", "data": data})
}
