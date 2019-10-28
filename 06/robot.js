Robot = function(x, y, z) {
  
  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;


  this.neck = new THREE.Bone();
  this.neck.position.y = -10; // relative to the head

  this.head.add( this.neck );




  this.torso = new THREE.Bone();
  this.torso.position.y = -35; // relative to the neck

  this.neck.add( this.torso );



  // COMPLETE left arm
  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.x = 10; // relative to the neck
  this.left_upper_arm.position.y = -5;

  this.neck.add( this.left_upper_arm );



  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.x = 8; // relative to L upper arm
  this.left_lower_arm.position.y = -18;

  this.left_upper_arm.add( this.left_lower_arm );



  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = -1; // relative to L lower arm
  this.left_hand.position.y = -5;

  this.left_lower_arm.add( this.left_hand );



  // COMPLETE right arm
  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.x = -10; // relative to the neck
  this.right_upper_arm.position.y = -5;

  this.neck.add( this.right_upper_arm );



  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.x = -8; // relative to R upper arm
  this.right_lower_arm.position.y = -18;

  this.right_upper_arm.add( this.right_lower_arm );



  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = 1; // relative to R lower arm
  this.right_hand.position.y = -5;

  this.right_lower_arm.add( this.right_hand );


  // COMPLETE left leg
  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.x = 8; // relative to the torso
  this.left_upper_leg.position.y = -28;

  this.torso.add( this.left_upper_leg );



  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.y = -25; // relative to L upper leg

  this.left_upper_leg.add( this.left_lower_leg );



  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 6; // relative to L lower leg

  this.left_lower_leg.add( this.left_foot );


  // COMPLETE right leg
  this.right_upper_leg = new THREE.Bone();
  this.right_upper_leg.position.x = -8; // relative to the torso
  this.right_upper_leg.position.y = -28;

  this.torso.add( this.right_upper_leg );


  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.y = -25; // relative to the R upper leg

  this.right_upper_leg.add( this.right_lower_leg );


  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -6; // relative to the L lower leg

  this.right_lower_leg.add( this.right_foot );



  // this will control which animation to run
  this.movement = null; // for instance 'raise left arm', 
                        // raises the left arm


};

Robot.prototype.show = function(scene) {

  rGroup = new THREE.Group();
  rGroup.add( this.head );

  scene.add( rGroup );

  helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 10; // make the skeleton thick

  scene.add( helper );

};

Robot.prototype.raiseLeftArm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lowerLeftArm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.onAnimate = function() {

  // gets called on each animate loop
  // meaning on every frame

  // check which movement is requested
  if( this.movement == 'raise left arm' ) {

    // front raise the left arm
    T = Math.PI;
    var x = Math.sin( T/2 )
    var y = 0
    var z = 0
    var w = Math.cos( T/2 )    

    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion( x, y, z, -w ), 0.1 );


  } else if( this.movement == 'lower left arm' ) {

    // lower the left arm using the identity quaternion
    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, -1 ), 0.1 );


  } else if( this.movement == 'kick' ) {

    // animate a right kick
    //
    // check if the slerp has almost reached its end
    if( this.right_upper_leg.quaternion.w < 0.87 ) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      // forward kick with the right leg
      T = Math.PI/3;
      var x = Math.sin( T/2 )
      var y = 0
      var z = 0
      var w = Math.cos( T/2 )

      r.right_upper_leg.quaternion.slerp( new THREE.Quaternion( x, y, z, -w ), 0.1 );
    }


  } else if( this.movement == 'kick done' ) {

      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1 ), 0.1 );


  }
};