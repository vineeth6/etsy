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
})

function handle_request(msg, callback){
    console.log('inside search result kafka callback')
    console.log(msg.imageLike)
    var imgName = msg.imageLike
    var dbquery = `SELECT name FROM ItemInventory WHERE name LIKE "%${imgName}%"`
    console.log(dbquery)
    db.query(dbquery, (err, result) =>{
        if(err) throw err

        const results=JSON.parse(JSON.stringify(result))
        console.log(results)
        var mesg=""
        for(i in results){
            console.log(result[i].name)
            console.log(result[i].name.includes(mesg.imageLike))
            mesg=mesg.concat(results[i].name)
            mesg=mesg.concat(';')
        }
            
        console.log(mesg)
        callback(null, mesg)
    })
};

exports.handle_request = handle_request;