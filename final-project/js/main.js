
//typing effects 
function typeTextWithCursor(element, text, typingSpeed = 100) {
    //create cursor inline
    const cursor = document.createElement("span"); 
    //should be |
    cursor.textContent = "|";
    cursor.style.display = "inline-block";
    //make the cursor blink
    cursor.style.animation = "blink 0.9s steps(2) infinite"; 
    element.textContent = ""; 
    //add cursor 
    element.appendChild(cursor); 

    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            // add each character sequentially 
            element.textContent = text.slice(0, index + 1); 
            // cursor should be at the end 
            element.appendChild(cursor); 
            index++;
        } else {
            //keep cursor blinking at the end and stop the typing with the whole text 
            clearInterval(typeInterval); 
            
        }
    }, typingSpeed);
}


// for index.html title "Understanding How We Think and Behave"
document.addEventListener("DOMContentLoaded", () => {
    //target element
    const taglineElement = document.querySelector("#title p.shadow-text"); 
    const text = "Understanding How We Think and Behave";
    if (taglineElement) {
        // typing speed 
        typeTextWithCursor(taglineElement, text, 100); 
    } 
    
    // animate
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        fadeInSections();
    } 
});

// for sim.html title: "changes in habits affect our brain..."
document.addEventListener("DOMContentLoaded", () => {
    //target element 
    const boldTitleElement = document.querySelector("#bold-title h1"); 
    const boldTitleText = "Changes in habits affect our brain..."; 
    if (boldTitleElement) {
        //typing effect , with speed
        typeTextWithCursor(boldTitleElement, boldTitleText, 100); 
    } 
});

// for index.html bold statement: "There is a lot we still need to make sense of"
document.addEventListener("DOMContentLoaded", () => {
    //select target element 
    const boldTitleElement = document.querySelector("#bold-title-2 h1"); 
    const boldTitleText = "There is a lot we still need to make sense of"; 
    if (boldTitleElement) { 
        // typing function call - with typing speed 
        typeTextWithCursor(boldTitleElement, boldTitleText, 100); 
    } 
});

// fade in each section as it scrolls into view
function fadeInSections() {
    // scrollTrigger registered
    gsap.registerPlugin(ScrollTrigger); 
    gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
            //start off invisible and slightly below 
            opacity: 0, 
            y: 50, 
            // duration of 1 sec and make smooth 
            duration: 1, 
            ease: "power2.out", 
            //trigger animation when section in view 
            scrollTrigger: {
                // executes for each section
                trigger: section, 
                // animate when top is 80percent from bottom
                start: "top 80%", 
                //play once 
                toggleActions: "play none none none", 
            },
        });
    });
}



