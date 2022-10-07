const express = require(`express`);
const mongoose = require(`mongoose`);

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(`/mongo`, require('./routes/mongoose.js'));
app.use(`/array`, require('./routes/pcs.js'));

app.get("/error", (req, res, next) => {
    next(new Error("Custom Error"))
})

// Error Handling
app.use((err, req, res, next) => {
    console.log(err)
    next(err)
})

app.use((err, req, res, next) => {
    res.status(500).send(err.stack)
    next(err)
})

// Start up
mongoose.connect('mongodb://localhost:27017/players', { useNewUrlParser: true }).then(() => {
    console.log(`Connection ready`)},
    (err) => {
        console.log(`Connection error`)
    }
)

const server = app.listen(3001, () => {
    console.log(`Server started successfully on port number ${server.address().port}`)
});

module.exports = server;