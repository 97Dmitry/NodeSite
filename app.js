const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))
app.use("/api/auth", require("./routes/auth.routes"))

// const PORT = config.get("port") || 5000
// var serv = app.listen(8000, "127.0.0.1");
async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(8000, "127.0.0.1", () => console.log(`App has been started on port...`));
        // app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (event) {
        console.log(`Server error ${event.message}`)
        process.exit(1)
    }
}

start()





