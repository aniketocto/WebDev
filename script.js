let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0;
  prevY = 0;

  currentX = 0;
  currentY = 0;

  constructor(paper) {
    this.paper = paper;
    this.paper.addEventListener("mousedown", this.onPointerDown.bind(this));
    this.paper.addEventListener("touchstart", this.onPointerDown.bind(this), {
      passive: false,
    });
    window.addEventListener("mousemove", this.onPointerMove.bind(this));
    window.addEventListener("touchmove", this.onPointerMove.bind(this), {
      passive: false,
    });
    window.addEventListener("mouseup", this.onPointerUp.bind(this));
    window.addEventListener("touchend", this.onPointerUp.bind(this));
  }

  onPointerDown(e) {
    e.preventDefault(); // Prevent default touch event behavior
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ;
    highestZ += 1;
    const event = e.changedTouches ? e.changedTouches[0] : e;
    this.prevX = event.clientX;
    this.prevY = event.clientY;
  }

  onPointerMove(e) {
    if (this.holdingPaper) {
      e.preventDefault(); // Prevent default touch event behavior
      const event = e.changedTouches ? e.changedTouches[0] : e;
      const clientX = event.clientX;
      const clientY = event.clientY;
      const velocityX = clientX - this.prevX;
      const velocityY = clientY - this.prevY;
      this.currentX += velocityX;
      this.currentY += velocityY;
      this.prevX = clientX;
      this.prevY = clientY;
      this.paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px)`;
    }
  }

  onPointerUp() {
    this.holdingPaper = false;
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper(paper);
});
