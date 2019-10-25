Robot = function (x, y, z) 
{
   this.head = new THREE.Bone();
   addLimb(this.head, this.face, null, -55);
   this.head.position.set(x, y, z);
   
   this.neck = new THREE.Bone();
   addLimb(this.neck, this.head, null, -10);
   
   this.torso = new THREE.Bone();
   addLimb(this.torso, this.neck, null, -40)
   
   this.right_upper_arm = new THREE.Bone();
   addLimb(this.right_upper_arm, this.neck, 10, -5);
   this.left_upper_arm = new THREE.Bone();
   addLimb(this.left_upper_arm, this.neck, -10, -5);
   
   this.right_lower_arm = new THREE.Bone();
   addLimb(this.right_lower_arm, this.right_upper_arm, 10,-15);
   this.left_lower_arm = new THREE.Bone();
   addLimb(this.left_lower_arm, this.left_upper_arm, -10,-15);
   
   this.right_hand = new THREE.Bone();
   addLimb(this.right_hand, this.right_lower_arm, 1,-15);
   this.left_hand = new THREE.Bone();
   addLimb(this.left_hand, this.left_lower_arm, -1,-15);
   
   this.right_upper_leg = new THREE.Bone();
   addLimb(this.right_upper_leg, this.torso, 10, -5);   
   this.left_upper_leg = new THREE.Bone();
   addLimb(this.left_upper_leg, this.torso, -10, -5);
   
   this.right_lower_leg = new THREE.Bone();
   addLimb(this.right_lower_leg, this.right_upper_leg, 10, -15);   
   this.left_lower_leg = new THREE.Bone();
   addLimb(this.left_lower_leg, this.left_upper_leg, -10, -15);
   
   this.right_foot = new THREE.Bone();
   addLimb(this.right_foot, this.right_lower_leg, 1,-15);
   this.left_foot = new THREE.Bone();
   addLimb(this.left_foot, this.left_lower_leg, -1 , -15);

   function addLimb(object, parent, positionX, positionY) 
   {
      this.object = object || new THREE.Bone();
      this.parent = parent || new THREE.Bone();
      this.positionX = positionX || null;
      this.positionY = positionY || null;
      if (this.positionX != null) 
      {
         this.object.position.x = this.positionX;
      }
      if (this.positionY != null) 
      {
         this.object.position.y = this.positionY;
      }
      this.parent.add(this.object)
   };

   function show(scene) 
   {
      rGroup = new THREE.Group();
      rGroup.add(r.head);
      scene.add(rGroup);
      helper = new THREE.SkeletonHelper(rGroup);
      scene.add(helper);
   };

Robot.prototype.show = function(scene) {

  rGroup = new THREE.Group();
  rGroup.add(r.head);

  scene.add(rGroup);

  helper = new THREE.SkeletonHelper( rGroup );

  scene.add(helper);

};

Robot.prototype.raiseLeftArm = function()
 {

  this.movement = 'raise left arm';

};

Robot.prototype.onAnimate = function()
 {

  // gets called on each animate loop
  // meaning on every frame

  // check which movement is requested
  if( this.movement == 'raise left arm')
   {

    // raise the left arm
    T=Math.PI;
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


  }
}
};