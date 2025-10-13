const express = require('express');
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("TaskHive Make There Server Successfully")
})

app.listen(port, ()=>{
    console.log(`TaskHive Server Port Running on ${port}`);
})


// sCOdHDDPZ3fZ0WZP
// TaskHive_plartform