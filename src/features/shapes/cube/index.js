import * as THREE from "three"

export const getCube = () => {
  let geometry = new THREE.BoxGeometry( 10, 10, 10);
  let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  return new THREE.Mesh( geometry, material );
}