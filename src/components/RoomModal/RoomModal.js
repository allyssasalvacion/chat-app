import React, { useState } from "react";
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
import { storage } from "../../firebase";

function RoomModal({ visible, setVisible }) {
  const [image, setImage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [blob, setBlob] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  const handleUpload = (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
    setBlob(URL.createObjectURL(newImage));
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleCreate = async () => {
    setVisible(false);

    if (roomName && image) {
      await storage.ref(`${image.name}`).put(image);
      const storageRef = storage.ref(`${image.name}`);
      await storageRef.getDownloadURL().then((url) => {
        db.collection("rooms").add({
          name: roomName,
          image: url,
        });
      });
    }
  };

  return (
    <Dialog open={visible} onClose={handleClose} fullWidth>
      <DialogTitle>Create a new room</DialogTitle>
      <DialogContent className="content">
        <Avatar src={blob} sx={{ width: 100, height: 100 }} />
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
          />
          <Button variant="contained" component="span" className="upload">
            Upload
          </Button>
        </label>
        <TextField
          id="outlined-name"
          label="Room Name"
          fullWidth
          onChange={(e) => setRoomName(e.target.value)}
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
