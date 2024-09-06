# E-Learning Platform

This is a comprehensive E-learning platform built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform supports three types of users: Admin, Student, and Instructor.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles and Capabilities](#user-roles-and-capabilities)

## Features
- **Admin**: 
  - Add new courses.
  - Assign instructors to courses.
  - Manage students and instructors.

- **Instructor**:
  - Create and manage lessons.
  - Design and publish quizzes for their assigned courses.

- **Student**:
  - Enroll in courses.
  - Access lessons and quizzes assigned to the courses they are enrolled in.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS/SCSS

## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/e-learning-platform.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd e-learning-platform
    ```

3. **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

4. **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

5. **Set up environment variables:**
   Create a `.env` file in the `server` directory and add the following environment variables:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
## Usage
- **Admin Dashboard**: Manage courses, instructors, and students.
- **Instructor Panel**: Create lessons and quizzes, view student progress.
- **Student Portal**: Enroll in courses, access lessons, and take quizzes.

## User Roles and Capabilities
- **Admin**:
  - Add and manage courses.
  - Assign instructors to specific courses.
  - Manage user accounts (students and instructors).

- **Instructor**:
  - Create lessons and quizzes.
  - Manage content for assigned courses.
  - Monitor student progress.

- **Student**:
  - Enroll in available courses.
  - Access course materials, including lessons and quizzes.
  - Track their progress in the enrolled courses.


## Contact
For any inquiries or feedback, please reach out to:
- **Name**: Melaku Zeleke
- **Email**: melakuzeleke443@example.com

