package util

import (
	"context"
	"log"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client

func InitMinIO(endpoint, accesskey, secretKey string) {
	var err error
	minioClient, err = minio.New(endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(accesskey, secretKey, ""),
	})
	if err != nil {
		log.Fatalf("Failed to initialize MinIO client: %v", err)
	}
}

func UploadFile(bucketName, objectName, filePath string) (string, error) {
	_, err := minioClient.FPutObject(context.Background(), bucketName, objectName, filePath, minio.PutObjectOptions{})
	if err != nil {
		return "", err
	}
	return minioClient.EndpointURL().String() + "/" + bucketName + "/" + objectName, nil
}

func GeneratePresignedURL(bucketName, objectName string, duration time.Duration) (string, error) {
	url, err := minioClient.PresignedGetObject(context.Background(), bucketName, objectName, duration, nil)
	if err != nil {
		return "", err
	}
	return url.String(), nil
}
