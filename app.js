const express = require('express')
const { crud, info, relate } = require('mongod-relation')
const app = express();

info.GetDb({
    uri: "mongodb://localhost:27017",
    dbName: "test",
});

app.listen(8000, (err) => {
    console.log('server has been started')
})


app.get('/', async (req, res) => {
    const data = await crud.findMany("test", { category: "Programming" });
    res.json(data)
})
app.get("/relate", (req, res) => {
    relate({ name: "check" }, { name: "test" }, { id: "first_id" })
        .then((result) => {
            res.json(result)
        })
})

// if you are going use only one database use info.GetDb outside

// this don't work if you did not use info.GetDb outside the app.use
crud.findMany("test", {})
    .then((result) => {
        console.log(result)
    })