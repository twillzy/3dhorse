var $container;
var camera, scene, projector, renderer;
var mesh, animation;

var init = function () {

	$container = $('<div>');
	$('body').append($container);

	// 
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 300;
	camera.target = new THREE.Vector3(0, 150, 0);

	//
	scene = new THREE.Scene();

	//
	var light = new THREE.DirectionalLight(0xefefff, 2);
	light.position.set(1, 1, 1).normalize();
	scene.add(light);

	var light = new THREE.DirectionalLight(0xffefef, 2);
	light.position.set(-1, -1, -1).normalize();
	scene.add(light);

	//
	var loader = new THREE.JSONLoader();
	loader.load('horse.js', function(geometry) {

		mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x606060, morphTargets: true}));
		mesh.scale.set(7, 7, 7);
		scene.add(mesh);

		animation = new THREE.MorphAnimation(mesh);
		animation.play();

	});

	//
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xf0f0f0);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	$container.append(renderer.domElement);

};

var radius = 6000;
var theta = 0;

var prevTime = Date.now();

var render = function () {
	
	theta += 0.1;

	camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
	camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

	camera.lookAt(camera.target);

	if(animation) {
		var time = Date.now();
		animation.update(time - prevTime);
		prevTime = time;
	}

	renderer.render(scene, camera);

};

var animate = function () {

	requestAnimationFrame(animate);

	render();

};


$(document).ready(function() {

	init();
	animate();

});