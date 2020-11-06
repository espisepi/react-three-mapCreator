/** CLIP GataCattana (L) */

import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls, PointerLockControls } from 'drei';
import * as THREE from 'three';
import Loading from '../../components/Loading';
import Background from '../../drei-espinaco/Background';
import Ocean from '../../drei-espinaco/Ocean';

import { Physics } from 'use-cannon';
import { Ground } from '../../components/Ground';
import { Player } from '../../components/Player';
import Camera from '../../components/Camera';

import {AudioComponents } from '../../drei-espinaco/VideoPoints';
import Stars from '../../drei-espinaco/Stars';
import Curve from '../../drei-espinaco/Curve';

/* Posiciones de la camara al hacer scroll */
const cameraPositions = [
    [ 0, 0, 21 ],
    [ 7.90,  6.44, 8.38 ],
    [  18,  3.24, 9.97 ],
    [  20.72, 3.12, 51.65 ],
    [ 16,  2.46, -13.14 ],
    [ 0, 0, -20],
    [ -7.3, 5.15, -8.85],
    [-11, 0, -2],
    [-5.86,0.44,9.71],
    [9.51, 4.49, 10.24],
    [ 0, 0, 21]
];
cameraPositions.push(...cameraPositions);

export function Scene({top = 0}) {

    /* Normalizamos la variable top */
    const { size } = useThree();
    const scrollMax = size.height * 4;
    const topNormalized = top / scrollMax;

    const {camera} = useThree();
    useEffect(()=>{
        // document.addEventListener('keydown', e => {console.log(camera.position)})
    },[])

    return (
        <>
        <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
        <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
        <Curve points={cameraPositions} top={topNormalized}>
            <Camera/>
        </Curve>
        <Suspense fallback={Loading} >
        <AudioComponents />
        </Suspense>
        <Stars />

        {/* <Physics gravity={[0, -30, 0]}>
			<Ground position={[0,-1,0]} visible={false} />
			<Player position={[0, 20, 20]} />
		</Physics>
        <PointerLockControls /> */}

        <OrbitControls />
        </>
    );
}

export default function App7(props) {
    const pages = 4;
    const [ top, setTop ] = useState(0);
    const onScroll = useCallback(e => setTop(e.target.scrollTop), [])

    return (
    <>
        <Canvas className="canvas" style={{backgroundColor:'#000000'}} >
            <Scene top={top} />
        </Canvas>
        <div className="scroll-container" onScroll={onScroll}>
            <div style={{ height: `${pages * 100}vh` }} />
        </div>
    </>
    );
}




/* --------------- WASD FPS CONTROLS ----------------- */
// export default function App7(props) {

//     return (
//     <Canvas className="canvas" style={{backgroundColor:'#000000'}} >
//         <directionalLight args={[ 0xffffff, 0.54 ]} castShadow={true} shadow-mapSize={new THREE.Vector2( 1024, 1024 )} />
//         <hemisphereLight args={[0xffffff, 0xffffff, 0.61]} />
//         <Suspense fallback={Loading} >
//         <AudioComponents />
//         </Suspense>
//         <Stars />

//         <Physics gravity={[0, -30, 0]}>
// 			<Ground position={[0,-1,0]} visible={false} />
// 			<Player position={[0, 20, 20]} />
// 		</Physics>
//         <PointerLockControls />

//         {/* <OrbitControls /> */}
        
//     </Canvas>
//     );
// }