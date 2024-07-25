//create access point and import relevant packages
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// gets path element by special class name path1
const pathElement = document.querySelector('path.path1');
const DOM_pathElement = pathElement.getBoundingClientRect()
const pathTo = pathElement.dataset.pathTo;


// Function to get the current path data of an element with path by its path-classname
// !!! path_class needs to be quotated!!!
function getCurrentPath(path_class) {
    return document.querySelector(path_class);
}

function position_elements(element_class_name, path_class){
    let current_path = getCurrentPath(path_class)
    let pathLength = current_path.getTotalLength();
    let elements = document.querySelectorAll(`.${element_class_name}`);

    elements.forEach((element, index) => {
        const position = current_path.getPointAtLength((index + 1) * pathLength / (elements.length + 1));
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
    });
}

gsap.timeline({
             onUpdate: () => {
                //console.log(getCurrentPath('path.path1')),
                position_elements('lipid', 'path.path1')
        }, 
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "75% center",
            scrub: true,
            markers: true,
        }})

        .to(pathElement, {
            ease: 'none',
            attr: { d: pathTo }
        })

        .to("svg-container", {
            y: 5000,
            ease: 'none',
        }, 0);