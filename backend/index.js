import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12604929",
    password: "vNvEv3CeFj",
    database: "sql12604929",
    port: 3306
});  

app.get("/", (req,res)=>{
    res.json("Hello World, from backend!")
});

app.get("/books", (req,res)=>{
    db.query("use sql12604929")
    const q = "select * from books"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    });
});

app.post("/books", (req,res)=>{
    db.query("use sql12604929")
    // const q = "INSERT INTO books (id,title, description, cover, price) VALUES (1,'dfg','fdgdf','dfg',98)";
    const q = "INSERT INTO books (`title`, `description`, `cover`,`price`) VALUES (?)";
    const values = [
        // "sdaf","dsf","sdaf",56,
        // req.body.id,
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
        
    ];
    db.query(q, [values], (err,data)=>{
        if (err) return res.json(err)
        return res.json("Book has been created sucessfully")
    });
    // db.query(q, (err,data)=>{
    //     if (err) return res.json(err)
    //     return res.json(data)
    // });
})

app.delete("/books/:id",(req,res)=>{
    db.query("use sql12604929")
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId],(err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been deleted sucessfully");
    });
});

app.put("/books/:id",(req,res)=>{
    db.query("use sql12604929")
    const bookId = req.params.id;
    const q = "UPDATE books SET title = ?, description = ?, cover = ?, price = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[...values,bookId],(err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been updated sucessfully");
    });
});

app.listen(8800, ()=> {
    console.log('Backend server is running!')
})