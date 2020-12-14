import e,{useContext as n,useState as t,useRef as r,useEffect as o,useLayoutEffect as i,useMemo as s,createContext as u,Suspense as a,lazy as c}from"react";import{Object3D as l,MathUtils as p,InstancedMesh as d,DynamicDrawUsage as f,Geometry as m,Vector3 as g,Face3 as y}from"three";import{useFrame as v}from"react-three-fiber";function h(){return(h=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}const x=new l;function b(e,n,t){return n.args=t(n.args),e.position.set(...n.position||[0,0,0]),e.rotation.set(...n.rotation||[0,0,0]),n}function M(e,n,t){void 0!==n&&(e.position.fromArray(t.positions,3*n),e.quaternion.fromArray(t.quaternions,4*n))}let w=0;function F(e,t,o,u){const a=r(null),c=u||a,{worker:p,bodies:m,buffers:g,refs:y,events:F,subscriptions:C}=n(J);i(()=>{c.current||(c.current=new l);const n=c.current,r=p;let i,s=[n.uuid];return n instanceof d?(n.instanceMatrix.setUsage(f),s=new Array(n.count).fill(0).map((e,t)=>n.uuid+"/"+t),i=s.map((e,r)=>{const i=b(x,t(r),o);return x.updateMatrix(),n.setMatrixAt(r,x.matrix),n.instanceMatrix.needsUpdate=!0,i})):i=[b(n,t(0),o)],i.forEach((e,t)=>{y[s[t]]=n,e.onCollide&&(F[s[t]]=e.onCollide,e.onCollide=!0)}),r.postMessage({op:"addBodies",type:e,uuid:s,props:i}),()=>{i.forEach((e,n)=>{delete y[s[n]],e.onCollide&&delete F[s[n]]}),r.postMessage({op:"removeBodies",uuid:s})}},[]),v(()=>{if(c.current&&g.positions.length&&g.quaternions.length)if(c.current instanceof d)for(let e=0;e<c.current.count;e++){const n=m.current[c.current.uuid+"/"+e];void 0!==n&&(M(x,n,g),x.updateMatrix(),c.current.setMatrixAt(e,x.matrix)),c.current.instanceMatrix.needsUpdate=!0}else M(c.current,m.current[c.current.uuid],g)});const k=s(()=>{const e=e=>void 0!==e?c.current.uuid+"/"+e:c.current.uuid,n=(n,t,r)=>c.current&&p.postMessage({op:n,uuid:e(t),props:r}),t=(e,t)=>r=>{const o=w++;return C[o]=r,n("subscribe",t,{id:o,type:e}),()=>{delete C[o],n("unsubscribe",t,o)}},r=(e,n)=>e+n.charAt(0).toUpperCase()+n.slice(1),o=(e,o)=>({set:(t,i,s)=>n(r("set",e),o,[t,i,s]),copy:({x:t,y:i,z:s})=>n(r("set",e),o,[t,i,s]),subscribe:t(e,o)}),i=(e,o)=>({set:t=>n(r("set",e),o,t),subscribe:t(e,o)});function s(e){return{position:o("position",e),rotation:o("quaternion",e),velocity:o("velocity",e),angularVelocity:o("angularVelocity",e),linearFactor:o("linearFactor",e),angularFactor:o("angularFactor",e),mass:i("mass",e),linearDamping:i("linearDamping",e),angularDamping:i("angularDamping",e),allowSleep:i("allowSleep",e),sleepSpeedLimit:i("sleepSpeedLimit",e),sleepTimeLimit:i("sleepTimeLimit",e),collisionFilterGroup:i("collisionFilterGroup",e),collisionFilterMask:i("collisionFilterMask",e),fixedRotation:i("fixedRotation",e),applyForce(t,r){n("applyForce",e,[t,r])},applyImpulse(t,r){n("applyImpulse",e,[t,r])},applyLocalForce(t,r){n("applyLocalForce",e,[t,r])},applyLocalImpulse(t,r){n("applyLocalImpulse",e,[t,r])}}}const u={};return h({},s(void 0),{at:e=>u[e]||(u[e]=s(e))})},[]);return[c,k]}function C(e,n){return F("Plane",e,()=>[],n)}function k(e,n){return F("Box",e,e=>e||[1,1,1],n)}function A(e,n){return F("Cylinder",e,e=>e,n)}function U(e,n){return F("Heightfield",e,e=>e,n)}function R(e,n){return F("Particle",e,()=>[],n)}function L(e,n){return F("Sphere",e,e=>[null!=e?e:1],n)}function S(e,n){return F("Trimesh",e,e=>{const n=e instanceof m?e.vertices:e[0],t=e instanceof m?e.faces:e[1];return[n.map(e=>e instanceof g?[e.x,e.y,e.z]:e),t.map(e=>e instanceof y?[e.a,e.b,e.c]:e)]},n)}function V(e,n){return F("ConvexPolyhedron",e,e=>{const n=e instanceof m?e.vertices:e[0],t=e instanceof m?e.faces:e[1],r=e instanceof m?e.faces.map(e=>e.normal):e[2];return[n.map(e=>e instanceof g?[e.x,e.y,e.z]:e),t.map(e=>e instanceof y?[e.a,e.b,e.c]:e),r&&r.map(e=>e instanceof g?[e.x,e.y,e.z]:e)]},n)}function B(e,n){return F("Compound",e,e=>e||[],n)}function D(e,t,i,u={},a=[]){const{worker:c}=n(J),l=p.generateUUID(),d=r(null),f=r(null);t=null==t?d:t,i=null==i?f:i,o(()=>{if(t.current&&i.current)return c.postMessage({op:"addConstraint",uuid:l,type:e,props:[t.current.uuid,i.current.uuid,u]}),()=>c.postMessage({op:"removeConstraint",uuid:l})},a);const m=s(()=>({enable:()=>c.postMessage({op:"enableConstraint",uuid:l}),disable:()=>c.postMessage({op:"disableConstraint",uuid:l})}),a);return[t,i,m]}function I(e,n,t,r=[]){return D("PointToPoint",e,n,t,r)}function P(e,n,t,r=[]){return D("ConeTwist",e,n,t,r)}function E(e,n,t,r=[]){return D("Distance",e,n,t,r)}function q(e,n,t,r=[]){return D("Hinge",e,n,t,r)}function T(e,n,t,r=[]){return D("Lock",e,n,t,r)}function j(e,i,s,u=[]){const{worker:a,events:c}=n(J),[l]=t(()=>p.generateUUID()),d=r(null),f=r(null);return e=null==e?d:e,i=null==i?f:i,o(()=>{if(e.current&&i.current)return a.postMessage({op:"addSpring",uuid:l,props:[e.current.uuid,i.current.uuid,s]}),c[l]=()=>{},()=>{a.postMessage({op:"removeSpring",uuid:l}),delete c[l]}},u),[e,i]}function z(e,r,i,s=[]){const{worker:u,events:a}=n(J),[c]=t(()=>p.generateUUID());o(()=>(a[c]=i,u.postMessage({op:"addRay",uuid:c,props:h({mode:e},r)}),()=>{u.postMessage({op:"removeRay",uuid:c}),delete a[c]}),s)}function O(e,n,t=[]){z("Closest",e,n,t)}function G(e,n,t=[]){z("Any",e,n,t)}function H(e,n,t=[]){z("All",e,n,t)}function _(e,t){const o=t||r(null),{worker:u,events:a}=n(J);i(()=>{o.current||(o.current=new l);const n=o.current,t=u;let r=[n.uuid];const i=e();return t.postMessage({op:"addRaycastVehicle",uuid:r,props:[void 0===i.chassisBody.current||null==i.chassisBody.current?null:i.chassisBody.current.uuid,i.wheels.map(e=>void 0===e.current||null===e.current?null:e.current.uuid),i.wheelInfos,i.indexForwardAxis,i.indexRightAxis,i.indexUpAxis]}),()=>{t.postMessage({op:"removeRaycastVehicle",uuid:r})}},[]);const c=s(()=>{const e=e=>void 0!==e?o.current.uuid+"/"+e:o.current.uuid,n=(n,t,r)=>o.current&&u.postMessage({op:n,uuid:e(t),props:r});return h({},(t=void 0,{setSteeringValue(e,r){n("setRaycastVehicleSteeringValue",t,[e,r])},applyEngineForce(e,r){n("applyRaycastVehicleEngineForce",t,[e,r])},setBrake(e,r){n("setRaycastVehicleBrake",t,[e,r])}}));var t},[]);return[o,c]}const J=u({}),K="undefined"==typeof window?()=>null:c(()=>import("./Provider-1bf6ddc6.js"));function N(n){return e.createElement(a,{fallback:null},e.createElement(K,n))}export{N as P,h as _,k as a,A as b,J as c,U as d,R as e,L as f,S as g,V as h,B as i,I as j,P as k,E as l,q as m,T as n,j as o,O as p,G as q,H as r,_ as s,C as u};