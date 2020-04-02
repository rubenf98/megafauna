let scene, renderer, camera, container, model, controls;

function init() {
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    //Camera Setup
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    //x,y,z
    camera.position.set(0, 1.5, 12);


    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 500, 0);
    scene.add(light);


    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);



    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("../model/seal.gltf", function (gltf) {
        scene.add(gltf.scene);
        model = gltf.scene.children[0];
        console.log(gltf.scene.children);
        model.position.set(0, 0, 0); //If we don't distance from center then it gets blocked by background
        renderer.render(scene, camera);
    })
}

function animate() {
    requestAnimationFrame(animate);
    //camera.lookAt(scene.position);
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

    model.rotation.y -= (deltaX - prevDeltaX) * 0.003;
    if (deltaY > 0) {
        model.rotation.x += (deltaY - prevDeltaY) * 0.001;
    }

    prevDeltaX = deltaX; prevDeltaY = deltaY;
}



document.addEventListener('mousemove', onDocumentMouseMove);
window.addEventListener("resize", onWindowResize);

init();
animate();  