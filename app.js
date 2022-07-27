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


crud.findMany("test", {})
    .then((result) => {
        console.log(result)
    })

// for multiple relation
fun()
async function fun() {
    const record1 = await relate({ name: "check" }, { name: "test" }, { id: "first_id" })
    const record2 = await relate(record1, { name: "first" }, { "gotObjects1.arr": "name" })
    // here one value is going from server and second from database
    const record3 = await relate(record2, { name: "test" }, { "gotObjects2.name": "arr" })
    // you can also do this
    // const record3 = await relate(record2, record1, { "gotObjects2.name": "arr" })
    console.log(record3)
}