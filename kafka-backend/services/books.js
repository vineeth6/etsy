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
        var getImageNames = `SELECT name FROM ItemInventory`
        db.query(getImageNames, (err, result) =>{
            if(err) throw err
    
            const results=JSON.parse(JSON.stringify(result))
            var mesg=""
            for(i in results){
                mesg=mesg.concat(results[i].name)
                mesg=mesg.concat(';')
            }
            callback(null, mesg)
        })
};

exports.handle_request = handle_request;


