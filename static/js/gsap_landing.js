// ----------------- Objects -------------------
const plasmid_container = document.querySelector(".plasmid_container");
let DOM_plasmid_container = plasmid_container.getBoundingClientRect();

const drop_container = document.querySelector(".drop_container");
let DOM_drop_container = drop_container.getBoundingClientRect();

const lipid_container = document.getElementById("lipid-container")
let DOM_lipid_container = lipid_container.getBoundingClientRect();

const scrollsource = document.querySelector(".scrollsource");
let DOM_scrollsource = scrollsource.getBoundingClientRect();

// ------------------ Important points -------------------
const startpoint = {x: DOM_plasmid_container.x + (DOM_plasmid_container.width/2), y: DOM_plasmid_container.y + (DOM_plasmid_container.height/2)}

const drop_center = {x: DOM_drop_container.x + (DOM_drop_container.width/2), y: DOM_drop_container.y + (DOM_drop_container.height/2)}

const liposome_center = {x: DOM_lipid_container.x + (DOM_lipid_container.width/2), y: DOM_lipid_container.y + (DOM_lipid_container.height/2)}

// gets each element with the id and returns the positions of it in an array of ClientRect objects
function get_class_positions(class_name) {
    const positions = [];
    const elements = document.querySelectorAll(class_name);
    for (let i = 0; i < elements.length; i++) {
        let element_x = elements[i].getBoundingClientRect().x - startpoint.x;
        let element_y = elements[i].getBoundingClientRect().y -startpoint.y;
        positions.push({x: element_x, y: element_y});
    }
    return positions;
}
const anchor = get_class_positions(".anchor")
console.log(anchor)
//create access point and import relevant packages
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

/* // variables to set start and end for scrolltimeline
let plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y
let plasmid_end_trigger = DOM_drop_container.y - DOM_scrollsource.y + DOM_drop_container.height/2
 */

//create a timeline object
let tl_plasmid = gsap.timeline({
        onUpdate: () => {
            //console.log(getCurrentPath('path.path1')),
            position_elements('lipid', 'path.path1')
    },
    //connect the timeline to scrolltrigger instead of duration in s
    scrollTrigger: {
        trigger: ".scrollsource", // selector or element 
        start: "top top", // [trigger]=animated element, [scroller]=viewport
        end: "bottom 60%",
        scrub: 1, // Add scrub to control the animation progress on scroll
        markers: true, // Add markers 
    },
})

// -------------- plasmid path ---------------
// it assumes startpoint is {0/0} so its necessary to substract the starting coordinates from all other coordinates --> this can be changed saw something somewhere in the GSAP docs
const plasmidPath1 = [
    {x: 0, y:0},
    {x: 0, y: anchor[0].y},
    // 1
    {x: anchor[0].x, y: anchor[0].y}
]
// scale 3
const plasmidPath2 = [
    {x: anchor[1].x, y: anchor[0].y},
    {x: anchor[1].x, y: anchor[2].y},
    {x: anchor[2].x, y: anchor[2].y},
]
// scale 1
const plasmidPath3 = [
    {x: anchor[3].x, y: anchor[2].y},
    {x: anchor[3].x, y: anchor[4].y},
    {x: anchor[4].x, y: anchor[4].y},
    {x: drop_center.x - startpoint.x, y: drop_center.y - startpoint.y},
]
// move in drop
const plasmidPath4 = [
    {x: anchor[5].x, y: anchor[5].y},
]
// drop opacity 1
//before bilipid
const plasmidPath5 = [
    {x: anchor[6].x, y: anchor[6].y}
]
//drop opacity 0
//after bilipid

// -------------- drop path ---------------
// starts when plasmid hits center, moves synchronized, opacity 0
const dropPath1 = [
    {x: 0, y: anchor[5].y - anchor[4].y},
]
// drop opacity 1
const dropPath2 = [
    {x: 0, y: anchor[6].y - anchor[4].y}
]
// drop opacity 0

// ---------------- liposome path ------------------

const liposomePath1 = [
    {x: 0, y: 0}
]

const liposomePath2 = [
    {x: 0, y: anchor[6].y - liposome_center.y}
]

// -------------- PLASMID ANIMATION ---------------
// Animate the plasmid along the plasmidMoving path
tl_plasmid.to(".plasmid_container", {
        motionPath: {
            path: plasmidPath1,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 3,
        ease: "linear",
    })
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath2,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath3,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })
    .add("inDrop")
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath4,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })
    .add("dropVisible")
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath5,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })



