import React, {useEffect, useState} from "react";
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
import AddIcon from "@material-ui/icons/Add";
import TextField from '@mui/material/TextField';
import { MenuProps, useStyles, options, welcomeOptions, startOptions } from "./Utils";

import {
  START_NODE_LABEL,
  WELCOME_NODE_LABEL,
  PROCESSING_NODE_LABEL,
  LANGUAGE_SELECTION_NODE_LABEL,
  STOP_NODE_LABEL,
  FLOW_INFO,
} from "./LabelNames";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  zIndex: 100,
};

function MainModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (props.modalData.isModal) handleOpen();
    console.log("useeffect");
  }, []);

  const [startNodeChannel, setstartNodeChannel] = useState("");

  const handleChannelChange = (event) => {
    setstartNodeChannel(event.target.value);
  };

  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const selectMultipleLanguage = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };



  return (
    <>
      {props.modalData.currDataFlowId === START_NODE_LABEL ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Channel name</h2>
              <TextField onChange={(e)=>{
                console.log(e.target.value);
                if(e.target.value.length>0){
                localStorage.setItem('flowName', e.target.value)
                }
              }} id="outlined-basic" label={localStorage.getItem('flowName')} variant="outlined" />
              <h2 id="parent-modal-title">Select Channels</h2>
              <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">
                  Multiple Select
                </InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selected}
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
                          selected.length < options.length
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
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {props.modalData.currDataFlowId === FLOW_INFO ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Channel name</h2>
              <TextField onChange={(e)=>{
                console.log(e.target.value);
                if(e.target.value.length>0){
                localStorage.setItem('flowName', e.target.value)
                }
              }} id="outlined-basic" label={localStorage.getItem('flowName')} variant="outlined" />
              <h2 id="parent-modal-title">Select Channels</h2>
              <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">
                  Multiple Select
                </InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selected}
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
                          selected.length < options.length
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
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {props.modalData.currDataFlowId === WELCOME_NODE_LABEL ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">Choose your </h2>
            <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">
                  Multiple Select
                </InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selected}
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
                          selected.length < options.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.selectAllText }}
                      primary="Select All"
                    />
                  </MenuItem>
                  {welcomeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {props.modalData.currDataFlowId === PROCESSING_NODE_LABEL ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Upload Audio file</h2>
              <Button variant="contained" component="label" color="primary">
                {" "}
                <AddIcon /> Upload a file
                <input type="file" hidden />
              </Button>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}


      {props.modalData.currDataFlowId === LANGUAGE_SELECTION_NODE_LABEL ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Choose your language</h2>
              <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">
                  Multiple Select
                </InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selected}
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
                          selected.length < options.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.selectAllText }}
                      primary="Select All"
                    />
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <hr />
              <h2 id="parent-modal-title">Upload Audio file</h2>
              {selected.map((el) => {
                console.log("hello");
                return (
                  <Button className="language__audio__file__upload__button" variant="contained" component="label" color="primary">
                    {" "}
                    <AddIcon /> Upload {el} audio file
                    <input type="file" hidden />
                  </Button>
                );
              })}
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}

      {props.modalData.currDataFlowId === STOP_NODE_LABEL ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Text in a modal</h2>
              <p id="parent-modal-description">thank you</p>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default MainModal;
