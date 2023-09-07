import { values } from "@/features/periodic-table";

export default function render() {
  values.renderer.render( values.scene, values.camera );
}