const express = require('express');
const cors = require('cors');
const app = express(); 
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
// middleware
app.use(cors())
app.use(express.json())
// mongo connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gr8kgxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('TaskHive');
    const taskCollection = db.collection('tasks');
    const userCollection = db.collection('users');
    
    // get task
    app.get('/addTasks', async (req, res)=>{
      const tasks = taskCollection.find()
      const result = await tasks.toArray()
      res.send(result) 
    })
    
    // post task
    app.post('/addTasks', async(req, res)=>{
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("TaskHive Make There Server Successfully")
})

app.listen(port, ()=>{
    console.log(`TaskHive Server Port Running on ${port}`);
})

// sCOdHDDPZ3fZ0WZP
// TaskHive_plartform