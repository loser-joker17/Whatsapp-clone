// importing 
import express from "express";
import mongoose from "mongoose"; 
import Messages from "./dbMessages.js"; 
import Pusher from "pusher"; 
import cors from 'cors'; 
//app config 
const app=express(); 
const port=process.env.PORT || 9000  

const pusher = new Pusher({
    appId: "1402642",
    key: "a6ea09578dbe46deaf84",
    secret: "d12d57d5a3b3ed2cc2d4",
    cluster: "mt1",
    useTLS: true
  });
// middleware 
app.use(express.json()); 
app.use(cors())

app.use((req,res,next) => {
    res.setHeader("Access-control-Allow-Origin","*"); 
    res.setHeader("Access-control-Allow-Headers","*"); 
    next(); 
})
//Db config //password = w3glhtbH5BOnkLkN 
const connection_url='mongodb+srv://admin:w3glhtbH5BOnkLkN@cluster0.fcjug.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    
    useNewUrlParser: true,  
     useUnifiedTopology: true
});

// ?? 
const db=mongoose.connection; 
db.once('open',() => {
    console.log("MongoDb Connected");  

    const msgCollection=db.collection("messagecontents"); 
    const changeStream = msgCollection.watch(); 
    //console.log(msgCollection); 
    changeStream.on('change',(change) => {
        console.log("A Change is occured",change); 

        if(change.operationType === 'insert') 
        {
            const messageDetails = change.fullDocument; 
            pusher.trigger('messages','inserted',
            {
                name: messageDetails.name, 
                message:messageDetails.message, 
                timestamp:messageDetails.timestamp, 
                received: messageDetails.received, 
            }); 
        } 
        else 
        {
            console.log('Error triggering Pusher'); 
        }
    })
}) 

//api routes 
 app.get('/',(req,res)=>res.status(200).send("Hello Vijay"));   // 200 is a status code  

 app.get('/messages/sync',(req,res) => {
     Messages.find((err,data) => {
         if(err) {
             res.status(500).send(err); 
         } 
         else {
             res.status(200).send(data); 
         }
     });
 });

 app.post('/messages/new',(req,res) =>{
     const dbMessage=req.body; 
     Messages.create(dbMessage,(err,data) => {
         if(err) 
         res.status(500).send(err); 
         else 
         res.status(201).send(data);
     });
 });

// listen 
app.listen(port,() => console.log(`listening on localhost : ${port}`));  

