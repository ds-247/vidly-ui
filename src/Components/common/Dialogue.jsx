import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Dialogue({text, title, label, value, type, onSave}) {
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState(value);

  const handleChange = (e)=>{
    setTextValue(e.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (changed) => {
    setOpen(false);
    if(changed && textValue.trim() !== ""){
        onSave(textValue)
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {text}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={textValue}
            label={label}
            type={type}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(true)}>Change</Button>
          <Button onClick={()=>handleClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


Dialogue.defaultProps = {
  type: "text",
};