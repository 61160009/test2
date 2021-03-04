const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())

const url = 'mongodb+srv://superadmin:@2110fluke@cluster0.etm0v.mongodb.net/books?retryWrites=true&w=majority'
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true })
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('sample_book')
    booksCollection = db.collection('books')
}
connect()


app.get('/books/:id', async (req, res) => {
    // input
    let id = req.params.id

    //process
    const book = await booksCollection.findOne({ _id: ObjectId(id) })

    //output
    res.status(200).json(book)
})

// `POST /movies`
app.post('/books', async (req, res) => {
    //input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image
    
    

    //key: value
    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image: newImage
    }
    let bookID = 0

   // console.log(`title: ${title}`)
   // console.log(`plot: ${plot}`)
    //process
    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId
   

    //output
    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Sever started again at ${port} `))