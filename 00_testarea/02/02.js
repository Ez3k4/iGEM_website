//create access point and import relevant packages
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// gets path all elements with special class name path1 and puts them in a list
let paths = [...document.querySelectorAll('path.path1')];

let elements = document.querySelectorAll('.element');

// gets path element by special class name path1
const pathElement = document.querySelector('path.path1');

// Function to get the current path data of an element with path by its path-classname
// !!! path_class needs to be quotated!!!
function getCurrentPath(path_class) {
    return document.querySelector(path_class);
}

function position_elements(element_class_name, path_class){
    let current_path = getCurrentPath(path_class)
    let pathLength = current_path.getTotalLength();
    //console.log(pathLength)
    let elements = document.querySelectorAll(`.${element_class_name}`);
    //console.log(elements)
    elements.forEach((element, index) => {
        //const DOM_element = element.getBoundingClientRect()
        //const svg_element = document.querySelector(".guideline")
        //const DOM_svg = svg_element.getBoundingClientRect()
        const position = current_path.getPointAtLength((index + 1) * pathLength / (elements.length + 1));
        element.style.left = position.x + 'px';
        element.style.top = position.y + 85 + 'px';
    });
}

//iterates over the path elements
paths.forEach(el => {
    const pathTo = el.dataset.pathTo;
    console.log(pathTo)

    gsap.timeline({
/*         onUpdate: () => {
            //console.log(getCurrentPath('path.path1')),
            position_elements('lipid', 'path.path1')
    }, */
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "75% center",
        scrub: true,
        markers: true,
    }})
    .to(el, {
        ease: 'none',
        attr: { d: pathTo }
    })
    .to(el, {
        y: 200,
        ease: 'none',
        onUpdate: () => {
            //console.log(getCurrentPath('path.path1')),
            position_elements('lipid', 'path.path1')
    }
    }, 0);
});