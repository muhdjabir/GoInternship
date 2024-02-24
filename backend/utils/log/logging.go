package logging

import (
	"log"
	"os"
)

var (
	Info    = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)
	Warning = log.New(os.Stdout, "WARNING: ", log.Ldate|log.Ltime)
	Error   = log.New(os.Stdout, "ERROR: ", log.Ldate|log.Ltime)
)
