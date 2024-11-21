# Stage 1: Build stage
FROM golang:1.23.3-alpine AS builder

# Set working directory
WORKDIR /app

# Install required build tools
RUN apk add --no-cache git

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server ./cmd

# Stage 2: Run stage
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/server .

# Expose the application port (default for Gin is 8080)
EXPOSE 5002

# Command to run the application
CMD ["./server"]
