const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongodb started.")
}).catch((error) => {
    console.log(error)
    console.log("Gotcha..")
})