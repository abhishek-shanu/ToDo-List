require("dotenv").config(); 
const express = require('express')
const bodyParser= require('body-parser');
const cors=require('cors');
const path = require('path');
const mongoose = require("mongoose");
const { response } = require("express");

const app= express()
const port = process.env.PORT || 3001

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const toDoListSchema = new mongoose.Schema({
    item_:String
});
const item = mongoose.model('item', toDoListSchema);

app.get('/get',(req,res)=>{
    console.log("server /")
    item.find({},(found,err)=>{
        if(!err){
            // console.log(found)
            res.send(found)
        }
        // console.log(err);
        res.send(err);
    })
})

app.post('/post',(req,res)=>{
    const toDoIte = new item({
        item_:req.body.toDoContent
    });
    toDoIte.save()
    .then((response) =>res.send(response))
    .catch((errors)=>{
        console.log("Problem in saving in the database")
        res.send("Not connected to the database")
    })
    // console.log(req.body)
})

app.delete('/delete',(req,res)=>{
    if(!Object.keys(req.body).length){
        item.deleteMany({})
        .then((response)=>{
            res.send("data deleted")
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    else{
        item.deleteOne({_id:req.body.id})
        .then((response)=>{
            console.log("delete one response to client",response)
            res.send(response)
        })
        .catch((err)=>res.send(err))
        // console.log(req.body.id)
    }
})

//heroko deployment
if ( process.env.NODE_ENV === "production"){
    // app.use('/static', express.static(path.join(__dirname, 'Client/build')));
    app.use(express.static("Client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
    })
}

app.listen(port,()=>{
    console.log(`App is listening on port no. http://localhost:${port}`);
})

