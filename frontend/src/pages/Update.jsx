import React, { useState } from 'react'
import axios from 'axios'
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: 500,
  height: 550,
  background: "white",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    height: "100vh",
  },
}))

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const Update = ({ id }) => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });

  const bookId = id

  console.log("BOOK ID :- " + bookId)

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book)
      window.location.reload(false)
    } catch (err) {
      console.error(err)
    }
  }

  console.log(book)
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Edit" onClick={() => setOpen(true)}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledContainer>
          <Typography variant="h6" color="gray" textAlign={"center"}>
            Create Post
          </Typography>
          <form autoComplete='off' sx={{ padding: 16 }}>
            <div style={{ marginBottom: 24 }}>
              <TextField id="standard-basic" label="Title" name="title" onChange={handleChange} variant="standard" sx={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <TextField
                id="standard-multiline-static"
                label="Description"
                name="description"
                onChange={handleChange}
                multiline
                rows={4}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <TextField id="standard-basic" label="Cover" name="cover" onChange={handleChange} variant="standard" sx={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <TextField id="outlined-number" label="Price" name="price" onChange={handleChange} type="number" InputLabelProps={{ shrink: true, }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <Button varient="outlined" color="primary" onClick={handleClick} sx={{ marginRight: 20 }}>Create</Button>
              <Button varient="outlined" color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </form>
        </StyledContainer>
      </SytledModal>
    </>
  )
}

export default Update;