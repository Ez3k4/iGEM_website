
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


window.addEventListener("scroll", () => {
    
        let bilipid_50 = document.getElementById("bilipid_50")
        let DOM_bilipid_50 = bilipid_50.getBoundingClientRect()
        console.log("Bilipid_50 y: " , DOM_bilipid_50.y)
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