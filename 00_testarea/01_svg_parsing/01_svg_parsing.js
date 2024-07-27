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
    //console.log(rawPathData1)
    return rawPathData1
}
// Example usage:
let rawPathData1 = getRawPathData('path.path1')
console.log(rawPathData1)

function logFirstElements(rawPathData) {
    // Log the first few elements to understand the format
    if (rawPathData.length > 0) {
        console.log('First element of rawPathData:', rawPathData[0]);
        if (rawPathData[0].length > 0) {
            console.log('First point of the first element:', rawPathData[0][0]);
        }
    }
}
/* // Example usage:
logFirstElements(rawPathData1); */

/* // Create points with x and y coordinates from rawPathData
function extractPointsFromPath(rawPathData) {
    let points = [];
    rawPathData.forEach(subArray => {
        for (let i = 0; i < subArray.length; i += 2) {
            points.push({ x: subArray[i], y: subArray[i + 1] });
        }
    });
    return points;
}
//example usage
let points = extractPointsFromPath(rawPathData1);
console.log(points);
 */

/* // calculates the x/y distance from top left corner of div to first point of path ('pat.path_class')
function get_distance_divTopCorner_to_path(coordinate_div, coordinate_path) {
    let diff_x = coordinates.x - points[0].x
    let diff_y = coordinates.y - points[0].y
    return {x: diff_x, y: diff_y}
}
let distance = get_distance_divTopCorner_to_path(".destination_div", 'path.path1')
console.log("Distance x/y: " ,distance) */


// get top corner coordinates of an element in relation to the whole document 
// --> could be used to get DOM x and y coordinates
function getTopCornerCoordinates(selector) {
    // Get the element by the selector
    let element = document.querySelector(selector);
    if (!element) {
        console.error(`Element with selector "${selector}" not found.`);
        return null;
    }

    // Get the bounding rectangle of the element
    let boundingRect = element.getBoundingClientRect();
    //console.log(boundingRect);

    // Calculate the top corner coordinates relative to the whole document
    let x = boundingRect.x + window.scrollX;
    let y = boundingRect.y + window.scrollY;

    return { x, y };
}
// Example usage:
let coordinates = getTopCornerCoordinates(".destination_div");
console.log(coordinates);



// let way_x = distance.x
//console.log("Way x: " ,way_x)
// let way_y = distance.y 
//console.log("Way y: " ,way_y)
/* let test_x = -195
let test_y = 500 */
// Perform adjustments on rawPathData here
// For example, scale all x-coordinates with way_x
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

/* // Example usage:
let adjustedRawPathData = adjustRawPathData(rawPathData1, distance.x, distance.y);
console.log(adjustedRawPathData); */

function adjustPath(path_class, dist_x, dist_y) {

    let rawPathData = getRawPathData(path_class)

    let adjustedRawPath =  adjustRawPathData(rawPathData, dist_x, dist_y)

    let adjustedPath = MotionPathPlugin.rawPathToString(adjustedRawPath)
    return adjustedPath
}
let adjustedPath = adjustPath('path.path1', -195, 500)
console.log(adjustedPath)


// reconverts raw path data into d="pathstring"
let reconvertedPath1 = MotionPathPlugin.rawPathToString(rawPathData1)
console.log(reconvertedPath1)

//pathElement1.setAttribute('d', reconvertedPath1);