// -------------- DROP ANIMATION ---------------
// inserted drop tween 
tl_plasmid.to(".drop_container", {
        motionPath: {
        path: dropPath1,
            curviness: 1,
            alignOrigin: [0.5, 1] 
        },
        ease: "linear",
        opacity: 1,
    }, "inDrop") //starts when inDrop label is reached by plasmid

    .to(".drop_container", {
        motionPath: {
        path: dropPath2,
            curviness: 1,
            alignOrigin: [0.5, 1] 
        },
        ease: "linear",
        opacity: 0,
    }, "dropVisible") //starts when drop has opacity 1, then turn opacity to 0 


// --------------- LIPOSOME ANIMATION ------------------

/* tl_plasmid.to("#lipid-container", {
        motionPath: {
            path: liposomePath1,
                curviness: 1,
                alignOrigin: [0.5, 1] 
            },
            ease: "linear",
        }, "inDrop") //starts when inDrop label is reached by plasmid */

// ------------------- SVG functions ----------------------

/* 1. getRawPathData
2. repositionRawPathData
3. repositionedPath
4. resizeRawPathData
5. resizePath
6. scaleSvgPathToContainer
7. async function resizeAndRepositionSvgPath */


// extracts "d" attribute from given path class (has to be in quotes and path.path.class) and converts it to raw path array
function getRawPathData(pathSelector) {
    // Validate pathSelector
    if (typeof pathSelector !== 'string') {
        throw new Error(`Invalid pathSelector: ${pathSelector}. It must be a string.`);
    }

    // gets path element by special class name path1
    const pathElement1 = document.querySelector(pathSelector);
    if (!pathElement1) {
        throw new Error(`No element found for selector: ${pathSelector}`);
    }
    console.log("getRawPathData path element", pathElement1); 

    // Original SVG path string
    let originalPathString1 = pathElement1.getAttribute('d');
    //console.log(originalPathString1); 

    // Convert to raw path data
    let rawPathData1 = MotionPathPlugin.stringToRawPath(originalPathString1); 
    //console.log(rawPathData1)
    return rawPathData1
}

// repositions raw path according to given x y values
function repositionRawPathData(rawPathData, dist_x = 0, dist_y = 0) {
    // Adjust x-coordinates
    rawPathData.forEach(subArray => {
        for (let j = 0; j < subArray.length; j += 2) {
            subArray[j] += dist_x;
        }
    });

    // Adjust y-coordinates
    rawPathData.forEach(subArray => {
        for (let i = 1; i < subArray.length; i += 2) {
            subArray[i] += dist_y;
        }
    });

    return rawPathData;
}

// takes a path and x y values and returns repositioned path d attribute 
function repositionedPath(pathSelector, dist_x, dist_y) {
    let rawPathData = getRawPathData(pathSelector)
    let adjustedRawPath =  repositionRawPathData(rawPathData, dist_x, dist_y)
    let adjustedPath = MotionPathPlugin.rawPathToString(adjustedRawPath)
    // Overwrite the old path with the new one
    document.querySelector(pathSelector).setAttribute('d', adjustedPath);
    return adjustedPath
}

// scales Path x y coordinates according to the factors
function resizeRawPathData(rawPathData, factor_x = 1, factor_y = 1){
    // Adjust x-coordinates
    rawPathData.forEach(subArray => {
        for (let j = 0; j < subArray.length; j += 2) {
            subArray[j] *= factor_x;
        }
    });

    // Adjust y-coordinates
    rawPathData.forEach(subArray => {
        for (let i = 1; i < subArray.length; i += 2) {
            subArray[i] *= factor_y;
        }
    });

    return rawPathData;
}

// takes a path and x y values and returns resized path d attribute 
function resizePath(pathSelector, factor_x, factor_y) {
    let rawPathData = getRawPathData(pathSelector)
    console.log("unresizedPath", rawPathData)
    let adjustedRawPath =  resizeRawPathData(rawPathData, factor_x, factor_y)
    console.log("resizedPath", adjustedRawPath)

    let adjustedPath = MotionPathPlugin.rawPathToString(adjustedRawPath)
    // Overwrite the old path with the new one
    document.querySelector(pathSelector).setAttribute('d', adjustedPath);
    return adjustedPath
}

