const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

// mysql connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myreaction'
});

// mysql connection check
mysqlConnection.connect((err)=>{
    if(err)
        console.log('Mysql Connection Error');
    else
        console.log('Mysql Connection success');
});

// listen to a post
app.listen(3000,()=>{
    console.log("Server runing on port 3000");
});

// root path
app.get('/', (req, res)=>{
    res.send("Hello World");
});

// get all post
app.get('/post', (req, res)=>{
    mysqlConnection.query('select * from posts', (err, results, fields)=>{
        if(!err)
        res.send(results);
        else
        console.log(err);
    });
});

// get post by id
app.get('/post/:id', (req, res)=>{
    var post_id = req.params.id;
    mysqlConnection.query('select * from posts where id=?', [post_id], (err, results, fields)=>{
        if(!err)
            res.send(results);
        else
            console.log(err);
    });
});

// INSERT post
app.post('/post', (req, res)=>{
    var post  = {title: req.body.title,description: req.body.description};
    var query = mysqlConnection.query('INSERT INTO posts SET ?', post, (err, results, fields)=>{
        if(!err)
            res.send('Insrted row');
        else
            console.log(err);
    });
});

// UPDATE post
app.put('/post/:id', (req, res)=>{
    var post_id = req.params.id;
    var post  = {title: req.body.title,description: req.body.description};
    var query = mysqlConnection.query('UPDATE `posts` SET ? WHERE `posts`.`id` = ?', [post,post_id], (err, results, fields)=>{
        if(!err)
            res.send('Updated row');
        else
            console.log(err);
    });
});

// delete post
app.delete('/post/:id', (req, res)=>{
    var post_id = req.params.id;
    mysqlConnection.query('delete from posts where id=?', [post_id], (err, results, fields)=>{
        if(!err)
            res.send('deleted ' + results.affectedRows + ' rows');
        else
            console.log(err);
    });
});

