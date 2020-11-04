Robot = function(x, y, z){
	//head
	this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;
    //neck
	this.neck = new THREE.Bone();
    this.neck.position.y = -10;
	this.head.add(this.neck);
	//torso
    this.torso = new THREE.Bone();
    this.torso.position.y = -30  // the torso is 3x as long as the neck
	this.neck.add(this.torso);
	//right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -10;
    this.right_upper_arm.position.y = -5;
    this.neck.add(this.right_upper_arm);
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -10;
    this.right_lower_arm.position.y = -20;
    this.right_upper_arm.add(this.right_lower_arm);
    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = -5;
    this.right_lower_arm.add(this.right_hand)
	//left arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 10;
    this.left_upper_arm.position.y = -5;
    this.neck.add(this.left_upper_arm);
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 10; 
    this.left_lower_arm.position.y = -20;
    this.left_upper_arm.add(this.left_lower_arm);
    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = 5; 
    this.left_lower_arm.add(this.left_hand)
    //right leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -10;
    this.right_upper_leg.position.y = -30;
    this.torso.add(this.right_upper_leg);
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -25;
    this.right_upper_leg.add(this.right_lower_leg);
    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_lower_leg.add(this.right_foot);
	//left leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 10;
    this.left_upper_leg.position.y = -30;
    this.torso.add(this.left_upper_leg);
    this.left_lower_leg = new THREE.Bone(); 
    this.left_lower_leg.position.y = -25;
    this.left_upper_leg.add(this.left_lower_leg);
    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 5
    this.left_lower_leg.add(this.left_foot);

    this.movement = null;
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

    if( this.movement == 'raise left arm' ) {

    } 
	else if( this.movement == 'lower left arm' ) {

    } 
    else if( this.movement == 'kick' ) {


    }
 };