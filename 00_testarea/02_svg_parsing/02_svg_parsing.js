//create access point and import relevant packages
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);


// extracts "d" attribute from given path class (has to be in quotes and path.path.class) and converts it to raw path array
function getRawPathData(path_class) {
    // gets path element by special class name path1
    const pathElement1 = document.querySelector(path_class);
    //console.log(pathElement1); 

    // Original SVG path string
    let originalPathString1 = pathElement1.getAttribute('d');
    //console.log(originalPathString1); 

    // Convert to raw path data
    let rawPathData1 = MotionPathPlugin.stringToRawPath(originalPathString1); 
    console.log(rawPathData1)
    return rawPathData1
}


function adjustRawPathData(rawPathData, dist_x, dist_y) {
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


function adjustPath(path_class, dist_x, dist_y) {

    let rawPathData = getRawPathData(path_class)

    let adjustedRawPath =  adjustRawPathData(rawPathData, dist_x, dist_y)

    let adjustedPath = MotionPathPlugin.rawPathToString(adjustedRawPath)
    return adjustedPath
}
let adjustedPath = adjustPath('path.path1', 195, -500)
console.log(adjustedPath)



function scaleSvgPathToContainer(containerSelector, pathSelector) {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Select the container and path elements
        let div_container = document.querySelector(containerSelector);
        let path_container = document.querySelector(pathSelector);

        // Get the bounding rectangles of the container and path
        let div_container_DOM = div_container.getBoundingClientRect();
        let path_container_DOM = path_container.getBoundingClientRect();

        // Calculate the scale factors
        let factor_x = div_container_DOM.width / path_container_DOM.width;
        let factor_y = div_container_DOM.height / path_container_DOM.height;

        // Log the dimensions and scale factors
        console.log(div_container_DOM);
        console.log(path_container_DOM);
        console.log(factor_x, factor_y);

        // Apply the transform to scale the path
        path_container.setAttribute('transform', `scale(${factor_x}, ${factor_x})`);
    });
}

// Usage
scaleSvgPathToContainer('.svg-1', 'path.path2');