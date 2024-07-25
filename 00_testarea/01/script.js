document.addEventListener('DOMContentLoaded', () => {
    const path = document.querySelector('.svg-1 path'); //the path element inherits the svg-1 class from paren element
    const tracker = document.querySelector('.tracker');

    //if hovered over element with class -> arrowfunction 
    document.querySelector('.svg-1').addEventListener('mouseover', () => {
    
      // this initital placement could be a problem sue to changing pathlength
      const pathLength = path.getTotalLength(); 
      const startPos = path.getPointAtLength(0);
      // calculates xy of element
      tracker.style.left = `${startPos.x - tracker.offsetWidth / 2}px`;
      tracker.style.top = `${startPos.y - tracker.offsetHeight / 2}px`;

      // init animationFrame
      let animationFrame;
      // init start
      let start;

      // inside the animate variable runs a funnction that: -gets the timestamp argument from the animationFrame later on
      const animate = timestamp => {
        // checks if start has been init. if not it gets the current timestamp value (e.g. value since the page loaded)
        // the whole timestamp shit needs to be a) translated to scroll or b) always beeing recalculated when my plasmid hits a certain position
        if (!start) start = timestamp;

        const progress = Math.min((timestamp - start) / 20); // duration in seconds
        const point = path.getPointAtLength(progress * pathLength);
        tracker.style.left = `${point.x - tracker.offsetWidth / 2}px`;
        tracker.style.top = `${point.y - tracker.offsetHeight / 2}px`;

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      document.querySelector('.svg-1').addEventListener('mouseout', () => {
        cancelAnimationFrame(animationFrame);
        const endPos = path.getPointAtLength(pathLength);
        tracker.style.left = `${endPos.x - tracker.offsetWidth / 2}px`;
        tracker.style.top = `${endPos.y - tracker.offsetHeight / 2}px`;
      }, { once: true });
    });
  });