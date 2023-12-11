const express = require('express');

const port = 8888;

const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded());
let record = [
    {
        task : "Get more things done on a full screen",
        userid : 452
    },
    {
        task : "Fully integrated with Google Workspace",
        userid : 453
    },
]
app.get('/',(req,res)=>{
    return res.render('form',{
        record
    });
})

app.post('/AddTask',(req,res)=>{
    let name = req.body.task;
    let userid = Math.floor(Math.random() * 1000);
    let object = {
        task : name,
        userid : userid
    }
    record.push(object);
    return res.redirect('/');
})
app.listen(port,(err)=>{
    if(err){
        console.log(`server is not start`);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})

app.get('/DeleteTask',(req,res)=>{
    let id = req.query.DId;
    let delet = record.filter((val)=>{
        return val.userid != id
    })
    record = delet;
    return res.redirect('/');
})

app.get('/EditTask',(req,res)=>{
    let id = req.query.EId;
    let recoreds = record.find((val)=>{
        return val.userid == id;
    })
    return res.render('form',{
        single : recoreds,
        record
    })
})

