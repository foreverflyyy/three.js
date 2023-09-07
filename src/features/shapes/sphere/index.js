import * as THREE from "three"

export const getEllipse = () => {
  let geometry = new THREE.SphereGeometry(8, 32, 32);
  let material = new THREE.MeshNormalMaterial();
  return new THREE.Mesh( geometry, material );
}