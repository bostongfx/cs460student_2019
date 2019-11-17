Robot = function(x, y, z) {
  
  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'white' );
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, -30, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;
  // end of head, neck, and torso

  // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 3, 'blue' );
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];
  
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.left_upper_arm = bones[ 1 ];
  this.left_upper_arm.position.x = 5;
  this.left_upper_arm.position.y = -5;
  this.left_lower_arm = bones[ 2 ];
  this.left_lower_arm.position.x = 5;
  this.left_lower_arm.position.y = -15;
  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = -3;
  this.left_hand.position.y = -5;

  this.leftarm_mesh = mesh;
  // end of left arm

  // start of right arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 3, 'blue' );
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] );

  this.right_upper_arm = bones[ 1 ];
  this.right_upper_arm.position.x = -5;
  this.right_upper_arm.position.y = -5;
  this.right_lower_arm = bones[ 2 ];
  this.right_lower_arm.position.x = -5;
  this.right_lower_arm.position.y = -15;
  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = 3;
  this.right_hand.position.y = -5

  this.rightarm_mesh = mesh;
  // end of right arm

  // start of left leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 3, 'blue' );
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] );

  this.left_upper_leg = bones[ 1 ];
  this.left_upper_leg.position.x = 5;
  this.left_upper_leg.position.y = -10;
  this.left_lower_leg = bones[ 2 ];
  this.left_lower_leg.position.x = 2;
  this.left_lower_leg.position.y = -15;
  this.left_foot = bones[ 3 ];

  this.leftleg_mesh = mesh;
  // end of left leg

  // start of right leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 3, 'blue' );
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] );

  this.right_upper_leg = bones[ 1 ];
  this.right_upper_leg.position.x = -5;
  this.right_upper_leg.position.y = -10;
  this.right_lower_leg = bones[ 2 ];
  this.right_lower_leg.position.x = -2;
  this.right_lower_leg.position.y = -15;
  this.right_foot = bones[ 3 ];

  this.rightleg_mesh = mesh;

  // end of right leg

  // this will control which animation to run
  this.movement = null; // for instance 'raise left arm', 
                        // raises the left arm


};

Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

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

// Bonus Part 2
// *************

Robot.prototype.dance = function() {
  this.movement = 'dance';
};

Robot.prototype.dance2 = function() {
  this.movement = 'dance2';
};

Robot.prototype.danceBreak = function() {
  this.movement = 'danceBreak';
};

Robot.prototype.walk = function() {
  this.movement = 'walk';
};

Robot.prototype.walk2 = function() {
  this.movement = 'walk2';
};

Robot.prototype.onStep = function() {

  for (var a in ALLROBOTS) {
    a = ALLROBOTS[a];

    if (a.root.position.equals(this.root.position)){
      continue;
    }

    if (a.root.position.distanceTo(this.root.position) < 10) {
      this.root.rotateY(Math.PI/2);
    }
  }

  if (this.root.position.z > 490 || this.root.position.z < -490)
    this.root.rotateY(Math.PI/2);

  else if (this.root.position.x > 490 || this.root.position.x < -490)
    this.root.rotateY(Math.PI/2);

  this.root.translateZ(10);
}

Robot.prototype.onAnimate = function() {

  // gets called on each animate loop
  // meaning on every frame

  // check which movement is requested
  if ( this.movement == 'raise left arm') {

    // raise the left arm
    T = Math.PI;
    var x = Math.sin(T/2)
    var y = 0
    var z = 0
    var w = Math.cos(T/2)    

    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                          x,
                                          y,
                                          z,
                                          w
      ), 0.1 );


  } else if ( this.movement == 'lower left arm') {
  	// lower the left arm
    T = 0;
    var x = Math.sin(T/2)
    var y = 0
    var z = 0
    var w = Math.cos(T/2)    

    r.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
                                          x,
                                          y,
                                          z,
                                          w
      ), 0.1 );
  } else if (this.movement == 'kick') {

  	if (this.right_upper_leg.quaternion.w < 0.72) {
  		this.movement = 'kick done'
  	} else {
  		var T = -Math.PI/2;
  		this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T/2 ),
  																	 0,
  																	 0,
  																	 Math.cos( T/2 ) ),
  												0.1 );
  	}
  } else if (this.movement == 'kick done') {
  	this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0 ,0 ,0 ,1), 0.1);

  } else if (this.movement == 'dance') {

  	if (typeof this.dancer === 'undefined') {
      count = 0;
      dancer = setInterval(function() {
 
        if (count % 4 == 0) {
          this.neck.position.z = 40;
          this.neck.position.x = 0;
          count++;
        } else if (count % 4 == 1) {
          this.neck.position.z = 0;
          this.neck.position.x = -40;
          count++;
        } else if (count % 4 == 2) {
          this.neck.position.z = -40;
          this.neck.position.x = 0;
          count++;
        } else if ( count % 4 == 3 ) {
          this.neck.position.z = 0;
          this.neck.position.x = 40;
          count++;
        } else {}
        
      }.bind(this), 500);
    }
  } else if (this.movement == 'walk') {

    if (this.right_upper_leg.quaternion.w < 0.93)
      this.movement = 'walk2';

    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0 ,0 ,0 ,1), 0.5);
    
    var T = -Math.PI/4;
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                          Math.sin( T/2 ),
                                          0,
                                          0,
                                          Math.cos( T/2 )
      ), 0.5 );

    this.onStep();

  } else if (this.movement == 'walk2') {
    
    if (this.left_upper_leg.quaternion.w < 0.93)
      this.movement = 'walk';

    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0 ,0 ,0 ,1), 0.5);

    var T = -Math.PI/4;
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(
                                          Math.sin( T/2 ),
                                          0,
                                          0,
                                          Math.cos( T/2 )
      ), 0.5 );

    this.onStep();

  }

};