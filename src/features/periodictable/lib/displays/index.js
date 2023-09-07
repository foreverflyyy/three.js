import * as THREE from "three";
import { table } from "@/features/periodictable/data/elements";
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

export const fillAsTable = (values) => {

  for ( let i = 0; i < table.length; i += 5 ) {
    const element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    const number = document.createElement( 'div' );
    number.className = 'number';
    number.textContent = ( i / 5 ) + 1;
    element.appendChild( number );

    const symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = table[ i ];
    element.appendChild( symbol );

    const details = document.createElement( 'div' );
    details.className = 'details';
    details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
    element.appendChild( details );

    const objectCSS = new CSS3DObject( element );
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    values.scene.add( objectCSS );

    values.objects.push( objectCSS );

    //

    const object = new THREE.Object3D();
    object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
    object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

    values.targets.table.push( object );
  }
}

export const fillAsSphere = (values, vector) => {

  for ( let i = 0, l = values.objects.length; i < l; i ++ ) {

    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;

    const object = new THREE.Object3D();

    object.position.setFromSphericalCoords( 800, phi, theta );

    vector.copy( object.position ).multiplyScalar( 2 );

    object.lookAt( vector );

    values.targets.sphere.push( object );

  }
}

export const fillAsHelix = (values, vector) => {

  for ( let i = 0, l = values.objects.length; i < l; i ++ ) {

    const theta = i * 0.175 + Math.PI;
    const y = - ( i * 8 ) + 450;

    const object = new THREE.Object3D();

    object.position.setFromCylindricalCoords( 900, theta, y );

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt( vector );

    values.targets.helix.push( object );

  }
}

export const fillAsGrid = (values) => {

  for ( let i = 0; i < values.objects.length; i ++ ) {

    const object = new THREE.Object3D();

    object.position.x = ( ( i % 5 ) * 400 ) - 800;
    object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
    object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
    values.targets.grid.push( object );
  }
}