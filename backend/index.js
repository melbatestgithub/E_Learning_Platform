const express = require('express');
const authRoute = require('./routes/Users');
const courseRoute = require('./routes/Courses');
const lessonRoute = require('./routes/Lesson');
const quizRoute = require('./routes/Quiz');
const cors=require('cors')
const app = express();

const DbConnection = require('./config/DatabaseConnection');
const port = 5600;

app.use(express.json());
app.use(cors())

app.use('/user', authRoute);
app.use('/course', courseRoute);
app.use('/lesson', lessonRoute);
app.use('/quiz', quizRoute);

const CheckDBConnection = async () => {
    try {
        // Connect to the database first
        await DbConnection();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });

    } catch (error) {
        console.error("Unable to Connect to Database:", error);
    }
}

CheckDBConnection();
