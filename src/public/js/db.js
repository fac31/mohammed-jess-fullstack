const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/userDb'

MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('mydb')
    //Create a collection name "customers":
    dbo.createCollection('customers', function (err, res) {
        if (err) throw err
        console.log('Collection created!')
        db.close()
    })
})
