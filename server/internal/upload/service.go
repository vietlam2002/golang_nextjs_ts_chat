package upload

import (
	"bytes"
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Service struct {
	minioClient *minio.Client
	bucketName  string
}

func NewService() *Service {
	endpoint := "localhost:9000"
	accessKeyID := "minio"
	secretAccessKey := "minio123"
	useSSL := false

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		panic(err) // Tùy bạn, có thể xử lý lỗi tốt hơn
	}

	return &Service{
		minioClient: client,
		bucketName:  "datalake",
	}
}

func (s *Service) UploadToMinio(file *gin.MultipartFile) (string, error) {
	// Đọc file từ request
	fileData, err := file.Open()
	if err != nil {
		return "", err
	}
	defer fileData.Close()

	buffer := bytes.NewBuffer(nil)
	_, err = buffer.ReadFrom(fileData)
	if err != nil {
		return "", err
	}

	objectName := fmt.Sprintf("uploads/%s", file.Filename)
	_, err = s.minioClient.PutObject(context.Background(), s.bucketName, objectName, buffer, int64(buffer.Len()), minio.PutObjectOptions{
		ContentType: "application/octet-stream",
	})
	if err != nil {
		return "", err
	}

	fileURL := fmt.Sprintf("http://%s/%s/%s", "localhost:9000", s.bucketName, objectName)
	return fileURL, nil
}
