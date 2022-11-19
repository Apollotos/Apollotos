import Container from '@mui/material/Container';
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Environment, Shadow, Sparkles, Text, OrbitControls } from "@react-three/drei";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useNavigate, useModel } from 'umi';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';

import Model from "../../3d/model";
import Loader from '../../3d/loader';
// import Particles from '../../3d/particles';
import styles from './index.less';
import Button from '@mui/material/Button'


const drawerBleeding = 30;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[50],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const fontProps = { fontSize: 0.1, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false, color: 'orange' }


const Sphere = ({ size = 1, amount = 50, color = 'white', emissive = 'green', ...props }) => (
  <mesh {...props}>
    <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} key={undefined} attach={undefined} args={undefined} children={undefined} onUpdate={undefined} material={undefined} clear={undefined} geometry={undefined} raycast={undefined} id={undefined} name={undefined} type={undefined} visible={undefined} uuid={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} updateMorphTargets={undefined} isPoints={undefined} />
    <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0.2, -1.35, 0]} color={emissive} opacity={0.5} key={undefined} children={undefined} material={undefined} id={undefined} attach={undefined} args={undefined} onUpdate={undefined} clear={undefined} geometry={undefined} raycast={undefined} name={undefined} type={undefined} visible={undefined} uuid={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} updateMorphTargets={undefined} isMesh={undefined} />
  </mesh>
)

export default function HomePage() {
  const navigate = useNavigate();
  const { email, showEmail, link, showLink, twitter, showTwitter, walletPublicAddress, chains, setChains,setEmailAddress, switchEmail, setLinkAddress, switchLink, setTwitterAddress, switchTwitter, setWalletPublicAddress } = useModel('userModel');


  const [open, setOpen] = useState(false);
  const [dopen, setDopen] = useState(false);
  const [text, setText] = useState('');
  const [chainsType, setChainsType] = useState('');

  const container = window !== undefined ? () => window.document.body : undefined;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChains(event.target.value as string);
  };

  const gotoSetting = () => {
    navigate("/setting");
  }

  const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const changeChains = (event: SelectChangeEvent) => {
    setChainsType(event.target.value);
  };

  const handleClickOpen = () => {
    setDopen(true);
  };

  const handleOk = () => {
    setWalletPublicAddress(text)
    setChains(chainsType)
    handleClose();
  }

  const handleClose = () => {
    setDopen(false);
  };

  return (
    <div className={styles.home}>
      <Container fixed style={{ padding: 0, minHeight: "100vh" }}>
        {/* <Particles/> */}
        <Box component="div" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <FormControl size="small" sx={{ mt: 1, ml: 1 }}>
              <Select
                labelId="chains"
                id="chains"
                value={chains}
                label="chains"
                autoWidth
                onChange={handleChange}
                placeholder="Chains"
                input={<OutlinedInput />}
                sx={{
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.3)",
                  border: 0
                }}
              >
                <MenuItem value="aptos">APTOS</MenuItem>
                <MenuItem value="bsc">BSC</MenuItem>
                <MenuItem value="eth">ETH</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="share" onClick={toggleDrawer(true)}>
                <IosShareOutlinedIcon />
              </IconButton>
              <IconButton aria-label="setting" onClick={gotoSetting}>
                <SettingsOutlinedIcon />
              </IconButton>
            </Stack>
          </div>
        </Box>
        <Canvas gl={{ alpha: true }} style={{ width: "100%", height: "100vh" }} camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <Suspense fallback={<Loader />}>
            <Model position={[0, 0, 0]} />
            {/* <Environment preset="night" background /> */}
          </Suspense>
          { walletPublicAddress && <Text {...fontProps} position={[0.5, 1, 1]} >Smart Money</Text> }
          { walletPublicAddress && <Text {...fontProps} position={[-0.3, -1 + 0.3, 1]} >Gambling Man</Text> }
          { walletPublicAddress && <Text {...fontProps} position={[0.3, 0, 1]} >Bayc Holder</Text> }
          <Sphere color="white" amount={50} emissive="white" glow="lightgreen" position={[0, 0.3, 0]} />
          <OrbitControls makeDefault />
        </Canvas>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box component="div"
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
              bgcolor: 'rgb(57,59,64)',
            }}
          >
            <Typography sx={{ p: 2, color: 'text.secondary' }}> </Typography>
            <Puller />
          </Box>
          <Box component="div"
            sx={{
              px: 2,
              pb: 3,
              height: '100%',
              overflow: 'auto',
              background: "rgb(57,59,64)",
            }}
          >
            <List
              sx={{ width: '100%', color: "rgba(191,161,235)", bgcolor: 'rgb(57,59,64)' }}
              aria-labelledby="nested-list-subheader2"
            >
              <ListItem>
                <Typography variant="subtitle2" color="primary">Public Key:  {walletPublicAddress || <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleClickOpen}
                >
                  Please input public key
                </Button>}</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Email:  ${email ? (showEmail ? email : 'Hidden') : 'None'}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Link:  ${link ? (showLink ? link : 'Hidden') : 'None'}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Twitter:  ${twitter ? (showTwitter ? twitter : 'Hidden') : 'None'}`} />
              </ListItem>
            </List>
            {/* <Stack spacing={2}>
                <div>
                  <Divider />
                  <Typography color="primary" variant="body1" align="left" sx={{ py: 0.5 }}>
                    Email
                  </Typography>
                  <Divider />
                </div>
                <div>
                  <Divider />
                  <Typography color="primary" variant="body1" align="left" sx={{ py: 0.5 }}>
                    Link
                  </Typography>
                  <Divider />
                </div>
                <div>
                  <Divider />
                  <Typography color="primary" variant="body1" align="left" sx={{ py: 0.5 }}>
                    Twitter
                  </Typography>
                  <Divider />
                </div>
              </Stack> */}
            {/* <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                <Button size="large" fullWidth color="secondary" variant="contained">Collection</Button>
                <Button size="large" fullWidth color="primary" variant="contained">Payment</Button>
              </Stack> */}
          </Box>
        </SwipeableDrawer>

      </Container>
      <Dialog open={dopen} onClose={handleClose}>
        <DialogContent>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="chains">Type</InputLabel>
            <Select
              labelId="chains"
              id="chains"
              value={chainsType}
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
    </div>
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
