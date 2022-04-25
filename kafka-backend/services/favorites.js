var mysql = require('mysql')

var db = mysql.createConnection({
  host:"database-1.cqynemgknizb.us-east-1.rds.amazonaws.com",
  port:"3306",
  user: "admin",
  password: "12345678",
  database:"etsy"
});

db.connect((err)=>{
  if(err){
      console.log(err.message);
      return;
  }
  console.log("database connected")
})

function handle_request(msg, callback){
    console.log('inside adding favorittes kafka handler')
    var transactions = `SELECT * FROM Transactions WHERE customerEmail="${msg.email}"`
    db.query(transactions, (err, result) =>{
        console.log('I am here')
        if(err) throw err

        const results=JSON.parse(JSON.stringify(result))
        console.log(results)
        
    })

    callback(null, "Successfully inserted to favorites")
};

exports.handle_request = handle_request;