import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Container } from '@mui/system'
import Add from './Add'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Update from './Update'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);

            } catch (err) {
                console.error(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="navbar" style={{marginBottom:20}}>
                <Navbar />
            </div>
            <div className='books'>
                <Container>
                    {
                        books.map(book => (
                            <Card sx={{ marginBottom: 5 }}>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={book.cover}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Description : - {book.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price : - {book.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between" }}>
                                    <div>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </div>
                                    <div>
                                        <Update id={book.id} />
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(book.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Container>
            </div>
            <Add />
        </div>
    )
}

export default Books