function scaleSvgPathToContainer(containerSelector, pathSelector) {
    if (typeof pathSelector !== 'string') {
        throw new Error(`Invalid pathSelector: ${pathSelector}. It must be a string.`);
    }
    
    // Select the container and path elements
    let div_container = document.querySelector(containerSelector);
    let path_container = document.querySelector(pathSelector);

    // Get the bounding rectangles of the container and path
    let div_container_DOM = div_container.getBoundingClientRect();
    let path_container_DOM = path_container.getBoundingClientRect();

    // Calculate the scale factors
    let factor_x = div_container_DOM.width / path_container_DOM.width;
    let factor_y = div_container_DOM.height / path_container_DOM.height;

    // Ensure the scale factors are not zero or infinity
    if (factor_x === 0 || !isFinite(factor_x)) factor_x = 1;
    if (factor_y === 0 || !isFinite(factor_y)) factor_y = 1;

    // Log the dimensions and scale factors
    console.log(div_container_DOM);
    console.log(path_container_DOM);
    console.log(factor_x, factor_y);

    // Use resizePath to apply the transform to scale the path
    resizePath(pathSelector, factor_x, factor_y);
}

// scales path that it fits container !!!y axis not properly tested!!!
// gets called in main!!!
async function resizeAndRepositionSvgPath(containerSelector, pathSelector) {
    return new Promise((resolve) => {
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            scaleSvgPathToContainer(containerSelector, pathSelector);
            resolve();
        });
    });
}

// --------------------- main function ---------------------

// Main function to run the sequence
async function main() {
    await resizeAndRepositionSvgPath('.svg-container', 'path.path1');
    await fill_container_with_ClassInstances("svg-1", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 150);
    position_elements('bilipid', 'path.path1');
}

// Call the main function
main();


// ------------------ Position elements on SVG ------------------------

// gets path element by special class name path1
const pathElement = document.querySelector('path.path1');
const DOM_pathElement = pathElement.getBoundingClientRect()
const pathTo = pathElement.dataset.pathTo; 

// Function to get the current path data of an element with path by its path-classname
// !!! path_class needs to be quotated!!!
function getCurrentPath(path_class) {
    return document.querySelector(path_class);
}

async function position_elements(element_class_name, path_class){
    let current_path = getCurrentPath(path_class)
    console.log(current_path)

    let pathLength = current_path.getTotalLength();
    console.log(pathLength)
    let elements = document.querySelectorAll(`.${element_class_name}`);

    elements.forEach((element, index) => {
        const position = current_path.getPointAtLength((index + 1) * pathLength / (elements.length + 1));
        element.style.left = (position.x) + 'px';
        element.style.top = (position.y) - 10 + 'px';
    });
}

/* document.addEventListener('DOMContentLoaded', function() {
    position_elements('bilipid', 'path.path1');
});
 */


window.addEventListener("scroll", () => {
/*     let plasmid = document.getElementById("plasmid");
    let DOM_plasmid = plasmid.getBoundingClientRect();
    // console.log("Plasmid x:", rect_plasmid.x, "Plasmid y:", rect_plasmid.y);
    let plasmid_center = {x: DOM_plasmid.x + DOM_plasmid.width/2, y: DOM_plasmid.y + DOM_plasmid.height/2}
    console.log("Plasmid center: ", plasmid_center) */
})

// ----------------------- Init Lipids --------------------

// can be used to init for example Bilipid svgs
class MyComponent {
    constructor(template, className, Id) {
        this.template = template;
        this.className = className;
        
        // adds the div element type to the Component instance
        this.element = document.createElement('div');
        // adds the class name to the component (--> here chosen to be a div)
        this.element.className = className;
        // adds id to the component (--> here chosen to be a div)
        this.element.id = Id;
        // inserts the template as inner value of the component (--> here chosen to be a div)
        this.element.innerHTML = template;
    }
}
  
// function to create myCompund instances as img/svgs, pass all arguments as strings
async function fill_container_with_ClassInstances(container_id, image_source, instance_name, div_class, number){
    // select container to fill over class name
    const container = document.getElementById(container_id);
    // create loop for number of instances
    for (let i = 0; i < number; i++) {
      // create instance by using the fukkking constructor and giving him arguments from function
      // process source arg to image
      const template = `<img src=${image_source}>`
      const IdName = `${instance_name}_${i}`;
      const component = new MyComponent(template, div_class, IdName)
      
      container.appendChild(component.element);
    }
  }



