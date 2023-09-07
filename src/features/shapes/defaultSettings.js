import * as THREE from "three";


export const setDefaultSettings = (shape) => {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  scene.add( shape );

  camera.position.z = 25;

  return function render() {
    requestAnimationFrame( render );
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
}