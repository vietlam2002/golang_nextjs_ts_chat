package upload

import (
	"bytes"
	"context"
	"fmt"
	"mime/multipart"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Service struct {
	minioClient *minio.Client
	bucketName  string
}

func NewService() *Service {
	endpoint := "localhost:9000"
	// accessKeyID := "e8NJMe7BHLQDCZZuWzjS"
	// secretAccessKey := "MXvyXoJVxj7FyVfDttgo83vIeIZnY1IR2mEP3D8q"
	accessKeyID := "WO95m9KIyr0Cyfsbg4oP"
	secretAccessKey := "SCtIF3rSUzyClTkZbSDBJhe3q8IuOkG5pNh9pKu4"
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

func (s *Service) UploadToMinio(fileHeader *multipart.FileHeader) (string, error) {
	// Mở file từ fileHeader
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	// Đọc nội dung file vào buffer
	buffer := bytes.NewBuffer(nil)
	_, err = buffer.ReadFrom(file)
	if err != nil {
		return "", err
	}

	// Upload file lên MinIO
	objectName := fmt.Sprintf("uploads/%s", fileHeader.Filename)
	_, err = s.minioClient.PutObject(context.Background(), s.bucketName, objectName, buffer, int64(buffer.Len()), minio.PutObjectOptions{
		ContentType: fileHeader.Header.Get("Content-Type"),
	})
	if err != nil {
		return "", err
	}

	// Tạo URL truy cập file
	fileURL := fmt.Sprintf("http://%s/%s/%s", "localhost:9000", s.bucketName, objectName)
	return fileURL, nil
}
