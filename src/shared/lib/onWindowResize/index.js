import renderer from "three/addons/renderers/common/Renderer";

export default function onWindowResize(camera, render) {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}