import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@mui/material/TextField';
import { MenuProps, useStyles, options, welcomeOptions, startOptions } from "./Utils";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const FlowInfo = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [flowName, setFlowName] = useState("");
  const [setDisable, getSetDisable] = useState(false)


  const handelFlowNameChange =(e)=>{
    
    if(e.target.value.length>0){
      localStorage.setItem('flowName', e.target.value)
      }
    setFlowName(e.target.value)
  }




  const handleSubmit = (event) => {
    event.preventDefault();
    alert(` Flow Name: ${flowName} \n 
            Channels selected: ${selected} \n `);
  };

  const isAllSelected =
  startOptions.length > 0 && selected.length === startOptions.length;

const selectMultipleLanguage = (event) => {
  
  const value = event.target.value;
  console.log(value);
  if (value[value.length - 1] === "all") {
    setSelected(selected.length === startOptions.length ? [] : startOptions);
    return;
  }
  if(event.target.value.length>0){
    localStorage.setItem('channel Selection', event.target.value)
    }
  setSelected(value);
};
// console.log(selected);

  return (

  
    <>
      <div>
      <Button className="flow__info__open__modal__button" onClick={handleOpen}>Flow Info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Flow name</h2>
              <TextField onChange={handelFlowNameChange} id="outlined-basic" label={localStorage.getItem('flowName')} variant="outlined" />
              <h2 id="parent-modal-title">Promotion Type</h2>
              <p>Current selection ({localStorage.getItem('channel Selection')})</p>
              <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">
                  Multiple Select
                </InputLabel>
                <Select 
                  labelId="mutiple-select-label"
                  multiple
                  value={selected ? selected:(localStorage.getItem("channel Selection").split(","))}
                  onChange={selectMultipleLanguage}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  <MenuItem
                    value="all"
                    classes={{
                      root: isAllSelected ? classes.selectedAll : "",
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        classes={{ indeterminate: classes.indeterminateColor }}
                        checked={isAllSelected}
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < startOptions.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.selectAllText }}
                      primary="Select All"
                    />
                  </MenuItem>
                  {startOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={(selected ? selected :(localStorage.getItem("channel Selection").split(","))).indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
                <hr/>
                <Button 
                // disabled={!(localStorage.getItem('flowName')&&localStorage.getItem('channel Selection'))}
                disabled={(!flowName || !selected.length > 0)} 
                className="flowInfoSubmitButton" variant="contained"
                onClick={handleSubmit}>Submit</Button>

              </FormControl>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default FlowInfo;
