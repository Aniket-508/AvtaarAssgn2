var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen('3000',()=>{
    console.log('Server is running.');
})

// mysql database connection 
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_rest_api'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('Database connected.');
    }
});

app.get('/api',(req,res)=>{
    res.send('API Working.');
});

// Add User
app.post('/api/addUser',(req,res)=>{
    console.log(req.body);
    // sql query 
    let sql = ` INSERT INTO user(name, gender, email) VALUES('${req.body.name}','${req.body.gender}', '${req.body.email}') `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('User added.');
    });        
});

// Add Event
app.post('/api/addEvent',(req,res)=>{
    console.log(req.body);
    // sql query 
    let sql = ` INSERT INTO events SET name='${req.body.name}', uid=(SELECT uid FROM User where name='${req.body.user_name}'), occurence='${req.body.occurence}', startDate='${req.body.startDate}', endDate='${req.body.endDate}' `;   
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('Event added.');
    });        
});