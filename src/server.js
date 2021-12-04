
const app=require('./index.js');

const connect = require('./configs/db.js');



console.log("hello")
app.listen(1500,async ()=>{
     await connect()
    console.log('listening on port 1500')
})