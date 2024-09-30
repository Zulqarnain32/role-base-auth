const mongoose = require("mongoose")

const dbConnect = () => {
  
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
   console.log("connected successfully"); 
}).catch((err) => {
    console.log("error while connection database",);
})
}

module.exports = dbConnect