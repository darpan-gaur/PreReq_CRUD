# Backend

## Install required packages

```bash
npm i mysql express nodemon
```

## Mysql Database

### Selecting a database
```mysql
USE database_name;
```

### Create/Add user into table
```mysql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### Read/Select all user data into table
```mysql
SELECT * FROM table_name;
```

### Update user data into table
```mysql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### Delete user data into table
```mysql
DELETE FROM table_name WHERE condition;
```

## NodeJs (Exprss)

### Connect to mysql database
```js
const db = mysql.createConnection({
    host: "host_name",
    user: "user_name",
    password: "password",
    database: "database_name",
    port: "port_number"
}); 
```

### Post method to create/add user into table
```js
app.post("/books", (req, res) => {
    const value_1 = req.body.value_1;
    const value_2 = req.body.value_2;
    const value_3 = req.body.value_3;

    const sqlInsert = "INSERT INTO table_name (column1, column2, column3) VALUES (?,?,?)";
    db.query(sqlInsert, [value_1,value_2,value_3], (err, result) => {
        console.log(result);
    });
});
```

### Get method to read/select all user data into table
```js
app.get("/table_name", (req,res)=>{
    const q = "select * from table_name"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    });
});
```

### Put method to update user data into table with respect to id
```js
app.put("/table_name/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE table_name SET column1 = ?, column2 = ?, column3 = ? WHERE id = ?";

    const values = [
        req.body.column1,
        req.body.column2,
        req.body.column3,
    ];

    db.query(q,[...values,bookId],(err,data)=>{
        if (err) return res.json(err);
        return res.json("table_name has been updated sucessfully");
    });
});
```

### Delete method to delete user data into table with respect to id
```js
app.delete("/table_name/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM table_name WHERE id = ?";

    db.query(q,[bookId],(err,data)=>{
        if (err) return res.json(err);
        return res.json("table_name has been deleted sucessfully");
    });
});
```
