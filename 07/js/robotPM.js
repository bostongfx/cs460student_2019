
Robot = function (x, y, z)
{

    // HEAD, NECK, TORSO
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.root = bones[0]; // invisible anchor point
    this.root.position.set(x, y, z);

    this.head = bones[1];
    this.head.position.z = z;

    this.neck = bones[2];
    setPosition(this.neck, null, -10)

    this.torso = bones[3];
    setPosition(this.torso, null, -40)

    this.body_mesh = mesh;

    // LEFT ARM

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]); // invisible anchor point

    this.left_upper_arm = bones[1];
    setPosition(this.left_upper_arm, -10, -5);

    this.left_lower_arm = bones[2];
    setPosition(this.left_lower_arm, -10, -15);

    this.left_hand = bones[3];
    setPosition(this.left_hand, -1, -15);

    this.left_arm_mesh = mesh;

    // RIGHT ARM
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]); // invisible anchor point

    this.right_upper_arm = bones[1];
    setPosition(this.right_upper_arm, 10, -5)

    this.right_lower_arm = bones[2];
    setPosition(this.right_lower_arm, 10, -15)

    this.right_hand = bones[3];
    setPosition(this.right_hand, 1, -15);

    this.right_arm_mesh = mesh;

    // LEFT LEG
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]); // invisible anchor point

    this.left_upper_leg = bones[1];
    setPosition(this.left_upper_leg, -10, -5);

    this.left_lower_leg = bones[2];
    setPosition(this.left_lower_leg, -10, -15);

    this.left_foot = bones[3];
    setPosition(this.left_foot, -1, -15);

    this.left_leg_mesh = mesh;

    // RIGHT LEG
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]); // invisible anchor point

    this.right_upper_leg = bones[1];
    setPosition(this.right_upper_leg, 10, -5);

    this.right_lower_leg = bones[2];
    setPosition(this.right_lower_leg, 10, -15);

    this.right_foot = bones[3];
    setPosition(this.right_foot, 1, -15);

    this.right_leg_mesh = mesh;

    this.movement = null;

}

Robot.prototype.show = function (scene)

{

    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
    scene.add(this.right_leg_mesh);

}

Robot.prototype.raiseLeftArm = function ()
{

    this.movement = 'raise left arm';

}

Robot.prototype.lowerLeftArm = function ()

{

    this.movement = 'lower left arm';

}

Robot.prototype.raiseRightArm = function ()
{

    this.movement = 'raise right arm';

}

Robot.prototype.lowerRightArm = function ()

{

    this.movement = 'lower right arm';

}

Robot.prototype.raiseLeftLeg = function ()

{

    this.movement = 'raise left leg';

}

Robot.prototype.lowerLeftLeg = function ()

{

    this.movement = 'lower left leg';

}

Robot.prototype.raiseRightLeg = function ()

{

    this.movement = 'raise right leg';

}

Robot.prototype.lowerRightLeg = function ()

{

    this.movement = 'lower right leg';

}

Robot.prototype.kick = function ()

{

    this.movement = 'kick';

}

Robot.prototype.kickDone = function ()

{

    this.movement = 'kick done';

}

Robot.prototype.dance = function ()
{
    this.movement = 'dance';
}

Robot.prototype.wave = function ()
{
    this.movement = 'wave';
}



Robot.prototype.onAnimate = function ()
{

    if (this.movement == 'raise left arm')
    {
        var T = -Math.PI;
        var x = Math.sin(T / 2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T / 2);

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
        var T = -Math.PI / 2;
        var x = Math.sin(T / 2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T / 2);
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
        var T = -Math.PI / 2;
        var x = Math.sin(T / 2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T / 2);
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
        var x = Math.sin(T / 2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T / 2);

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

/*
    else if (this.movement == 'dance')
    {
        setInterval(function ()
        {
            var danceMove = this;
            setTimeout(function ()
            {
                danceA(danceMove);
                setTimeout(function ()
                {
                    danceB(danceMove);
                }, 300)
            }, 450)
        }
            .bind(this), 500);

    }
    */
    else if (this.movement == 'wave')
    {
        var waveTemp = this;
        waveTemp.movement = 'raise left arm';
        var atemp = this;
        // atemp.movement = 'raise left arm';
        // atemp.onAnimate();
        setTimeout(function ()
        {
            waveTemp.movement = 'lower left arm';
            waveTemp.onAnimate();
        }, 200);

        setTimeout(function ()
        {
            waveTemp.movement = 'raise left arm';
            // atemp.onAnimate();
            setTimeout(function ()
            {
                waveTemp.movement = 'lower left arm';
                waveTemp.onAnimate();
            }, 200);
        }, 300)

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
            var T = -Math.PI / 2;
            var x = Math.sin(T / 2);
            var y = 0;
            var z = 0;
            var w = Math.cos(T / 2);
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
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(x, y, z, w), 0.1);
    }

}

// // create head, neck, and torso
// var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
// var geometry = fromhelper[0];
// var material = fromhelper[1];
// var bones = fromhelper[2];

function setPosition(object, x, y)
{
    this.object = object;
    this.x = x || null;
    this.y = y || null;
    if (this.x != null);

    {
        this.object.position.x = this.x;
    }

    if (this.y != null);

    {
        this.object.position.y = this.y;
    }

}
function addLimb(object, parent, positionX, positionY)

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

function danceA(object)
{
    var danceTemp = object;
    setTimeout(function ()
    {
        danceTemp.raiseLeftArm();
        setTimeout(function ()
        {
            danceTemp.raiseRightArm();
            setTimeout(function ()
            {
                danceTemp.lowerLeftArm()
                setTimeout(function ()
                {
                    danceTemp.lowerRightArm();
                }, 600)
            }, 600)
        }, 600)
    }, 600)
    return;
}

function danceB(object)
{
    var danceTemp = object;
    setTimeout(function ()
    {
        danceTemp.raiseLeftLeg();
        setTimeout(function ()
        {
            danceTemp.lowerLeftLeg();
            setTimeout(function ()
            {
                danceTemp.raiseRightLeg()
                setTimeout(function ()
                {
                    danceTemp.lowerRightLeg();
                }, 600)
            }, 600)
        }, 600)
    }, 600)
    return;
}
