import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate, useModel } from 'umi';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
// import yayJpg from '../assets/yay.jpg';

import Particles from '../3d/particles';
import styles from './index.less';





export default function HomePage() {
  const navigate = useNavigate();
  const { setWalletPublicAddress, chains, setChains, setGuidStatus, isGuide } = useModel('userModel');
  const [stage, setStage] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setWalletPublicAddress(text)
    handleClose();
    change(stage + 1);
    setTimeout(() => {
      nextPage();
    }, 1000);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const changeChains = (event: SelectChangeEvent) => {
    setChains(event.target.value);
  };

  const change = (stageCount: number) => {
    setStage(stageCount);
  }

  const nextPage = () => {
    setGuidStatus(true);
    navigate("/home", { replace: true });
  }

  useEffect(() => {
    if(isGuide) {
      navigate("/home", { replace: true });
    }
    return () => {}
  }, [])

  return (
    <Container sx={{ p: 0, width: 1, height: '100vh' }} disableGutters >
      <Box component="div" className={styles.main} sx={{ width: 1, height: '100%', position: 'relative' }}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
        <Box component="div" sx={{ mt: 23, color: 'primary.contrastText' }}>
          <Grow in={stage < 3} timeout={1000}>
            <Typography variant="h4" align="center" sx={{ letterSpacing: 4, fontWeight: 'light' }}>
              APOLLOTOS
            </Typography>
          </Grow>
          <Grow in={stage === 3} timeout={1000}>
            <Typography variant="h4" align="center" sx={{ letterSpacing: 4, fontWeight: 'light' }}>
              THIS IS YOUR SOUL
            </Typography>
          </Grow>
        </Box>
        <Box component="div" sx={{ position: "relative", mt: [5, 8, 10], width: [270, 300, 320], textAlign: 'center', m: 'auto', }}>
          {/* stage-1 */}
          <Grow in={stage === 0} timeout={{ enter: 2000, exit: 1000 }}>
            <Box component="div" sx={{ background: 'rgba(255,255,255,0.15)', width: 1, py: 3, borderRadius: 1.5, position: "absolute", top: 0, left: 0 }} >
              <Typography variant="h6" color="white" fontWeight="light" position="relative">
                Your First Identity
                <Box component="div" sx={{ position: 'absolute', top: -13, left: [30, 34, 38], transform: 'rotate(45deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
              </Typography>
              <Typography variant="h6" color="white" fontWeight="light" >Connecting</Typography>
              <Typography variant="h6" color="white" fontWeight="light" position="relative">
                Web2 and Web3
                <Box component="div" sx={{ position: 'absolute', bottom: -13, right: [30, 34, 38], transform: 'rotate(225deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
              </Typography>
            </Box>
          </Grow>
          {/* stage-2 */}
          <Grow in={stage === 1} timeout={{ enter: 4000, exit: 1000 }}>
            <Box component="div" sx={{ background: 'rgba(255,255,255,0.15)', width: 1, py: 3, borderRadius: 1.5, position: "absolute", top: 0, left: 0 }} >
              <Typography variant="h6" color="white" fontWeight="light" position="relative">
                Who do you want to be
                <Box component="div" sx={{ position: 'absolute', top: -13, left: [20, 24, 28], transform: 'rotate(45deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
                <Box component="div" sx={{ position: 'absolute', bottom: -13, right: [20, 24, 28], transform: 'rotate(225deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
              </Typography>
            </Box>
          </Grow>
          {/* stage-3 */}
          <Grow in={stage === 2} timeout={{ enter: 4000, exit: 1000 }}>
            <Box component="div" sx={{ background: 'rgba(255,255,255,0.15)', width: 1, py: 3, borderRadius: 1.5, position: "absolute", top: 0, left: 0 }} >
              <Typography variant="h6" color="white" fontWeight="light" position="relative">
                Which part of
                <Box component="div" sx={{ position: 'absolute', top: -13, left: [30, 34, 38], transform: 'rotate(45deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
              </Typography>
              <Typography variant="h6" color="white" fontWeight="light" >the soul</Typography>
              <Typography variant="h6" color="white" fontWeight="light" position="relative">
                do you want
                <Box component="div" sx={{ position: 'absolute', bottom: -13, right: [30, 34, 38], transform: 'rotate(225deg)' }}>
                  <KeyboardArrowLeftOutlinedIcon />
                </Box>
              </Typography>
            </Box>
          </Grow>
        </Box>
        {/* stage-4 */}
        <Grow in={stage === 3} timeout={{ enter: 4000, exit: 1000 }}>
          <Box component="div" sx={{ position: "absolute", top: 50, left: 0 }}>
            <Particles />
          </Box>
        </Grow>
        {/* stage-1-btn */}
        <Grow in={stage === 0} timeout={{ enter: 3000, exit: 1000 }}>
          <Box component="div" sx={{ position: 'absolute', width: 1, bottom: 41, px: 2.1 }}>
            <Button variant="contained" color="primary" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={() => { change(stage + 1) }}>
              GO
            </Button>
          </Box>
        </Grow>
        {/* stage-2-btn */}
        <Grow in={stage === 1} timeout={{ enter: 4000, exit: 1000 }}>
          <Box component="div" sx={{ position: 'absolute', width: 1, bottom: 41, px: 2.1 }}>
            <Stack spacing={2} direction="row">

              <Button variant="contained" color="success" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={() => { change(stage + 1) }}>
                He
              </Button>
              <Button variant="contained" color="secondary" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={() => { change(stage + 1) }}>
                She
              </Button>
            </Stack>
          </Box>
        </Grow>
        {/* stage-3-btn */}
        <Grow in={stage === 2} timeout={{ enter: 4000, exit: 1000 }}>
          <Box component="div" sx={{ position: 'absolute', width: 1, bottom: 41, px: 2.1 }}>
            <Button variant="contained" color="primary" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={() => { change(stage + 1); }}>
              Get The Soul
            </Button>
          </Box>
        </Grow>
        {/* stage-4-btn */}
        <Grow in={stage === 3} timeout={{ enter: 4000, exit: 1000 }}>
          <Box component="div" sx={{ position: 'absolute', width: 1, bottom: 41, px: 2.1 }}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="primary" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={handleClickOpen}>
                Link Avatar
              </Button>
              <Button variant="contained" color="primary" sx={{ width: 1, fontWeight: 'bold', height: 50 }} size="large" onClick={() => {
                change(stage + 1); setTimeout(() => {
                  nextPage();
                }, 1000);
              }}>
                Create Avatar
              </Button>
            </Stack>
          </Box>
        </Grow>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="chains">Type</InputLabel>
            <Select
              labelId="chains"
              id="chains"
              value={chains}
              onChange={changeChains}
              label="Type"
            >
              <MenuItem value="apots">Aptos</MenuItem>
              <MenuItem value="bsc">Bsc</MenuItem>
              <MenuItem value="eth">Eth</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="public_key"
              label="Publi Key"
              type="public_key"
              value={text}
              variant="standard"
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
  );
}
