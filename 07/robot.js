
Robot = function(x, y, z){

  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;
  // end of head, neck, torso

  // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.left_upper_arm = bones[1];
  this.left_upper_arm.position.x = 15
  this.left_upper_arm.position.y = -10

  this.left_lower_arm = bones[2];
  this.left_lower_arm.position.x = 10
  this.left_lower_arm.position.y = -15

  this.left_hand = bones[3];
  this.left_hand.position.x = 5
  this.left_hand.position.y = -10

  this.leftarm_mesh = mesh;

  // start of right arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point

  this.right_upper_arm = bones[1];
  this.right_upper_arm.position.x = -15
  this.right_upper_arm.position.y = -10

  this.right_lower_arm = bones[2];
  this.right_lower_arm.position.x = -10
  this.right_lower_arm.position.y = -15

  this.right_hand = bones[3];
  this.right_hand.position.x = -5
  this.right_hand.position.y = -10

  this.rightarm_mesh = mesh;

  // start of left leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.left_upper_leg = bones[1];
  this.left_upper_leg.position.x = 10
  this.left_upper_leg.position.y = -25

  this.left_lower_leg = bones[2];
  this.left_lower_leg.position.x = 10
  this.left_lower_leg.position.y = -35

  this.left_foot = bones[3];
  this.left_foot.position.x = 5
  this.left_foot.position.y = -5

  this.leftleg_mesh = mesh;

  // start of right leg
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add( bones[ 0 ] ); // invisible anchor point

  this.right_upper_leg = bones[1];
  this.right_upper_leg.position.x = -10
  this.right_upper_leg.position.y = -25

  this.right_lower_leg = bones[2];
  this.right_lower_leg.position.x = -10
  this.right_lower_leg.position.y = -35

  this.right_foot = bones[3];
  this.right_foot.position.x = -5
  this.right_foot.position.y = -5

  this.rightleg_mesh = mesh;

  this.movement = null;
};


Robot.prototype.show = function(scene){
  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
};

Robot.prototype.raiseLeftArm = function(){
  this.movement = 'raise left arm';
};
Robot.prototype.lowerLeftArm = function(){
  this.movement = 'lower left arm';
};

Robot.prototype.kick = function(){
  this.movement = 'kick';
};

Robot.prototype.kickDone = function(){
  this.movement = 'kick done';
};
Robot.prototype.jump = function() {
  this.movement = 'jump';
};
Robot.prototype.jump2 = function() {
  this.movement = 'jump2';
};

Robot.prototype.dance = function() {
  this.movement = 'dance';
};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),  // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                              0, Math.cos(T/2)), 0.1 );

  } else if (this.movement == 'lower left arm') {

    var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 0),
                                        0.1 );

  } else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI/2;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 0,
                                                                  0, Math.cos( T / 2 ) ), 0.1 );

    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  } else if (this.movement == 'jump') {
    step = 2;
    this.root.position.y += step;

    if(this.neck.quaternion.w < 0.93){
         this.movement = 'jump2';

    }
    else {
      T = 3 * Math.PI/4;
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                 0, Math.cos(T/2)), 0.1 );
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                  0, Math.cos(T/2)), 0.1 );
      T = -3 * Math.PI/4
      this.torso.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                        0, Math.cos(T/2)), 0.1 );
      T = -Math.PI/2;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, Math.sin(T/2),
                                                                 0, Math.cos(T/2)), 0.1 );
      this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                 0, Math.cos(T/2)), 0.1 );
      this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                  0, Math.cos(T/2)), 0.1 );
      T = Math.PI/2;
      this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0, Math.sin(T/2),
                                                                  0, Math.cos(T/2)), 0.1 );
      T = Math.PI/4;
      this.neck.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                0, Math.cos(T/2)), 0.1 );
    }
  } else if (this.movement == 'jump2') {
      this.neck.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.torso.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      if(this.root.position.y > 10){
        this.root.position.y -= step*2;
      }
  }
  else if (this.movement == 'dance') {
    step = 5;
    if (this.root.position.y > -10) {
      this.root.position.y -= step;
    }
    if(this.left_upper_arm.quaternion.w < .01){
      this.movement = 'dance2'
    }
    else {
      T = -Math.PI/2;
      this.torso.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                        0, Math.cos(T/2)), 0.5 );
      T = Math.PI/2;
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                0, 1), 0.5 );
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                  0, Math.cos(T/2)), 0.5 );
      T = -Math.PI;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                 0,  Math.cos(T/2)), 0.5 );
      this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(0,  Math.sin(T/2),
                                                                 0,  Math.cos(T/2)), 0.5 );
      this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.5 );
      this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                  0, 1), 0.5 );
    }
  } else if (this.movement == 'dance2'){
    if(this.right_upper_arm.quaternion.w < .01){
      this.movement = 'dance'
    }
    else {
      T = -Math.PI;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                0, 1), 0.1 );
      this.left_lower_arm.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                0, 1), 0.1 );
      this.right_lower_arm.quaternion.slerp( new THREE.Quaternion(0, Math.sin(T/2),
                                                                  Math.cos(T/2)), 0.1 );
      this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                  0, Math.cos(T/2)), 0.1 );
      T = Math.PI/2;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0, 0,
                                                                0, 1), 0.1 );
      this.left_upper_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                                  0, Math.cos(T/2)), 0.1 );

    }

  }

};
