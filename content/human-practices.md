---
title: Human-Practices
featured_image: 'https://static.igem.wiki/teams/5057/eppis-uv.jpg'
omit_header_text: true
description: Human-Practices of the Project
toc:
  - id: "h1"
    text: "Human practices"
    level: "2"
  - id: "h2"
    text: "Integrated Human Practices" 
    level: "2"
---
## Human Practices {#h1}
Bli bla blub.

## Integrated Human Practices {#h2}
Zoom in and out on the mindmap to find out more about our Integrated Human Practices. 
You can use the + and - buttons, or use Ctrl+scroll (⌘+scroll on macOS).

<div id="popupWindow" style="display:none;">
  <p id="popupContent">Popup content goes here.</p>
  <button onclick="closePopup()">+</button>
</div>


{{< human-practices 
    
    wimley = "William C. Wimley"
    t-wimley = "Text about Wimley" 

    gensch = "Dr. Nicole Gensch" 
    t-gensch = "Text about Gensch Text about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about GenschText about Gensch" 

    salavei = "Dr. Pavel Salavei" 
    t-salavei = "Text about Salavei" 
    
    heerklotz = "Prof. Dr. Heiko Heerklotz" 
    t-heerklotz = "Text about Heerklotz" 

    hess = "Prof. Dr. Wolfgang R. Hess" 
    t-heerklotz = "Text about Hess" 

    does = "Dr. Chris van der Does" 
    t-does = "Text about van der Does" 

    tuemmler = "Prof. Dr. Burkhard Tümmler" 
    t-tuemmler = "Text about Tümmler" 

    titz = "Prof. Dr. Alexander Titz"
    t-titz = "Text about Titz"

    roemer = "Prof. Dr. Winfried Römer"
    t-roemer = "Text about Römer"

    munos = "Dr. Pablo Rios-Munos"
    t-munos = "Text about Rios-Munos"

    makshakova = "Dr. Olga Makshakova"
    t-makshakova = "Text about Makshakova"

    ruppl = "Anna Ruppl"
    t-ruppl = "Text about Ruppl"

    bender = "Valentin Bender"
    t-bender = "Text about Bender" 

    strohmeyer = "Nico Strohmeyer"
    t-strohmeyer = "Text about Strohmeyer"

    xmu = "XMU China"
    t-xmu = "Text about XMU China"

    mei = "Prof. Dr. H.C. van der Mei"
    t-mei = "Text about van der Mei"

    zheng = "Prof. Ying Zheng"
    t-zheng = "Text about Zheng"

    walentek = "Dr. rer. nat. Peter Walentek"
    t-walentek = "Text about Walentek"

    helmstaedter = "Dr. rer. nat. Martin Helmstädter"
    t-helmstaedter = "Text about Helmstädter"

    nazarenko = "Prof. Dr. Irina Nazarenko"
    t-nazarenko = "Text about Nazarenko" 

    donker = "Prof. Dr. Tjibbe Donker"
    t-donker = "Text about Helmstädter"

    dzubiella = "Prof. Dr. Joachim Dzubiella"
    t-dzubiella = "Text about Dzubiella"

    dambach = "Hannes Dambach"
    t-dambach = "Text about Dambach"

    boldt = "PD Dr. Joachim Boldt"
    t-boldt = "Text about Boldt"

    agt = "Ärzte gegen Tierversuche"
    t-agt = "Text Ärzte gegen Tierversuche"

    tk = "Techniker Krankenkasse"
    t-tk = "Text about Techniker Krankenkasse"

    grundmann = "Prof. Dr. med. Hajo Grundmann"
    t-grundmann = "Text about Grundmann"

    rieg = "Prof. Dr. Siegbert Rieg."
    t-rieg = "Text about Rieg"

    kroeger = "Prof. Dr. med. Axel Kroeger"
    t-kroeger = "Text about Rieg"      


    
>}}



<script>
function openPopup(content) {
  document.getElementById('popupContent').innerHTML = content;
  document.getElementById('popupWindow').style.display = 'block';
}

function closePopup() {
  document.getElementById('popupWindow').style.display = 'none';
}

// zoom functionality 
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('zoomable-container');
  const content = document.getElementById('zoomable-content'); // Ensure this ID is correct
  let scale = 1;
  const ZOOM_SPEED = 0.1;

  container.addEventListener('wheel', function(e) {
    if (e.ctrlKey) { // Only zoom if the control key is pressed
      e.preventDefault(); // Prevent scrolling the page
      const delta = e.deltaY * -0.01;
      // Calculate new scale but clamp it to a reasonable range
      const newScale = Math.min(Math.max(.125, scale + (delta * ZOOM_SPEED)), 4);
      // Calculate how much the content will move based on the zoom
      const ratio = newScale / scale;
      scale = newScale;

      // Adjust content size
      content.style.transform = `scale(${scale})`;

      // Adjust scroll position to simulate zooming towards the cursor
      const offsetX = (e.pageX - container.offsetLeft) * (ratio - 1);
      const offsetY = (e.pageY - container.offsetTop) * (ratio - 1);
      container.scrollLeft += offsetX;
      container.scrollTop += offsetY;
    }
  
  });

document.getElementById('zoom-in').addEventListener('click', function() {
  if (scale < 4) { // Assuming 4 is your max scale
    scale += 0.1; // Adjust ZOOM_SPEED as needed
    content.style.transform = `scale(${scale})`;
  }
});

document.getElementById('zoom-out').addEventListener('click', function() {
  if (scale > 0.125) { // Assuming 0.125 is your min scale
    scale -= 0.1; // Adjust ZOOM_SPEED as needed
    content.style.transform = `scale(${scale})`;
  }
});
});

</script>