// move gears/now changed to neurons with (GSAP and ScrollTrigger)
function moveFaces() {
    gsap.utils.toArray(".gear").forEach((gear, index) => {
        gsap.to(gear, {
            //rotation around should be 600 degrees for slower spinning
            rotation: index % 2 === 0 ? 600 : -600, 
            scrollTrigger: {
                //whole page, begin @ top, and end at bottom
                trigger: "body", 
                start: "top top", 
                end: "bottom bottom", 
                // smooth scroll
                scrub: true, 
            },
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // neurons to move
    moveFaces();
});


//three.js temporary build
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";


document.addEventListener("DOMContentLoaded", () => {
    //initialize each component of the brian simulation
    const container = document.getElementById("simulation-container");
    const canvas = document.getElementById("brain-visualization");
    const pathwayDetails = document.getElementById("pathway-details");
    const controlsContainer = document.getElementById("controls");

    // titles for parameter toggles 
    const parameterTitles = {
        dopamineSensitivity: "Dopamine Sensitivity:",
        amountOfChange: "Amount of Change:",
        environmentalEffects: "Environmental Effects:",
        historyOfSensitivity: "History of Sensitivity:",
    };

    // info for each simulation: title, color of spheres, and pathway explanation
    const simulations = {
        sugar: {
            color: 0x0099cc,
            pathways: "Sugar activates dopamine pathways, triggering a rapid release of dopamine <br>that heightens reward sensitivity and reinforces cravings. Over time, repeated sugar consumption<br> can desensitize receptors, requiring more sugar to achieve the same reward response and <br>potentially disrupting normal neural function.",
        },
        caffeine: {
            color: 0xF9645B,
            pathways: "Caffeine blocks adenosine receptors, reducing feelings of fatigue and increasing alertness. <br>It also triggers a mild dopamine release, enhancing mood and focus. Regular consumption can lead to tolerance, <br>requiring higher doses for the same effect and potentially affecting sleep cycles and dependency.",
        },
        sleep: {
            color: 0x339966,
            pathways: "Low sleep disrupts the brain's ability to regulate neurotransmitters like dopamine and serotonin, <br>impairing mood, focus, and decision-making. It also increases cortisol levels, heightening stress, <br>and weakens neural connectivity in areas responsible for memory and learning, <br>leading to cognitive decline over time.",
        },
    };


    // start with sugar 
    let activeSimulation = "sugar";

    // original parameter values 
    const parameters = {
        dopamineSensitivity: 10,
        amountOfChange: 10,
        environmentalEffects: 10,
        historyOfSensitivity: 10,
    };

    // grid for the controls 
    const controlsGrid = document.createElement("div");
    controlsGrid.classList.add("controls-grid");

    //set values for each toggle 
    Object.keys(parameters).forEach((param) => {
        const control = document.createElement("div");
        control.classList.add("control-item");
        control.innerHTML = `
            <label>
                <span class="control-title" data-param="${param}">${parameterTitles[param]}</span>
                <input type="range" id="${param}" min="0" max="100" value="${parameters[param]}">
            </label>
        `;
        controlsGrid.appendChild(control);
    });
    //add grid to container
    controlsContainer.appendChild(controlsGrid);

    // set three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    //zoomed position
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(container.clientWidth, container.clientHeight);

    //standardize the brian simulation 
    const brainGroup = new THREE.Group();
    const brainMaterial = new THREE.MeshStandardMaterial({ color: simulations[activeSimulation].color });



    // creating a brain shape - these are parameters 
    const brainWidth = 4.5; 
    const brainHeight = 3.6; 
    const brainDepth = 2.8;
    const cerebellumWidth = 1.0; 
    const cerebellumHeight = 1.0; 
    const cerebellumDepth = 1.0; 
    const brainstemWidth = 0.7; 
    const brainstemHeight = 1; 
    const brainstemDepth = 0.3; 
    const density = 700; // number of neurons 

    // helper function - generating brain shapes 
    function generateBrainShapePoint() {
        let x, y, z;
        do {
            x = (Math.random() - 0.5) * brainWidth;
            y = (Math.random() - 0.5) * brainHeight;
            z = (Math.random() - 0.5) * brainDepth;

            // main brain structure - ellipse 
            const isInBrain =
                Math.pow(x / (brainWidth / 2), 2) +
                Math.pow(y / (brainHeight / 2), 2) +
                Math.pow(z / (brainDepth / 2), 2) < 1;

            // offset cerebellum shape 
            const isInCerebellum =
                Math.pow(x / (cerebellumWidth / 2), 2) +
                Math.pow((y + brainHeight * 0.6) / (cerebellumHeight / 2), 2) +
                Math.pow(z / (cerebellumDepth / 3), 2) < 1;

            // brainstem shape
            const isInBrainstem =
                Math.abs(x) < brainstemWidth / 2 &&
                y < -brainHeight * 0.5 &&
                y > -brainHeight * 0.5 - brainstemHeight &&
                Math.abs(z) < brainstemDepth / 2;

            if (isInBrain || isInCerebellum || isInBrainstem) {
                return { x, y, z };
            }
        } while (true);
    }

    // creating the spherical neurons 
    const neurons = [];
    for (let i = 0; i < density; i++) {
        const { x, y, z } = generateBrainShapePoint();

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), brainMaterial);
        sphere.position.set(x, y, z);
        //test if neuron is activated
        sphere.userData.isActivated = false; 
        neurons.push(sphere);
        brainGroup.add(sphere);
    }

    //adding cerebellum to brain (for shape) 
    for (let i = 0; i < density * 0.20; i++) { 
        const x = brainWidth * 0.3 + (Math.random() - 0.5) * cerebellumWidth;
        const y = -brainHeight * 0.4 + (Math.random() - 0.35) * cerebellumHeight; // Moved cerebellum higher by reducing offset
        const z = (Math.random() - 0.5) * cerebellumDepth;

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), brainMaterial);
        sphere.position.set(x, y, z);
        neurons.push(sphere);
        brainGroup.add(sphere);
    }

   

    //brainstem 
    for (let i = 0; i < density * 0.1; i++) { 
        const x = brainWidth * 0.2 + (Math.random() - 0.7) * brainstemWidth;
        const y = -brainHeight * 0.5 - Math.random() * brainstemHeight;
        const z = (Math.random() - 0.5) * brainstemDepth;

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), brainMaterial);
        sphere.position.set(x, y, z);
        neurons.push(sphere);
        brainGroup.add(sphere);
    }


    scene.add(brainGroup);


