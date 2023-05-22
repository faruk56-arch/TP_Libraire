import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());



// route get works
app.get('/books', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    res.json(data);
});

app.get('/books/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    const book = data.find(book => book.id === parseInt(req.params.id));
    res.json(book);
});

app.get('/books/title/:title', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    const book = data.find(book => book.title === req.params.title);
    res.json(book);
});

// route post works
app.post('/books', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    data.push(req.body);
    fs.writeFileSync('books.json', JSON.stringify(data));
    res.json(req.body);
});

app.put('/books/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    const index = data.findIndex(book => book.id === parseInt(req.params.id));
    if (index !== -1) {
        const { title, author, price, description } = req.body;
        data[index] = { id: parseInt(req.params.id), title, author, price, description };
        fs.writeFileSync('books.json', JSON.stringify(data));
        res.json(data[index]);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete('/books/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('books.json'));
    const index = data.findIndex(book => book.id === parseInt(req.params.id));
    if (index !== -1) {
        data.splice(index, 1);
        fs.writeFileSync('books.json', JSON.stringify(data));
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

