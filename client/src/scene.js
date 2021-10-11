import * as THREE from "three";

export const initScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add("scene");

  scene.background = new THREE.Color("rgb(30,30,50)");

  const loader = new THREE.TextureLoader();

  document.body.appendChild(renderer.domElement);

  const texture = loader.load("/terrain.jpg");
  const h = loader.load("/height.png");

  const geometry = new THREE.PlaneBufferGeometry(30, 30, 64, 64);

  scene.fog = new THREE.Fog("rgb(30,30,50)", 10, 15);

  console.log(geometry);
  // for (let i = 0; i < geometry.attributes.position.array.length; i++) {
  //   if (i % 2 === 0)
  //     geometry.attributes.position.array[i] += Math.random() * 0.4;
  // }

  const material = new THREE.MeshStandardMaterial({
    color: "aquamarine",
    // map: texture,
    displacementMap: h,
    displacementScale: 5,
    wireframe: true,
    wireframeLinewidth: 5.3,
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -20;

  scene.add(plane);

  const l = new THREE.PointLight("aquamarine");
  l.position.set(0, 5, 0);
  scene.add(l);

  const pointLight = new THREE.PointLight("aqua", 5, 5);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  camera.position.z = 5;

  //listeners

  window.addEventListener("scroll", (e) => {
    camera.position.z = 5 + window.scrollY * 0.0005;
  });

  window.addEventListener("mousemove", (e) => {
    plane.rotation.x = -20 + e.pageX * 0.00005;

    pointLight.position.set(
      1 + (e.pageX - window.innerWidth / 2) * 0.0055,
      1 + (window.innerWidth / 2 - e.pageY) * 0.005,
      -1.5
    );

    plane.material.displacementScale =
      (e.pageX - window.innerWidth / 2) * 0.0055;
  });

  const animate = function () {
    requestAnimationFrame(animate);

    plane.material.displacementScale += 0.001;

    plane.rotation.z += 0.002;
    renderer.render(scene, camera);
  };

  animate();
};
