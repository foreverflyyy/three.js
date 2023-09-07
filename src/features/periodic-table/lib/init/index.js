import * as THREE from "three";
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { fillAsGrid, fillAsHelix, fillAsSphere, fillAsTable } from "@/features/periodic-table/lib/displays";
import { values } from "../index";
import transform from "./lib/transform";
import render from "./lib/render";

export default function init() {

  values.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  values.camera.position.z = 3000;

  values.scene = new THREE.Scene();

  const vector = new THREE.Vector3();
  fillAsTable(values);
  fillAsSphere(values, vector);
  fillAsHelix(values, vector)
  fillAsGrid(values);

  values.renderer = new CSS3DRenderer();
  values.renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'container' ).appendChild( values.renderer.domElement );

  values.controls = new TrackballControls( values.camera, values.renderer.domElement );
  values.controls.minDistance = 500;
  values.controls.maxDistance = 6000;
  values.controls.addEventListener( 'change', render );

  const buttonTable = document.getElementById( 'table' );
  buttonTable.addEventListener( 'click', function () {

    transform( values.targets.table, 2000 );

  } );

  const buttonSphere = document.getElementById( 'sphere' );
  buttonSphere.addEventListener( 'click', function () {

    transform( values.targets.sphere, 2000 );

  } );

  const buttonHelix = document.getElementById( 'helix' );
  buttonHelix.addEventListener( 'click', function () {

    transform( values.targets.helix, 2000 );

  } );

  const buttonGrid = document.getElementById( 'grid' );
  buttonGrid.addEventListener( 'click', function () {

    transform( values.targets.grid, 2000 );

  } );

  transform( values.targets.table, 2000 );

  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
  values.camera.aspect = window.innerWidth / window.innerHeight;
  values.camera.updateProjectionMatrix();
  values.renderer.setSize( window.innerWidth, window.innerHeight );

  render(values);
}
