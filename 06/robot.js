Robot = function() {

this.head = new THREE.Bone();
this.head.position.y = -55;

this.neck = new THREE.Bone();
this.neck.position.y = -10;

this.head.add(this.neck);

this.torso = new THREE.Bone();
this.torso.position.y = -10;

this.neck.add(this.torso);


//left arm
this.left_upper_arm = new THREE.Bone();
this.left_upper_arm.position.x = 10;

this.left_lower_arm = new THREE.Bone();

this.left_hand = new THREE.Bone();

// TODO right arm

this.left_upper_leg = new THREE.Bone();

this.left_lower_leg = new THREE.Bone();

this.left_foot = new THREE.Bone();

// TODO right leg

};