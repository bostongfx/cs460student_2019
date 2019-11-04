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
  this.left_upper_arm.position.x = 15;
  this.left_upper_arm.position.y = -10;
  this.neck.add(this.left_upper_arm);


  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.x = 10;
  this.left_lower_arm.position.y = -15;
  this.left_upper_arm.add(this.left_lower_arm);

  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -10;
  this.left_lower_arm.add(this.left_hand);

  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.x = -15;
  this.right_upper_arm.position.y = -10;
  this.neck.add(this.right_upper_arm);

  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.x = -10;
  this.right_lower_arm.position.y = -15;
  this.right_upper_arm.add(this.right_lower_arm);

  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -10;
  this.right_lower_arm.add(this.right_hand);


  this.left_upper_leg= new THREE.Bone();
  this.left_upper_leg.position.x = 10;
  this.left_upper_leg.position.y = -25;
  this.torso.add(this.left_upper_leg);

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.x = 10;
  this.left_lower_leg.position.y = -35;
  this.left_upper_leg.add(this.left_lower_leg);

  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.left_lower_leg.add(this.left_foot);

  this.right_upper_leg= new THREE.Bone();
  this.right_upper_leg.position.x = -10;
  this.right_upper_leg.position.y = -25;
  this.torso.add(this.right_upper_leg);

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.x = -10;
  this.right_lower_leg.position.y = -35;
  this.right_upper_leg.add(this.right_lower_leg);

  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  this.right_lower_leg.add(this.right_foot);


};

Robot.prototype.show = function(scene){
  rGroup = new THREE.Group();
  rGroup.add(r.head);

  helper = new THREE.SkeletonHelper(rGroup);
  helper.material.linewidth = 3;

  scene.add(rGroup);
  scene.add(helper);
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
<<<<<<< HEAD
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),  // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
=======
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0,
                                                              0, Math.cos(T/2)), 0.1 );
>>>>>>> cde26f695f35efa94714528800e89336d022da1a

  } else if (this.movement == 'lower left arm') {

    var T = -Math.PI;
<<<<<<< HEAD
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,    // y
                                                              0,    // z
                                                              0),   // w
=======
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 0),
>>>>>>> cde26f695f35efa94714528800e89336d022da1a
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
    this.head.position.y += step;

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
      if(this.head.position.y > 0){
        this.head.position.y -= step*2;
      }
  }
  else if (this.movement == 'dance') {
    step = 5;
    if (this.head.position.y > -20) {
      this.head.position.y -= step;
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
