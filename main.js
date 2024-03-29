SVG.on(document, "DOMContentLoaded", () => {
    const slideToggle = document.getElementById("slide-toggle-control");
    const randomSlideToggle = document.getElementById("random-slide-toggle-control");
    const delayedSlideToggle = document.getElementById("delayed-offset-slide-toggle-control");
  
    const slide = {
      element: slideToggle,
      handler: svgSlideEffect,
      offset: 10,
      duration: 200,
      random: false,
    };
  
    const randomSlide = {
      element: randomSlideToggle,
      handler: svgSlideEffect,
      offset: 8,
      duration: 150,
      random: true,
    };
    
    const delayedOffsetSlide = {
      element: delayedSlideToggle,
      handler: svgSlideEffect,
      offset: 50,
      duration: 50,
      random: false,
    };
  
    new SvgToggleEffect(slide);
    new SvgToggleEffect(randomSlide);
    new SvgToggleEffect(delayedOffsetSlide);
  });
  
  class SvgToggleEffect {
    constructor(effect) {
      this.nodes = [
        ...effect.element.nextElementSibling.querySelectorAll(".row")
      ];
  
      this.nodes.forEach((node, index) => {
        this.nodes[index] = SVG(node);
      });
  
      if (effect.random) {
        this.randomizeArray(this.nodes);
      }
  
      effect.element.addEventListener("change", () => {
        if (effect.element.checked) {
          effect.handler(this.nodes, false, effect.duration, effect.offset);
        } else {
          effect.handler(this.nodes, true, effect.duration, effect.offset);
        }
      });
    }
  
    randomizeArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  
  const svgSlideEffect = (nodes = [], reverse = false, duration = 100, offset = 10) => {
    nodes.forEach((node, index) => {
      setTimeout(() => {
        if (reverse) {
          node.animate({ duration: duration }).transform({ translate: 0 });
        } else {
          node.animate({ duration: duration }).transform({ translate: 48 });
        }
      }, index * offset);
    });
  };
  