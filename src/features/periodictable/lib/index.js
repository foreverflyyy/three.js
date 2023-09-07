import * as THREE from 'three';

import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { fillAsTable, fillAsSphere, fillAsHelix, fillAsGrid } from './displays'

export const Start = () => {
  const values = {
    camera: null,
    scene: null,
    renderer: null,
    controls: null,
    objects: [],
    targets: { table: [], sphere: [], helix: [], grid: [] }
  }

  init();
  animate();

  function init() {

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

  function transform( targets, duration ) {

    TWEEN.removeAll();

    for ( let i = 0; i < values.objects.length; i ++ ) {

      const object = values.objects[ i ];
      const target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    }

    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate( render )
      .start();

  }

  function onWindowResize() {

    values.camera.aspect = window.innerWidth / window.innerHeight;
    values.camera.updateProjectionMatrix();

    values.renderer.setSize( window.innerWidth, window.innerHeight );

    render();
  }

  function animate() {

    requestAnimationFrame( animate );

    TWEEN.update();

    values.controls.update();

  }

  function render() {

    values.renderer.render( values.scene, values.camera );

  }
}