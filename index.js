require('dotenv').config()
const app = require('./app')
const port = process.env.PORT


app.listen(port, () => { // listen function that lostens for connections
    console.log(`Example app listening on port ${port}`) // application will look for listen first to check for connections and then run the rest of the code
})