//line color is white 
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); 

// add a group for lines within the brain
const lineGroup = new THREE.Group();
brainGroup.add(lineGroup); 

// adding lights for visualization
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// distance calculation
function calculateDistance(neuronA, neuronB) {
    return neuronA.position.distanceTo(neuronB.position);
}

// update neurons based on calculations
function updateBrainVisualization() {
    const dopamineSensitivity = parameters.dopamineSensitivity / 100;
    const amountOfChange = parameters.amountOfChange / 100;
    const environmentalEffects = parameters.environmentalEffects / 100;

    brainMaterial.color.setHex(simulations[activeSimulation].color);

    // clear lines before adding new ones
    while (lineGroup.children.length > 0) {
        lineGroup.remove(lineGroup.children[0]);
    }

    neurons.forEach((neuron) => {
        // random activity using parameters 
        if (Math.random() < dopamineSensitivity * amountOfChange * environmentalEffects) {
            neuron.userData.isActivated = true;
            // highlight activated neurons
            neuron.material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 

            // find neurons with proximity 
            const connectedNeurons = neurons.filter((otherNeuron) => {
                const distance = calculateDistance(neuron, otherNeuron);
                return (
                    //no self connections
                    otherNeuron !== neuron && 
                    // close by threshold
                    distance < 1.5 && 
                    // connect to other activated neurons
                    otherNeuron.userData.isActivated 
                );
            });

            // max connectino 3 neurons
            const maxConnections = 3;
            connectedNeurons.slice(0, maxConnections).forEach((otherNeuron) => {
                // check positions 
                const startPosition = neuron.position.clone();
                const endPosition = otherNeuron.position.clone();

                // condition for connection
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    startPosition,
                    endPosition,
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                lineGroup.add(line);
            });
        } else if (neuron.userData.isActivated) {
            neuron.userData.isActivated = false;
            // normal color again
            neuron.material = brainMaterial; 
        }

        // pulsate neurons
        if (neuron.userData.isActivated) {
            const scale = 1 + Math.sin(Date.now() / 100) * 0.5; 
            neuron.scale.set(scale, scale, scale);
        } else {
            neuron.scale.set(1, 1, 1);
        }
    });
}
    

    function updatePathwayInfo() {
        pathwayDetails.innerHTML = simulations[activeSimulation].pathways;
    }

    // animation that rotates 
    function animate() {
        requestAnimationFrame(animate);
        brainGroup.rotation.y += 0.007; 
        updateBrainVisualization();
        renderer.render(scene, camera);
    }

    animate();

    // when sliders change, update parameters
    Object.keys(parameters).forEach((param) => {
        document.getElementById(param).addEventListener("input", (event) => {
            parameters[param] = event.target.value;
        });
    });

    // change depending on the tabs
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
            event.target.classList.add("active");
            //change the current active simulations
            activeSimulation = event.target.dataset.simulation;
            brainMaterial.color.setHex(simulations[activeSimulation].color); 
            updatePathwayInfo();
        });
    });

    // set pathway info (to change as needed)
    updatePathwayInfo();
});


// parallax effect for index.html page 
document.addEventListener("scroll", () => {
    const section = document.getElementById("information-2");
    const image = section.querySelector(".background-image");

    // scroll position based on the relative position
    const scrollPosition = window.scrollY - section.offsetTop;

    // move image based on parallax movement
    image.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});


// Rotation of faces on index.html page
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".rotating-images .image");
    const radius = 70; 
    //start angle
    let angle = 0; 

    function rotateImages() {
        images.forEach((image, index) => {
            // image spacing
            const offsetAngle = angle + index * (360 / images.length); 
            //deg --> rad
            const radian = (offsetAngle * Math.PI) / 180; 

            // sin / cos to determine circular movement (up/down for x and y isolate)
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            image.style.transform = `translate(${x}px, ${y}px)`;
        }); 


        //increment angle 
        angle += 1; 
        //reset angle 
        if (angle >= 360) angle = 0; 
    }

    //rotate every 20ms 
    setInterval(rotateImages, 70); 
});

