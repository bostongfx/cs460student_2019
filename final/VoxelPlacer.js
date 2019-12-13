function voxelPlacerMain(){
	console.log("Entered Main");
	
	//Scene + Renderer setup
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	//Camera Setup
	var camFov = 90;
	var camRatio = window.innerWidth / window.innerHeight;;
	var camzNear = 1;
	var camzFar = 1000;
	sceneCamera = new THREE.PerspectiveCamera(camFov, camRatio, camzNear, camzFar);
	sceneCamera.position.set(0, 0, 100);
	
	//Control Setup
	controls = new THREE.TrackballControls(sceneCamera, renderer.domElement);
	
	//Light Scene Setup
	var ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(45, 60, 30);
	scene.add(directionalLight);

	//Saving/loading
	var cubes = [];
	objectString = "";
	//objectString = "0 0 0 16711680 0 10 0 682452 0 0 10 682452 10 0 0 682452 0 0 -10 682452 -10 0 0 682452 10 0 -10 682452 -10 0 -10 682452 -10 0 10 682452 10 0 10 682452 -10 10 10 682452 0 10 10 682452 10 10 10 682452 -10 10 -10 682452 0 10 -10 682452 10 10 -10 682452 10 10 0 682452 -10 10 0 682452 -10 20 10 682452 -10 20 0 682452 -10 20 -10 682452 0 20 -10 682452 10 20 -10 682452 10 20 0 682452 0 20 10 682452 0 20 0 682452 10 20 10 682452 -10 30 -10 682452 -10 30 0 682452 -10 30 10 682452 0 30 10 682452 0 30 -10 682452 0 30 0 682452 10 30 -10 682452 10 30 0 682452 10 30 10 682452 -10 40 -10 682452 -10 40 0 682452 -10 40 10 682452 0 40 -10 682452 0 40 0 682452 0 40 10 682452 10 40 -10 682452 10 40 0 682452 10 40 10 682452 -10 50 -10 682452 -10 50 0 682452 -10 50 10 682452 0 50 -10 682452 0 50 0 682452 0 50 10 682452 10 50 -10 682452 10 50 0 682452 10 50 10 682452 -10 60 10 13896202 -10 60 -10 13896202 -10 60 0 13896202 0 60 -10 13896202 10 60 -10 13896202 0 60 0 13896202 10 60 0 13896202 0 60 10 13896202 10 60 10 13896202 -10 60 20 13896202 0 60 20 13896202 10 60 20 13896202 -10 50 20 13896202 0 50 20 13896202 10 50 20 13896202 -10 60 30 13896202 0 60 30 13896202 10 60 30 13896202 -10 50 30 13896202 0 50 30 13896202 10 50 30 13896202 -10 60 40 13896202 0 60 40 13896202 10 60 40 13896202 -10 50 40 13896202 0 50 40 13896202 10 50 40 13896202 -10 60 50 13947914 0 60 50 13947914 10 60 50 13947914 -10 50 50 13947914 0 50 50 13947914 10 50 50 13947914 -10 40 50 13947914 0 40 50 13947914 10 40 50 13947914 10 30 50 13947914 -10 30 50 13947914 0 30 50 13947914 -10 70 40 13947914 -10 70 20 13947914 10 70 10 13947914 10 70 40 13947914 0 70 0 13947914 -10 70 -10 13947914 0 70 40 6149130 10 70 30 6149130 0 70 20 6149130 0 80 20 6149130 10 70 0 6149130 0 70 -10 6149130 20 70 0 6149130 10 80 30 6149130 10 90 30 6149130 10 70 20 6149130 0 80 -10 6149130 10 80 -10 6149130 -20 40 -10 6149130 -10 40 -20 6149130 -20 50 50 6149130 -20 50 40 6149130 -20 60 0 6149130 -20 50 -10 6149130 -10 40 -30 6149130 -10 70 10 6149130 -20 60 20 6149130 "
	
	//Geometry
	var firstCubeBuffer = new THREE.BoxBufferGeometry(10, 10, 10);
	var baseMaterial = new THREE.MeshStandardMaterial({
		color : 0xff0000,
	}); 
	var firstGeometry = new THREE.Mesh(firstCubeBuffer, baseMaterial);
	cubes.push(firstGeometry);
	scene.add(firstGeometry);
	
	var cubeCursor = new THREE.BoxBufferGeometry(10, 10, 10);
	var cubeCursorMat = new THREE.MeshBasicMaterial({
		color : 0xffffff,
		transparent : true,
		opacity : .5
	});
	var cursorObject = new THREE.Mesh(cubeCursor, cubeCursorMat);
	cursorObject.position.set(0, 10, 0);
	scene.add(cursorObject);
	
	var selectedObject;
	var objectFace;
	
	//Mouse Listener
	renderer.domElement.onmousemove = function(e){
		var pixCord = new THREE.Vector2(e.clientX, e.clientY);		
		var viewCord = new THREE.Vector2((pixCord.x / window.innerWidth) * 2 - 1, -(pixCord.y / window.innerHeight) * 2 + 1);
		var viewCordNear = new THREE.Vector3(viewCord.x, viewCord.y, 0);

		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(viewCordNear, sceneCamera);
		intersects = raycaster.intersectObjects(scene.children);
		
		//If not intersecting anything 
		for (var i = 0; i < intersects.length; i++){
			if(intersects[i].object == cursorObject){
				continue;
			};
			selectedObject = intersects[i].object;
			objectFace = intersects[i].face;
			break;
		}
		if(selectedObject == null || objectFace == null){
			return false;
		}
		
		
		var newPosition = new THREE.Vector3(selectedObject.position.x + objectFace.normal.x * 10,
											selectedObject.position.y + objectFace.normal.y * 10,
											selectedObject.position.z + objectFace.normal.z * 10);
		cursorObject.position.copy(newPosition);
	};
	renderer.domElement.onmousedown = function(e){
		if(!e.shiftKey){
			e.preventDefault();
			return false;
		}
		if(e.which == 3){
			scene.remove(selectedObject)
			cubes = cubes.filter(function(val){
				return val != selectedObject;
			});
			return false;
		}
		var newCubeGeom = new THREE.BoxBufferGeometry(10, 10, 10);
		var newMaterial = new THREE.MeshStandardMaterial({
			color : newCubeColor
		});
		var newCube = new THREE.Mesh(newCubeGeom, newMaterial);
		newCube.position.copy(cursorObject.position);
		cubes.push(newCube);
		scene.add(newCube);
	}
	
	
	//GUI Setup
	var controller = {
		color : 0xffffff,
		save : function(){
			objectString = "";
			cubes.forEach(function(cube){
				var xPos = cube.position.x;
				var yPos = cube.position.y;
				var zPos = cube.position.z;
				var color = cube.material.color.getHex();
				objectString += xPos + " " + yPos + " " + zPos + " " + color + " ";
			});
		},
		load : function(){
			//Remove all cubes from the scene
			cubes.forEach(function(cube){
				scene.remove(cube);
			});
			cubes = [];
			
			//Convert string to array of ints
			var loadedValues = objectString.split(" ");
			var i = 0;
			loadedValues.forEach(function(string){
				loadedValues[i] = parseInt(string);
				i++;
			});
			
			//Create cubes, each cube is 4 values long
			for(i = 0; i < loadedValues.length - 1; i += 4){
				var pos = new THREE.Vector3(loadedValues[i], loadedValues[i+1], loadedValues[i+2]);
				var cubeColor = loadedValues[i+3];
				var loadedCubeBuffer = new THREE.BoxBufferGeometry(10, 10, 10);
				var loadedMaterial = new THREE.MeshStandardMaterial({
					color : cubeColor
				});
				var loadedCube = new THREE.Mesh(loadedCubeBuffer, loadedMaterial);
				loadedCube.position.copy(pos);
				scene.add(loadedCube);
				
			}
		}
	};
	var newCubeColor = 0xffffff;
	var gui = new dat.GUI();
	gui.addColor(controller, "color").onChange( function(){
		newCubeColor = controller.color;
	});
	gui.add(controller, "save");
	gui.add(controller, "load");
	
	
	
	
	
	animate();
	
}
function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, sceneCamera);
}