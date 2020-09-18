const express = require("express")
require('./db/mongodb')
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')
const cors = require('cors')

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(blogRouter)

app.listen(port, () => {
    console.log("server is up on " + port)
})
