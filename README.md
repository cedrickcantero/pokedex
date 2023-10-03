# Pokedex Application

## Overview

The Pokedex Application serves as your go-to encyclopedia for everything Pokémon! Utilizing a clean and responsive interface, you can easily search and filter Pokémon based on various criteria—be it their types, moves, items, or even specific names. Get detailed information on each and broaden your Pokémon knowledge.

### Features
- **Search by Moves**: Browse through an extensive list of moves and find out which Pokémon can perform them. Easily filter them by their move types.

- **Search by Types**: Want to know which Pokémon are Fire type or Water type? 

- **Search by Pokémon**: Know the Pokémon but not its capabilities? Search by name to get detailed stats and move lists. Easily filter them by their elemental types.
 

- **Search by Items**: Curious about what items can do? Search and get in-depth details about each item.

Scroll down for setup instructions.

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

### For Running MongoDB Locally

If the user doesn't want to Dockerize MongoDB, they have a few options:

1. **Local Installation**: They can install MongoDB locally on their machine and run it as a service. You'll need to update your MongoDB connection string to point to the local instance.

2. **Cloud Service**: They could use a cloud-based MongoDB service like MongoDB Atlas. Again, you'll need to update your MongoDB connection string accordingly.

3. **Manual Docker Run**: If they still want to use Docker but don't want to use Docker Compose, they can manually run a MongoDB Docker container with a custom command.

For any of these options, you'll have to modify your MongoDB connection URI in your `connectMongoDB` function to connect to the chosen MongoDB instance.