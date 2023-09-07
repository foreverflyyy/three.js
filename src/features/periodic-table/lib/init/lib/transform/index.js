import TWEEN from 'three/addons/libs/tween.module.js';
import { values } from "@/features/periodic-table";
import render from "../render";

export default function transform( targets, duration ) {

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