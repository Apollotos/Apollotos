import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { ListItem, ListItemText, ListItemIcon, Switch, Divider, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CollectionsIcon from '@mui/icons-material/Collections';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';

import { history, useModel } from 'umi';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        opacity: 1,
      },
      '& .MuiSwitch-thumb': {
        background: '#fff'
      }
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    background: 'rgba(255,255,255, 0.3)',
    opacity: 1,
    border: '1px #999999 solid',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function SettingPage() {
  const { email, showEmail, link, showLink, twitter, showTwitter, setEmailAddress, switchEmail, setLinkAddress, switchLink, setTwitterAddress, switchTwitter } = useModel('userModel');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false)

  const changeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const handleClickOpen = () => {
    setType('');
    setText('');
    setOpen(true);
  };

  const editInfo = (type: React.SetStateAction<string>) => {
    setIsEdit(true);
    setType(type)
    console.log("🚀 ~ file: index.tsx ~ line 100 ~ editInfo ~ type", type)
    if (type === 'email') {
      setText(email)
      console.log("🚀 ~ file: index.tsx ~ line 103 ~ editInfo ~ email", email)
    }
    if (type === 'link') {
      setText(link)
    }
    if (type === 'twitter') {
      setText(twitter)
    }
    setOpen(true);
  }

  const handleOk = () => {
    if (type === 'email') {
      setEmailAddress(text)
    }
    if (type === 'link') {
      setLinkAddress(text)
    }
    if (type === 'twitter') {
      setTwitterAddress(text)
    }
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const back = () => {
    history.back();
  }

  return (
    <Container fixed style={{ padding: 0 }}>
      <Box component="div" sx={{ bgcolor: '#000', minHeight: '100vh' }} >
        <AppBar position="static" sx={{ background: "#000" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit" aria-label="back" sx={{ position: 'absolute', top: 3, left: 12 }} onClick={back}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" letterSpacing={2} sx={{ flexGrow: 1, textAlign: 'center' }}>
              SETTING
            </Typography>
          </Toolbar>
        </AppBar>
        <List
          sx={{ width: '100%', color: "#F4F4F5", bgcolor: 'rgb(57,59,64)', my: 2 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{ color: "rgba(191,161,235)", bgcolor: '#000' }}>
              System
            </ListSubheader>
          }
        >
          <ListItem secondaryAction={
            <Android12Switch></Android12Switch>
          }>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <MonetizationOnIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Currency" />
          </ListItem>
          <Divider />
          <ListItem secondaryAction={
            <Android12Switch></Android12Switch>
          }>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <CollectionsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Show NFT" />
          </ListItem>
          {/* <Divider /> */}
          {/* <ListItem secondaryAction={
            <Android12Switch></Android12Switch>
          }>
            <ListItemIcon sx={{ minWidth: 'auto',mr: 1 }}>
              <MonetizationOnIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Night Mode" />
          </ListItem> */}
        </List>
        <List
          sx={{ width: '100%', color: "#F4F4F5", bgcolor: 'rgb(57,59,64)' }}
          component="nav"
          aria-labelledby="nested-list-subheader2"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader2" sx={{ color: "rgba(191,161,235)", bgcolor: '#000' }}>
              Avatar Info
            </ListSubheader>
          }
        >
          {email && <><ListItem secondaryAction={
            <>
              <IconButton size='small' aria-label="" onClick={() => { editInfo('email') }}>
                <EditIcon />
              </IconButton>
              <Android12Switch checked={showEmail} onChange={() => { switchEmail(!showEmail) }} />
            </>
          }>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Email: ${email}`} />
          </ListItem>
          </>}
          {link && <>
            <ListItem secondaryAction={
              <>
                <IconButton aria-label="" onClick={() => { editInfo('link') }}>
                  <EditIcon />
                </IconButton>
                <Android12Switch checked={showLink} onChange={() => { switchLink(!showLink) }} />
              </>
            }>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                <LinkedInIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`Link: ${link}`} />
            </ListItem>
          </>}
          {
            twitter && <ListItem secondaryAction={
              <>
                <IconButton aria-label="" onClick={() => { editInfo('twitter') }}>
                  <EditIcon />
                </IconButton>
                <Android12Switch checked={showTwitter} onChange={() => { switchTwitter(!showTwitter) }} />
              </>
            }>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                <TwitterIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`Twitter: ${twitter}`} />
            </ListItem>
          }
          {!email && !link && !twitter && <p style={{ textAlign: "center" }}>Please add Avatar Info!</p>}
        </List>
        {(!email || !link || !twitter) && <Grid container spacing={1}>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            color="info"
            sx={{
              bgcolor: 'rgb(57,59,64)',
              color: '#fff',
              borderRadius: 20,
              mx: 'auto',
              mt: 4,
            }}
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </Grid>}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Avatar Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the infomation type,and enter your address here.
          </DialogContentText>
          <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={type}
              onChange={changeType}
              label="Type"
              disabled={isEdit}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="link">Link</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="name"
              label={`${type.toUpperCase()} Address`}
              type="email"
              variant="standard"
              value={text}
              onChange={changeAddress}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
    // <div>
    //   <h2>Yay! Welcome to umi!</h2>
    //   <p>
    //     <img src={yayJpg} width="388" />
    //   </p>
    //   <p>
    //     To get started, edit <code>pages/index.tsx</code> and save to reload.
    //   </p>
    // </div>
  );
}
