const plasmid_container = document.querySelector(".plasmid_container");
let DOM_plasmid_container = plasmid_container.getBoundingClientRect();
const drop_container = document.querySelector(".drop_container");
let DOM_drop_container = drop_container.getBoundingClientRect();

const scrollsource = document.querySelector(".scrollsource")
let DOM_scrollsource = scrollsource.getBoundingClientRect()
console.log(DOM_scrollsource)

const startpoint = {x: DOM_plasmid_container.x + (DOM_plasmid_container.width/2), y: DOM_plasmid_container.y + (DOM_plasmid_container.height/2)}
console.log(startpoint)
const drop_center = {x: DOM_drop_container.x + (DOM_drop_container.width/2), y: DOM_drop_container.y + (DOM_drop_container.height/2)}


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
console.log("DOM anchor")
console.log(anchor)

//create access point and import relevant packages
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

/* // variables to set start and end for scrolltimeline
let plasmid_start_trigger = DOM_plasmid_container.y - DOM_scrollsource.y
let plasmid_end_trigger = DOM_drop_container.y - DOM_scrollsource.y + DOM_drop_container.height/2
 */

//create a timeline object
let tl_plasmid = gsap.timeline({
    //connect the timeline to scrolltrigger instead of duration in s
    scrollTrigger: {
        trigger: ".scrollsource", // selector or element 
        start: "top top", // [trigger]=animated element, [scroller]=viewport
        end: "bottom 60%",
        scrub: 2, // Add scrub to control the animation progress on scroll
        markers: true, // Add markers 
    },
})

// -------------- plasmid path ---------------
// it assumes startpoint is {0/0} so its necessary to substract the strating coordinates from all other coordinates --> this can be changed saw something somewhere in the GSAP docs
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
const plasmidPath5 = [
    {x: anchor[5].x, y: anchor[5].y},
]
// drop opacity 1
const plasmidPath6 = [
    {x: anchor[6].x, y: anchor[6].y}
]
//drop opacity 0
//before bilipid
const plasmidPath7 = [
    {x: anchor[7].x, y: anchor[7].y}
]
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
            path: plasmidPath5,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })
    .add("dropVisible")
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath6,
            curviness: 1,
            alignOrigin: [0.5, 1]
        },
        scale: 1,
        ease: "linear",
    })
    .to(".plasmid_container", {
        motionPath: {
            path: plasmidPath7,
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
        rotate: -720
    }, "inDrop") //starts when inDrop label is reached by plasmid

    .to(".drop_container", {
        motionPath: {
        path: dropPath2,
            curviness: 1,
            alignOrigin: [0.5, 1] 
        },
        ease: "linear",
        opacity: 0,
        rotation: 365,
    }, "dropVisible") //starts when drop has opacity 1, then turn opacity to 0 



// create number of images in a certain container with a class and a name
function fill_image_container(container_name, image_source, img_name, div_class, number){
    const container = document.getElementById(container_name);
    if (!container) {
        console.error(`Container with id '${container_name}' not found.`);
        return;
    }
    for (let i = 0; i < number; i++) {
        const img = document.createElement('img');
        img.src = image_source; // Your image URL as string
        img.id = `${img_name}_${i}`; // Alt text for the image

        const div = document.createElement('div'); // Step 1: Create a new div
        div.className =  `${div_class}`
        div.appendChild(img); // Step 2: Append the img to the div
    
        container.appendChild(div); // Step 3: Append the div to the container
    } 
}
//fill_image_container("lipid-container", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 100)


const plasmid_width = DOM_plasmid_container.width
const lipid_height = 60



window.addEventListener("scroll", () => {
/*     let plasmid = document.getElementById("plasmid");
    let DOM_plasmid = plasmid.getBoundingClientRect();
    // console.log("Plasmid x:", rect_plasmid.x, "Plasmid y:", rect_plasmid.y);
    let plasmid_center = {x: DOM_plasmid.x + DOM_plasmid.width/2, y: DOM_plasmid.y + DOM_plasmid.height/2}
    console.log("Plasmid center: ", plasmid_center) */

/*     let bilipid_50 = document.getElementById("bilipid_50")
    let DOM_bilipid_50 = bilipid_50.getBoundingClientRect()
    console.log("Bilipid_50 y: " , DOM_bilipid_50.y) */
    // function to track the center of a element selected by ID
    function track_element_center(element_id) {
        let element = document.getElementById(element_id);
        let DOM_element = element.getBoundingClientRect();
        let element_center = {x: DOM_element.x + DOM_element.width/2, y: DOM_element.y + DOM_element.height/2}
        console.log(`${element_id} center: ` ,element_center)
        return element_center
    }
    track_element_center("plasmid")
    track_element_center("bilipid_49")

    // measure distance between two elements by Id --> they must have x y coordinates
    function measure_distance(element1, element2) {
        let point1 = track_element_center(element1)
        let point2 = track_element_center(element2)
        let distance = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2)
        console.log(`Distance between ${element1} and ${element2}: `, distance)
        return distance
    }
    measure_distance("plasmid", "bilipid_49")

    // Ensure two elements keep a certain distance apart --> weird chatGPT shit 
    function keep_distance(element1_id, element2_id, min_distance) {
        let distance = measure_distance(element1_id, element2_id);
        let element1_center = track_element_center(element1_id);
        let element2_center = track_element_center(element2_id);
        if (distance !== null && distance < min_distance) {
            if (!element1_center || !element2_center) return;

            let dx = element2_center.x - element1_center.x;
            let dy = element2_center.y - element1_center.y;
            let angle = Math.atan2(dy, dx);
            let offsetX = Math.cos(angle) * min_distance;
            let offsetY = Math.sin(angle) * min_distance;

            let new_position = {
                x: element1_center.x + offsetX,
                y: element1_center.y + offsetY
            };

            // Adjust the second element's position
            let element2_elem = document.getElementById(element2_id);
            if (!element2_elem) {
                console.error(`Element with ID ${element2_id} not found`);
                return;
            }
            let parent_rect = element2_elem.parentElement.getBoundingClientRect();
            element2_elem.style.position = "absolute";
            element2_elem.style.left = `${new_position.x - parent_rect.left - element2_elem.offsetWidth / 2}px`;
            element2_elem.style.top = `${new_position.y - parent_rect.top - element2_elem.offsetHeight / 2}px`;
        }
    }
    // Adjust distance if needed
    keep_distance("plasmid", "bilipid_49", 80);
})

//############################################# WILD WEST ##########################################

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
    
    // smalllittle method
    onClick() {
      this.element.classList.toggle('clicked')
    }

    // method to keep distance from plasmid center
}
  

// create number of Bilipid ClassObj in a certain container with a class and a name

// function to create myCompund instances as img/svgs, pass all arguments as strings
function fill_container_with_ClassInstances(container_name, image_source, instance_name, div_class, number){
    // select container to fill over class name
    const container = document.getElementById(container_name);
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
  
  fill_container_with_ClassInstances("lipid-container", "https://static.igem.wiki/teams/5057/bilipid-b.svg", "bilipid", "bilipid", 100)



