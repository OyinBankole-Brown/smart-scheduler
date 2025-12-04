// IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('./models/Task');

const app = express();
app.use(express.json());
app.use(cors());


// CONFIGS
//setup Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("DB Error:",err));


// ROUTES
// generate AI breakdown for a task
app.post('/api/generate-task', async (req, res) => {
    const { title } = req.body;

    try{
        // prompt the AI
        const prompt = `You are a productivity assistant. Break this task into 3 short, actionable sub-steps. Return ONLY a comma-separated list (e.g. Step 1, Step 2, Step 3). 
        Task: ${title}`;

        //generate response from AI
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const subSteps = text.split(',').map(step => ({ step: step.trim() }));

        // save to MongoDB
        const newTask = new Task({
            title: title,
            aiBreakdown: subSteps
        });

        await newTask.save();
        res.json(newTask);

    } catch (error){
        console.error(error);
        res.status(500).send("Error generating task breakdown");
    }
});

// get all tasks to show on screen
app.get('/api/tasks', async (req, res) => {
  try {
    // 1. Fetch all tasks first (without sorting in DB to avoid crash)
    const tasks = await Task.find();
    
    // 2. Sort them manually in JavaScript (Newest first)
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));