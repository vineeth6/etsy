//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql')
const generateUploadURL = require('./s3')

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

var db = mysql.createConnection({
    host:"database-1.cqynemgknizb.us-east-1.rds.amazonaws.com",
    port:"3306",
    user: "admin",
    password: "12345678",
    database:"etsy"
});

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]
var bookIDs = ['1','2','3']

//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    Users.filter(function(user){
        if(user.username === req.body.username && user.password === req.body.password){
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
        else{
            res.end("Not successful")
        }
    })

    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
});

app.post('/create', function(req, res){
    console.log(req.body['bookid'])
    var bookid = req.body['bookid'];
    var title = req.body['title'];
    var author = req.body['author'];

    if(bookIDs.includes(bookid)){
        res.end("duplicate")
        return
    }
    var ele = {"BookID": bookid, "Title": title, "Author": author}
    books.push(ele)
    bookIDs.push(bookid)
    console.log(books)
    res.end("done")
});

app.post('/delete', function(req, res){
    var bookid = req.body.id
    console.log(bookid)
    var index = -1;

    for(var i=0;i<books.length;i++)
    {
        if(books[i]['BookID'] === bookid)
        {
            index = i;
        }
    }

    if(index != -1)
    {
        books.splice(index,1)
        bookIDs.splice(index, 1)
        res.end('yes')
    }
    else
        res.end('No')
    
});

app.post('/insertIntoLogin',(req, res)=> {


    let sql = `SELECT firstname,email,password FROM Login WHERE email = "${req.body.username}" and password="${req.body.password}"`
    let query = db.query(sql, (err, result) =>{
        if(err) throw err
        const results=JSON.parse(JSON.stringify(result))
        if(results.length > 0){

            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result[0].firstName;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful");
        }
        else
            res.send('Invalid Login')
    })
});

app.post('/insertIntoRegister', (req, res)=> {

    var check = `SELECT firstname,email,password FROM Login WHERE email = "${req.body.email}" and password="${req.body.password}"`
    db.query(check, (err, result) =>{
        if(err) throw err
        
        const results = JSON.parse(JSON.stringify(result))
        if(results.length > 0)
        {
            res.end('existing user')
        }
    })


    console.log('hahaha')
    console.log(req.body.name)
    var insert = `INSERT INTO Login (firstname, email, password) VALUES ("${req.body.name}","${req.body.email}","${req.body.password}")`
    db.query(insert, (err, result) =>{
        if(err) throw err

        const results=JSON.parse(JSON.stringify(result))
        console.log(results)
    })
})

app.get('/s3Url', async(req, res) => {
    console.log(req.query.imagename)
    const url = await generateUploadURL.generateUploadURL(req.query.imagename)
    console.log(url)
    res.send({url})
})

app.post('/insertIntoItemInventory', (req, res) => {
    console.log('inside item inventory post')
    console.log(req.body)
    var outofstock='false'
    if(parseInt(req.body.quantity) <= 0)
        outofstock=String(true)

    console.log(outofstock)
    var insert = `INSERT INTO ItemInventory (email, name, category, description, price, quantity, instock) VALUES ("${req.body.email}","${req.body.imagename}","${req.body.category}","${req.body.description}","${req.body.price}","${req.body.quantity}","${outofstock}")`
    db.query(insert, (err, result) =>{
        if(err) {
            res.send("Unsuccessful")
            throw err
        }

        res.send('successful')
    })
})

app.post('/InsertIntoProfile', (req,res) => {
    console.log("inside profile")
    console.log(req.body)
    var insert = `INSERT INTO UserProfile (email, username, profilepic, gender, birthdate, address, city, country, phonenumber, purchasehistory) VALUES ("${req.body.email}","${req.body.username}"," ","${req.body.gender}","${req.body.birthdate}","${req.body.address}","${req.body.city}","${req.body.country}","${req.body.phone}","")`
    db.query(insert, (err, result) =>{
        if(err) {
            res.send("Unsuccessful")
            throw err
        }

        res.send('successful')
    })
})

app.get('/homeImages', (req,res) =>{
    var getImageNames = `SELECT name FROM ItemInventory`
    db.query(getImageNames, (err, result) =>{
        if(err) throw err

        const results=JSON.parse(JSON.stringify(result))
        var msg=""
        for(i in results){
            msg=msg.concat(results[i].name)
            msg=msg.concat(';')
        }
            
        res.send(msg)
    })
})

app.get('/ItemOverviewDetails', (req,res)=> {
    console.log('Item Overview')
    var getImageDetails = `SELECT * FROM ItemInventory where name="${req.query.imagename}" `
    db.query(getImageDetails, (err, result) =>{
        if(err) {
            console.log("Unsuccessful in getting item Overview Details")
            res.send("Unsuccessful")
            throw err
        }

        const results=JSON.parse(JSON.stringify(result))
        console.log(results[0].email)
        res.send(results[0])
    })
})

app.get('/getProfileDetails', (req,res)=> {
    console.log('Profile Overview')
    var getImageDetails = `SELECT * FROM UserProfile where email="${req.query.email}" `
    try{
    db.query(getImageDetails, (err, result) =>{
        if(err) {
            console.log("Unsuccessful in getting item Overview Details")
            res.send("Unsuccessful")
            throw err
        }

        const results=JSON.parse(JSON.stringify(result))
        console.log(results[0].email)
        res.send(results[0])
    })
    }
    catch(err){
        next(err)
    }
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

db.connect((err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("database connected")
})