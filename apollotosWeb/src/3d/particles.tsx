import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';


export default function Particles() {
  const [angle, setAngle] = useState(0)
  const [scene, setScene] = useState(new THREE.Scene())
  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000))
  const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({
    antialias: true,
    alpha: true 
  }))
  const [clock, setClock] = useState(new THREE.Clock())
  const [particleGroup, setParticleGroup] = useState( new THREE.Group())
  const [particleAttributes, setParticleAttributes] = useState({
    startSize: [] as Array<any> ,
    startPosition: [] as Array<any> ,
    randomness: [] as Array<any> 
  })
  const divEl = useRef(null);

  useEffect(() => {
    _init()
    _bindEvent()
  }, [])

  const _init = () => {
    // this.angle = 0
    // this.scene = new THREE.Scene()
    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000)
    // this.renderer = new THREE.WebGLRenderer({
    //   antialias: true,
    //   alpha: true 
    // })
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.3
    renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setClearColor(0x000000, 0)
    setRenderer(renderer)
    
    camera.position.set(0, 150, 400)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    setCamera(camera)

    
    const container = document.querySelector('.wrap')
    if (container) {

      container.appendChild(renderer.domElement)
      _initLights()
      _initParticles()
      _setSize()
      _render()
    }
  }

  const _initLights = () => {
    const light = new THREE.PointLight(0xffffff)
    light.position.set(0, 300, 0)
    scene.add(light)
    setScene(scene)
  }

  const _initParticles = () => {
    
    const particleNum =  200
    const particleTex = new THREE.TextureLoader().load('/spark.png')
    for(let i = 0; i < particleNum; i++) {
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: particleTex, 
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(32, 32, 1)
      sprite.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      )
      sprite.position.setLength(60 * (Math.random() * 0.2 +0.8))
      // console.log("🚀 ~ file: app.js ~ line 99 ~ App ~ _initParticles ~ this.params.radiusRange", this.params.radiusRange)
      sprite.material.color.setHSL(Math.random(), 0.9, 0.7)
      sprite.material.opacity = 0.9
			sprite.material.transparent = true
      
      
      particleGroup.add(sprite)
      particleAttributes.startPosition.push(sprite.position.clone())
      particleAttributes.randomness.push(Math.random())
    }
    particleGroup.position.y = 50
    scene.add(particleGroup)
    setParticleGroup(particleGroup)
  }

  // _initFloor() {
  //   const tex = new THREE.TextureLoader().load('img/plane.png')
  //   const mat = new THREE.MeshBasicMaterial({
  //     map: tex,
  //     side: THREE.DoubleSide 
  //   })
  //   const geo = new THREE.PlaneBufferGeometry(2000, 2000, 2, 2)
  //   const floor = new THREE.Mesh(geo, mat)
  //   floor.rotation.x = -Math.PI / 2
  //   floor.position.y = -50
    
  //   this.scene.add(floor)
  // }

  const _updateParticles = (dt: number) => {
    for (let i = 0; i < particleGroup.children.length; i++) {
      const sprite = particleGroup.children[i]
      const rand = particleAttributes.randomness[i] + 1
      const factor = Math.sin(rand * dt) * 0.2 + 0.8
      sprite.position.x = particleAttributes.startPosition[i].x * factor
      sprite.position.y = particleAttributes.startPosition[i].y * factor
      sprite.position.z = particleAttributes.startPosition[i].z * factor
    }
    particleGroup.rotation.y = dt * 0.75
    setParticleGroup(particleGroup)
  }

  const _updateCamer = (dt: number) => {
    const newAngle = angle + 0.01
    const cx = Math.cos(angle) * 500
    const cz = Math.sin(angle) * 500
    camera.position.set(cx, 100, cz)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    setAngle(newAngle)
    setCamera(camera)
  }

  const _setSize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  const _bindEvent = () => {
    const touch = !!('ontouchstart' in window)
    window.addEventListener('resize', _setSize)
  }


  const _render = () => {
    const dt = 3 * clock.getElapsedTime()

    _updateCamer(dt)
    _updateParticles(dt)

    renderer.render(scene, camera)
    // this.stats.update()
    requestAnimationFrame(_render)
  }

  
  return (
    <div ref={divEl} className="wrap" style={{width: "100%", height: "100%"}}>
    </div>
  )
}