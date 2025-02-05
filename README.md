# CreditSea Fullstack Engineer Assignment

## Overview

A fullstack MERN (MongoDB, Express, React, Node.js) application that processes XML files containing soft credit pull data from Experian. The application allows users to upload XML files, extracts relevant data, stores it in MongoDB, and provides a user-friendly frontend for viewing reports.

## Features
- **XML Upload API**: Accepts and validates XML file uploads.
- **Data Extraction & Storage**: Parses XML files and stores extracted information in MongoDB Database.
- **Report Generation**: Displays extracted credit report data via a React frontend.
- **RESTful API**: Provides endpoints for data retrieval and display.
- **Error Handling & Logging**: Ensures robust handling of edge cases.

## Tech Stack
- **Backend**: Node.js, Express.js, Multer (for file upload), xml2js (for XML parsing), MongoDB (Mongoose ORM)
- **Frontend**: React.js, React Router, Axios (for API requests)
- **Database**: MongoDB

## Installation & Setup
### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Git installed

### Clone the Repository

```sh
git clone <repository-url>
cd creditsea-fullstack-assignment
```

#### Backend Setup

```sh
cd backend
npm install

PORT=3000
MONGO_URI=<your_mongodb_connection_string>

npm run dev
```

#### Frontend Setup

```sh
cd frontend
npm install
npm start
```

## API Endpoints

### Upload XML File

### Retrieve All Reports



## Schema Design


## Testing


## Folder Structure

```
creditsea-fullstack-assignment/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
|   ├── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
├── README.md
```

## Demo Video & Screenshots

## Contributing