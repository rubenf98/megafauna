let scene, renderer, camera, container, turtle;

function init() {
    container = document.querySelector('.scene');
    scene = new THREE.Scene();

    //Camera Setup
    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    //x,y,z
    camera.position.set(0, 0, 1050);

    const ambient = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 6);
    light.position.set(0, 500, 0);
    scene.add(light);


    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./turtle/scene.gltf", function (gltf) {
        scene.add(gltf.scene);
        turtle = gltf.scene.children[0];
        turtle.position.set(0, 0, 250); //If we don't distance from center then it gets blocked by background
        renderer.render(scene, camera);
    })


}

function animate() {
    requestAnimationFrame(animate);
    //turtle.rotation.z += 0.005;
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
    turtle.rotation.z += (deltaX - prevDeltaX) * 0.003;
    if (deltaY > 0) {
        turtle.rotation.x += (deltaY - prevDeltaY) * 0.0004;
    }
    
    prevDeltaX = deltaX; prevDeltaY = deltaY;
}


document.addEventListener('mousemove', onDocumentMouseMove);
window.addEventListener("resize", onWindowResize);

init();
animate();  