const express = require('express')
const app = express();
require('dotenv').config();
const main = require('./config/db')
const cookieParser = require('cookie-parser')

// ye direct jo JSON formate me data aata hai usko java script object me convert ker degaa

app.use(express.json())
app.use(cookieParser());


main().then(async ()=>{
  app.listen(process.env.PORT, () => {
    console.log("Server running At Port Number: " + process.env.PORT);
  });

}).catch(
  err=>console.log(err)
)

