package main

import (
	"fmt"
	"log"
	"server/db"
	"server/internal/upload"
	"server/internal/user"
	"server/internal/ws"
	"server/router"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("could not initialize database connection: %s", err)
	} else {
		fmt.Printf("connected database!")
		dbConn.GetDB()
	}

	// Handle sẽ xử lí yêu cầu từ router, sau đó handle gọi service -> repo -> database
	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	// Khởi tạo module upload
	uploadService := upload.NewService() // Nếu cần, bạn có thể truyền thêm tham số cấu hình vào đây
	uploadHandler := upload.NewHandler(uploadService)

	router.InitRouter(userHandler, wsHandler, uploadHandler) //Thêm upload.NewHandler
	router.Start("0.0.0.0:5000")
}
