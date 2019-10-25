Robot = function(x, y, z){
  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;

  this.neck = new THREE.Bone();
  this.neck.position.y = -10;

  this.head.add(this.neck);

  this.torso = new THREE.Bone();
  this.torso.position.y = -30;

  this.neck.add(this.torso);

  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.x = 10;
  this.left_upper_arm.position.y = -5;
  this.torso.add(this.left_upper_arm);


  this.left_lower_arm= new THREE.Bone();
  this.left_upper_arm.position.x = 10;
  this.left_upper_arm.position.y = -15;
  this.left_upper_arm.add(this.left_lower_arm);

  this.left_hand= new THREE.Bone();
  this.left_hand.position.x = x;
  this.left_hand.position.y = x;

  this.left_upper_leg= new THREE.Bone();
  this.left_upper_leg.position.x = x;
  this.left_upper_leg.position.y = y;


  this.left_hand = new THREE.Bone();
  this.left_lower_leg = new THREE.Bone();
  this.left_foot = new THREE.Bone();


};

Robot.prototype.show = function(scene){
  rGroup = new THREE.Group();
  rGroup.add(r.head);

  scene.add(rGroup);

  helper = new THREE.SkeletonHelper(r.head);
  scene.add(helper);
};

Robot.prototype.raiseLeftArm = function(){
  this.movement = 'raise left arm';
};

Robot.prototype.kick = function(){
  this.movement = 'kick';
};

Robot.prototype.kickDone = function(){
  this.movement = 'kick done';
};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = -Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );

  } else if (this.movement == 'kick') {

    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );

    }

  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

  }

};
