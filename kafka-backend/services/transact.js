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
    let selectId = "SELECT MAX(ID) as maxID FROM TransactionID";
    var max = []
    db.query(selectId, (err, result) =>{
        if(err) {
            res.send("Unsuccessful")
            throw err
        }
        var orderId = msg.maxID
        var email = msg.email
        var transactionDetails = msg.cartDetails
        console.log(transactionDetails)
        console.log(email)
        transactionDetails.forEach(transaction => {
            var insert = `INSERT INTO Transactions(customerEmail,orderID,itemName,quantity,shopname,price,date) VALUES ("${email}","${orderId}","${transaction.itemName}","${transaction.itemQuantity}","${transaction.message}","${transaction.itemPrice}","")`
            db.query(insert, (err, result) =>{
                if(err) {
                    //res.send("Unsuccessful")
                    throw err
                }
        
                //res.send('successful')
                callback(null,"ok")
            })
        })
    })


}

exports.handle_request = handle_request;