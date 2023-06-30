# Latest golang image on apline linux
FROM golang:1.20-alpine

# Work directory
WORKDIR /backend

# Installing dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copying all the files
COPY . .

# Starting our application
CMD ["go", "run", "."]

# Exposing server port
EXPOSE 8080