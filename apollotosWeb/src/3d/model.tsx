// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

export default function Model(props) {
  // const group = useRef();
  const model = useGLTF("/nft_ape5.glb");
  const { scene, animations, cameras } = model
  const { actions, names, ref } = useAnimations(animations);
  // useFrame(({ clock }) => {
  //   ref.current.rotation.y = Math.sin(clock.getElapsedTime());
  // });
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: 1,
    config: config.wobbly,
  });

  const [activeIndex, setActiveIndex]=useState(0);
  useEffect(() => {
    console.log(actions, "actions", animations, names);
    if (actions) {
      actions[names[activeIndex]].reset().fadeIn(0.5).play();
    }
    // return () => actions[names[activeIndex]].fadeOut(0.5);
  }, [actions, names, activeIndex]);

  const handleChangeAnmition = useCallback(()=>{
    if(activeIndex<names.length-1){
      setActiveIndex(activeIndex+1);
    }else{
      setActiveIndex(0);
    }
  }, [activeIndex]);

  return (
    <animated.group
      ref={ref}
      {...props}
      dispose={null}
      scale={scale}
      onPointerOver={() => setActive(!active)}
      onClick={handleChangeAnmition}
    >
      <primitive object={scene} />
    </animated.group>
  );
}

useGLTF.preload("/nft_ape5.glb");