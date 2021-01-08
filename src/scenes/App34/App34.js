// https://codesandbox.io/s/r3f-sky-dome-forked-rj0tn?file=/src/index.js:633-1162 (L)

import React, {useEffect, useCallback, useState, useRef} from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
// import Loading from '../../components/Loading';

import { proxy, useProxy } from "valtio";
import { Suspense } from 'react';

const hotspot0 = {
    position: [0,2,0],
    img: '',
    location: null
}
const hotspot1 = {
    position: [0,2,0],
    img: ''
}

const location0 = {
    env:'assets/env/360jpg/cannon.jpg',
    children: [hotspot1]
}
const location1 = {
    env:'assets/env/360jpg/lilienstein.jpg',
    children: [hotspot0]
}
hotspot0.location = location0;
hotspot1.location = location1;


const hotspotsState = proxy({
        current: location0
});

const animationState = proxy({run:false});

const texturesState = proxy({
    old: null,
    new: null
})

export function Scene() {
    const snapHotspots = useProxy(hotspotsState);
    const envSrc = snapHotspots.current.env;
    const texture = useLoader(THREE.TextureLoader, envSrc);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    texturesState.new = texture;

    // equirectangular background
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = texture;
    },[texture]);

    const handleOnClick = useCallback(({location})=>{
        texturesState.old = texture;
        hotspotsState.current = location;
        animationState.run = true;
    },[]);
    return(
        <>
        <ambientLight />
        <group>
        <mesh>
            <sphereBufferGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={snapHotspots.current.children[0].position} onClick={()=>handleOnClick(snapHotspots.current.children[0])}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial envMap={texture} side={THREE.FrontSide}/>
        </mesh>
        </group>
        </>
    );
}

// function Loading() {
//     useEffect(()=>{
//         animationState.run = true;
//     },[]);
//     return null;
// }

function RunAnimation() {
    // console.log(controls)
    const animationSnap = useProxy(animationState);
    const texturesSnap = useProxy(texturesState);
    const [iTime, setITime] = useState(0);
    console.log(texturesSnap)

    const [texture, setTexture] = useState(texturesSnap.old);
    useFrame(({camera})=>{
        if(animationSnap.run){
            setITime( iTime => iTime += 0.06 );
            camera.zoom = 1.0 + ( ( (1.0 + Math.cos(3.14 +iTime) ) / 2.0 ) * 10.0 );
            camera.updateProjectionMatrix();
            if(iTime >= 3.14 * 2.0) {
                setITime( 0 );
                animationState.run = false;
                camera.zoom = 1.0;
                camera.updateProjectionMatrix();
            }
        }

    });
    return (null
        // <mesh>
        //     <sphereBufferGeometry args={[500, 60, 40]} />
        //     <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        // </mesh>
    );
}

export default function AppDirty(props) {

    const controls = useRef(null);

    return (
    <Canvas className="canvas" style={{backgroundColor:'#000000'}}>
        <Suspense fallback={null}>
            <OrbitControls />
            <Scene />
        </Suspense>
        <RunAnimation controls={controls.current} />
    </Canvas>
    );
}