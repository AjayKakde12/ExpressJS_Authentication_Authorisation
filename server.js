const express= require("express");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const path = require('path')
const morgan = require('morgan')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "10mb", type: "application/json"}))
app.use(morgan("dev"))

global.base_dir = __dirname


dotenv.config({
    path: path.resolve(`${base_dir}`, "config.env")
})

require('./database')



require("./routes/index")(app)



app.listen(process.env.PORT, () => {
    console.log(`Listening server at port ${process.env.PORT}`)
})