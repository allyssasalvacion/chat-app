import React, { useRef, useState } from "react";
import "./RoomModal.css";

import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import db from "../../firebase";

function RoomModal({ visible, setVisible }) {
  const [image, setImage] = useState("");
  const inputRef = useRef();

  const Input = styled("input")({
    display: "none",
  });

  const handleUpload = (event) => {
    console.log(event.target?.files?.[0]);
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    setVisible(false);

    if (inputRef.current.value && image) {
      db.collection("rooms").add({
        name: inputRef.current.value,
        image: image,
      });
    }
  };

  return (
    <Dialog open={visible} onClose={handleClose} fullWidth>
      <DialogTitle>Create a new room</DialogTitle>
      <DialogContent className="content">
        <Avatar src={image} sx={{ width: 100, height: 100 }} />
        <label htmlFor="contained-button-file">
          <Input
            accept="image"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUpload}
          />
          <Button variant="contained" component="span" className="upload">
            Upload
          </Button>
        </label>
        <TextField
          inputRef={inputRef}
          id="outlined-name"
          label="Room Name"
          fullWidth
        />
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomModal;
