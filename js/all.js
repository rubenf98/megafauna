let scene, renderer, camera, container, turtle, bird, seal, whale, dolphin, controls;

function init() {
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    //Camera Setup
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    //x,y,z
    camera.position.set(0, 2, 30);


    const ambient = new THREE.AmbientLight(0x404040, 0);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 0);
    light.position.set(0, 500, 0);
    scene.add(light);


    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);



    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("../model/turtle.gltf", function (gltf) {
        scene.add(gltf.scene);
        turtle = gltf.scene.children[0];
        console.log(gltf.scene.children);
        turtle.position.set(0, 5, 0); //If we don't distance from center then it gets blocked by background
        turtle.rotation.set(2, 0, -3.12);
        renderer.render(scene, camera);
    })

    loader.load("../model/seal.gltf", function (gltf) {
        scene.add(gltf.scene);
        seal = gltf.scene.children[0];
        console.log(gltf.scene.children);
        seal.position.set(10, 4, 0); //If we don't distance from center then it gets blocked by background
        seal.rotation.set(0.325, 0.35, 0);
        renderer.render(scene, camera);
    })

    loader.load("../model/dolphin.gltf", function (gltf) {
        scene.add(gltf.scene);
        dolphin = gltf.scene.children[0];
        console.log(gltf.scene.children);
        dolphin.position.set(5, -1, 0); //If we don't distance from center then it gets blocked by background
        dolphin.rotation.set(1.12, 0, 1.28);
        renderer.render(scene, camera);
    })

    loader.load("../model/bird.gltf", function (gltf) {
        scene.add(gltf.scene);
        bird = gltf.scene.children[0];
        console.log(gltf.scene.children);
        bird.position.set(-10, 6.5, 0); //If we don't distance from center then it gets blocked by background
        bird.rotation.set(1.75, 0, -3.64);
        renderer.render(scene, camera);
    })

    loader.load("../model/whale.gltf", function (gltf) {
        scene.add(gltf.scene);
        whale = gltf.scene.children[0];
        console.log(gltf.scene.children);
        whale.position.set(-5, -1, 0); //If we don't distance from center then it gets blocked by background
        whale.rotation.set(1.75, 0, -5.96);
        renderer.render(scene, camera);
    })
}

function animate() {
    requestAnimationFrame(animate);
    //camera.lookAt(scene.position);
    console.log(whale.rotation);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}


var prevDeltaX = 0, prevDeltaY = 0;


function onDocumentMouseMove(event) {

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var deltaX = (container.clientWidth / 2 - mouseX);
    var deltaY = (mouseY - container.clientHeight / 2);

    whale.rotation.z += (deltaX - prevDeltaX) * 0.003;

    whale.rotation.x += (deltaY - prevDeltaY) * 0.001;


    prevDeltaX = deltaX; prevDeltaY = deltaY;
}




//document.addEventListener('mousemove', onDocumentMouseMove);
window.addEventListener("resize", onWindowResize);

init();
animate();  