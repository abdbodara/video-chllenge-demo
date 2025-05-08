
# Video Challenge API

## Overview

This project is a RESTful API for managing video challenges. It uses **TypeORM** with **PostgreSQL** as the database, and the API endpoints allow users to manage challenges with features such as creating, updating, deleting, and fetching challenges.

## Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL database (v12 or higher)
- TypeORM
- Git (for version control)

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/your-repository/video-challenge-api.git
cd video-challenge-api
````

### Step 2: Install Dependencies

Install all the required dependencies using npm or yarn.

```bash
npm install
```

### Step 3: Set Up Environment Variables

Copy the `.env.example` file to `.env` and configure the database connection details.

```bash
cp .env.example .env
```

#### Example `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=video_challenge_db
```

### Step 4: Install PostgreSQL

Ensure that you have **PostgreSQL** installed on your local machine. If it's not installed, follow the installation steps on the [official PostgreSQL website](https://www.postgresql.org/download/).

### Step 5: Database Setup

To create the database, you need to run the following command to ensure PostgreSQL creates the necessary tables.

First, **create the database** manually in PostgreSQL if it doesn't already exist.

```bash
psql -U postgres
CREATE DATABASE video_challenge_db;
```

### Step 6: Run Migrations

After setting up the environment variables and ensuring the database is created, run the migration commands to create the necessary tables based on your entities.

```bash
npx typeorm migration:run -d dist/data-source.js
```

This will generate and apply the necessary migrations based on your entity changes.

### Step 7: Start the project
```bash
npm run start:dev
```

## API Endpoints

### 1. **Create Challenge**

**URL**: `/api/challenges`
**Method**: `POST`
**Description**: Creates a new challenge.

#### Request Body:

```json
{
  "title": "Beginner Coding Challenge",
  "description": "Solve 5 coding problems in 7 days.",
  "category": "Coding",
  "durationInDays": 7,
  "visibility": "public",
  "difficulty": "easy"
}
```

#### Response:

* **Status**: `201 Created`
* **Body**:

```json
{
    "message": "Challenge successfully created",
    "data": {
        "title": "Morning Yoga Challenge",
        "description": "Complete 30 minutes of yoga every morning for 7 days.",
        "category": "Fitness",
        "durationInDays": 7,
        "visibility": "public",
        "id": 5
    }
}
```

### 2. **Get All Challenges**

**URL**: `/api/challenges`
**Method**: `GET`
**Description**: Retrieves a list of all challenges.

#### Response:

* **Status**: `200 OK`
* **Body**:

```json
{
    "message": "Challenges successfully fetched",
    "data": [
        {
            "id": 4,
            "title": "No Sugar Challenge",
            "description": "Avoid all added sugar for 5 days.",
            "category": "Health",
            "durationInDays": 5,
            "visibility": "private"
        },
        {
            "id": 3,
            "title": "7-Day Fitness Challenge",
            "description": "Complete a daily workout for 7 days.",
            "category": "Fitness",
            "durationInDays": 7,
            "visibility": "public"
        }
    ],
    "total": 2,
    "page": 1,
    "totalPages": 1
}
```

### 3. **Get Challenge by ID**

**URL**: `/api/challenges/:id`
**Method**: `GET`
**Description**: Retrieves a challenge by its ID.

#### Example Request:

```bash
GET /api/challenges/1
```

#### Response:

* **Status**: `200 OK`
* **Body**:

```json
{
    "message": "Challenge successfully fetched",
    "data": {
        "id": 3,
        "title": "7-Day Fitness Challenge",
        "description": "Complete a daily workout for 7 days.",
        "category": "Fitness",
        "durationInDays": 7,
        "visibility": "public"
    }
}
```

### 4. **Update Challenge**

**URL**: `/api/challenges/:id`
**Method**: `PUT`
**Description**: Updates a challenge.

#### Request Body:

```json
{
  "title": "Advanced Coding Challenge",
  "description": "Solve 20 coding problems in 14 days.",
  "category": "Coding",
  "durationInDays": 14,
  "visibility": "private",
  "difficulty": "hard"
}
```

#### Response:

* **Status**: `200 OK`
* **Body**:

```json
{
    "message": "Challenge successfully updated",
    "data": {
        "id": 5,
        "title": "Morning Yoga Challenge",
        "description": "Complete 30 minutes of yoga every morning for 7 days.",
        "category": "Fitness",
        "durationInDays": 7,
        "visibility": "public"
    }
}
```

### 5. **Delete Challenge**

**URL**: `/api/challenges/:id`
**Method**: `DELETE`
**Description**: Deletes a challenge by its ID.

#### Example Request:

```bash
DELETE /api/challenges/1
```

#### Response:

* **Status**: `204 No Content`
* **Body**: None.

```json
{
    "message": "Challenge successfully deleted"
}
```

## Migration Setup

To handle database schema changes, TypeORM provides migrations. Here’s how you can create and run migrations:

### Step 1: Create Migration

To create a migration file, run:

```bash
npx typeorm migration:create -n AddDifficultyColumn src/migrations/ 
```

### Step 2: Generate Migration

If you add new columns or change the schema, generate a migration that will update the database:

```bash
npx typeorm migration:generate -d dist/data-source.js -p src/migrations/UpdateChallengeTable
```

### Step 3: Run Migrations

After generating the migration, run the migrations to update the database schema:

```bash
npx typeorm migration:run -d dist/data-source.js
```

### Step 4: Revert Migrations (Optional)

If you need to revert the last migration, run:

```bash
npx typeorm migration:revert -d dist/data-source.js
```

## Troubleshooting

* **Cannot connect to database**: Double-check your PostgreSQL credentials in the `.env` file.
* **Migration errors**: Ensure you have applied the necessary migrations with `npx typeorm migration:run`.

## Conclusion

This project provides a simple API to manage video challenges. we can extend it by adding features like user authentication, challenge categories, or other additional fields. Use migrations to track and apply schema changes in a controlled manner.

