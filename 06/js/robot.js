Robot = function (x, y, z) 

{
    this.head = new THREE.Bone();
      addLimb(this.neck, this.head, x, y);
    this.head.position.z = z;

    this.neck = new THREE.Bone();
    addLimb(this.neck, this.head, null, -10);

    this.torso = new THREE.Bone();
    addLimb(this.torso, this.neck, null, -40);

    this.right_upper_arm = new THREE.Bone();
    addLimb(this.right_upper_arm, this.neck, 10, -5);
    this.left_upper_arm = new THREE.Bone();
    addLimb(this.left_upper_arm, this.neck, -10, -5);

    this.right_lower_arm = new THREE.Bone();
    addLimb(this.right_lower_arm, this.right_upper_arm, 10, -15);
    this.left_lower_arm = new THREE.Bone();
    addLimb(this.left_lower_arm, this.left_upper_arm, -10, -15);

    this.right_hand = new THREE.Bone();
    addLimb(this.right_hand, this.right_lower_arm, 1, -15);
    this.left_hand = new THREE.Bone();
    addLimb(this.left_hand, this.left_lower_arm, -1, -15);

    this.right_upper_leg = new THREE.Bone();
    addLimb(this.right_upper_leg, this.torso, 10, -5);
    this.left_upper_leg = new THREE.Bone();
    addLimb(this.left_upper_leg, this.torso, -10, -5);

    this.right_lower_leg = new THREE.Bone();
    addLimb(this.right_lower_leg, this.right_upper_leg, 10, -15);
    this.left_lower_leg = new THREE.Bone();
    addLimb(this.left_lower_leg, this.left_upper_leg, -10, -15);

    this.right_foot = new THREE.Bone();
    addLimb(this.right_foot, this.right_lower_leg, 1, -15);
    this.left_foot = new THREE.Bone();
    addLimb(this.left_foot, this.left_lower_leg, -1, -15);

this.show = function (scene) 

{
    rGroup = new THREE.Group();
    rGroup.add(r.head);
    scene.add(rGroup);
    helper = new THREE.SkeletonHelper(rGroup);
    scene.add(helper);
}


this.raiseLeftArm = function () 
{

    this.movement = 'raise left arm';

}

this.lowerLeftArm = function () 

{

    this.movement = 'lower left arm';

}


this.raiseRightArm = function () 
{

    this.movement = 'raise right arm';

}

this.lowerRightArm = function () 

{

    this.movement = 'lower right arm';

}

this.raiseLeftLeg = function () 

{

    this.movement = 'raise left leg';

}

this.lowerLeftLeg = function () 

{

    this.movement = 'lower left leg';

}


this.raiseRightLeg = function () 

{

    this.movement = 'raise right leg';

}

this.lowerRightLeg = function () 

{

    this.movement = 'lower right leg';

}

this.kick = function () 

{

    this.movement = 'kick';

}

this.kickDone = function () 

{

    this.movement = 'kick done';

}

this.dance = function ()
{
  this.movement = 'dance';
}

this.wave = function ()
{
 this.movement = 'wave';
}



this.onAnimate = function() 
{


  if (this.movement == 'raise left arm') 
  {
    var T = -Math.PI;
    var x = Math.sin(T/2);
    var y = 0;
    var z = 0;
    var w = Math.cos(T/2);

    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }
  else if (this.movement == 'lower left arm')
  {
    var x = 0;
    var y = 0;
    var z = 0;
    var w = 1;

    this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }

 else if (this.movement == 'raise left leg')
  {
      var T = -Math.PI/2;
      var x = Math.sin(T/2);
      var y = 0;
      var z = 0;
      var w = Math.cos(T/2);
    this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }



 else if (this.movement == 'lower left leg')
  {
    var x = 0;
    var y = 0;
    var z = 0;
    var w = 1;

    this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }

 else if (this.movement == 'raise right leg')
  {
      var T = -Math.PI/2;
      var x = Math.sin(T/2);
      var y = 0;
      var z = 0;
      var w = Math.cos(T/2);
    this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }



 else if (this.movement == 'lower right leg')
  {
    var x = 0;
    var y = 0;
    var z = 0;
    var w = 1;

    this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }

  else if (this.movement == 'raise right arm') 
  {
    var T = -Math.PI;
    var x = Math.sin(T/2);
    var y = 0;
    var z = 0;
    var w = Math.cos(T/2);

    this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }
  else if (this.movement == 'lower right arm')
  {
    var x = 0;
    var y = 0;
    var z = 0;
    var w = 1;

    this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
  }


else if (this.movement == 'dance')
{
  var danceMove = this;
  setTimeout(function (){
  danceA(danceMove);
  setTimeout(function(){
      danceB(danceMove);
  },300)
  },450)
}

else if (this.movement == 'wave')
{
  var waveTemp = this;
  waveTemp.movement = 'raise left arm';
  var atemp = this;
  // atemp.movement = 'raise left arm';
  // atemp.onAnimate();
 setTimeout(function(){
  waveTemp.movement = 'lower left arm';
  waveTemp.onAnimate();}, 200);
 
 setTimeout(function(){
 waveTemp.movement = 'raise left arm';
  // atemp.onAnimate();
  setTimeout(function(){
   waveTemp.movement = 'lower left arm';
  waveTemp.onAnimate();}, 200);
  },300)

}


  else if (this.movement == 'kick') 
  {

    // check if slerp reached almost the end
    if (this.right_upper_leg.quaternion.w < 0.72)
    {
      this.movement = 'kick done';
    }
    else
    {
      var T = -Math.PI/2;
      var x = Math.sin(T/2);
      var y = 0;
      var z = 0;
      var w = Math.cos(T/2);
      this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
    }

  }

  else if (this.movement == 'kick done') 
  {
    var x = 0;
    var y = 0;
    var z = 0;
    var w = 1;

    // reset leg back to identity
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(x,y,z,w), 0.1 );
  }


}



 function addLimb (object, parent, positionX, positionY) 

{
    this.object = object || new THREE.Bone();
    this.parent = parent || new THREE.Bone();
    this.positionX = positionX || null;
    this.positionY = positionY || null;
    if (this.positionX != null);
    
    {
        this.object.position.x = this.positionX;
    }

    if (this.positionY != null);
    
    {
        this.object.position.y = this.positionY;
    }

    this.parent.add(this.object);
}

function danceA (object)
{
   var danceTemp = object;
  setTimeout(function()
    {
      danceTemp.raiseLeftArm();
      setTimeout(function(){
        danceTemp.raiseRightArm();
        setTimeout(function(){
          danceTemp.lowerLeftArm()
          setTimeout(function(){
            danceTemp.lowerRightArm();
          },600)
        },600)
      },600)
    },600)
  return;
}


function danceB (object)
{
   var danceTemp = object;
  setTimeout(function()
    {
      danceTemp.raiseLeftLeg();
      setTimeout(function(){
        danceTemp.lowerLeftLeg();
        setTimeout(function(){
          danceTemp.raiseRightLeg()
          setTimeout(function(){
            danceTemp.lowerRightLeg();
          },600)
        },600)
      },600)
    },600)
  return;
}

}
;
