const express = require('express');
const cors = require('cors');
const app = express(); 
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient, ObjectId } = require('mongodb');
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
    app.get('/tasks', async (req, res)=>{
      const tasks = taskCollection.find()
      const result = await tasks.toArray()
      res.send(result) 
    })
    // get task with user email
    app.get('/myPostTasks/:email', async(req, res)=>{
        const email = req.params.email;
        const query = {email:email}
        const result =await taskCollection.find(query).toArray()
        res.send(result)  
    })   
    // find one task 
    app.get('/task/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id:new ObjectId(id)}
        const task = await taskCollection.findOne(query)
        res.send(task)
    })
    // post task
    app.post('/tasks', async(req, res)=>{
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
    })
    // delete my task
    app.delete('/myPostTasks/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await taskCollection.deleteOne(query)
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