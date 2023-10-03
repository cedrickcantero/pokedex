# Pokedex Application

## Prerequisites

- Docker
- Docker Compose
- Node.js and npm (if you choose to run manually)

## Setup and Running with Docker Compose

### Step 1: Clone the repository

```bash
git clone https://github.com/cedrickcantero/pokedex
cd pokedex
```

### Step 2: Build Docker Containers

```bash
docker-compose up --build
```

#### Note: core-api will be running on port 3001 and core-app on port 3000.

## Manual Running (Optional)
##### If you wish to run the core-api and core-app manually, but want MongoDB running as a Docker container, you can follow these steps:

### Step 1: Start MongoDB Docker Container

```bash
docker-compose up mongo
```

### Step 2:  core-api and core-app Folders

```bash
1. npm install
2. npm start
```


#### Note: Make sure the MongoDB container is running before you start the applications manually.