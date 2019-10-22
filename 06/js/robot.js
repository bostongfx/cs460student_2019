function Robot()
{

    this.head = new THREE.Bone();
    addLimb(this.head, null, null, -55);

    this.neck = new THREE.Bone();
    addLimb(this.neck, this.head, null, -10);
  
    this.torso = new THREE.Bone();
    addLimb(this.torso, this.neck, null, -30)
  
    this.right_upper_arm = new THREE.Bone();
    addLimb(this.right_upper_arm, this.neck, 10, null);

    
    this.right_lower_arm = new THREE.Bone();
    addLimb(this.right_lower_arm, this.right_upper_arm, 10, null);


    this.right_hand = new THREE.Bone();
    addLimb(this.right_hand, this.right_lower_arm, null, -10);

    
    this.right_upper_leg = new THREE.Bone();
    addLimb(this.right_upper_leg, this.torso, 10,null);
    
    this.right_lower_leg = new THREE.Bone();
    addLimb(this.right_lower_leg, this.right_upper_leg, 10, null);

    
    this.right_foot = new THREE.Bone();
    addLimb(this.right_foot, this.right_lower_leg, null, -10);
    

    this.left_upper_arm = new THREE.Bone();
    addLimb(this.left_upper_arm, this.neck, -10, null);

    
    this.left_lower_arm = new THREE.Bone();
    addLimb(this.left_lower_arm, this.left_upper_arm, -10, null);


    this.left_hand = new THREE.Bone();
    addLimb(this.left_hand, this.left_lower_arm, null, -10);

    
    this.left_upper_leg = new THREE.Bone();
    addLimb(this.left_upper_leg, this.torso, -10,null);
    
    this.left_lower_leg = new THREE.Bone();
    addLimb(this.left_lower_leg, this.left_upper_leg, -10, null);

    
    this.left_foot = new THREE.Bone();
    addLimb(this.left_foot, this.left_lower_leg, null, -10);
    

function addLimb(object, parent, positionX, positionY)
 {
    this.object = object || new THREE.Bone();
    this.parent = parent || new THREE.Bone();
    this.positionX = positionX || null;
    this.positionY = positionY || null;

    if( this.positionX !=null )
    {
        this.object.position.x = this.positionX;
    }

    if ( this.positionY != null )
    {
        this.object.position.y = this.positionY;
    }

    this.parent.add(this.object)
    
 }
/*
 Robot.prototype.raise_left_arm = function() {
this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
this.movement = 'lower left arm';
};

Robot.prototype.kick = function() {
this.movement = 'kick';
};

Robot.prototype.onAnimate = function() {
if (this.movement == 'raise left arm') {
// ... TODO slerping
} else if (this.movement == 'lower left arm') {
// ... TODO slerping
} else if (this.movement == 'kick') {
// ... TODO slerping and check once it is done for a backwards slerp
// you can use the identity quaternion for a backwards slerp
}
};
*/
}
