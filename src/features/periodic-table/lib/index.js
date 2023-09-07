import TWEEN from "three/addons/libs/tween.module.js";
import init from "@/features/periodic-table/lib/init";

export const values = {
  camera: null,
  scene: null,
  renderer: null,
  controls: null,
  objects: [],
  targets: { table: [], sphere: [], helix: [], grid: [] }
}

export const FillPeriodicTable = () => {
  init();
  animate();
}

function animate() {
  requestAnimationFrame( animate );
  TWEEN.update();
  values.controls.update();
}