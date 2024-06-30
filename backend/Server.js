const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => { console.log(error) })


const todoSchema = new mongoose.Schema({
    text : String , 
    completed : Boolean
});

const todo = new mongoose.model('Todo',todoSchema);

app.get('/todos', async(req,res)=>{
    const todos = await todo.find();
    res.json(todos);
});

app.post('/todos',async(req,res)=>{
    const newTodo = new todo({
        text : req.body.text,
        completed : false,
    });
    const savetodo = await newTodo.save();
    res.json(savetodo);
});

app.put('/todos/:id',async(req,res)=>{
    const updateTodo = await todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTodo);
});

app.delete('/todos/:id',async(req,res)=>{
    const deletetodo = await todo.findByIdAndDelete(req.params.id);
    res.json(deletetodo);
})


app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT} `);
})