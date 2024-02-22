export default class Carrosel {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalposition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0,
    };
  }
  bindThis() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);
    this.dist.startX = event.clientX;
    console.log(`inicio: ${this.dist.startX}`);
  }

  addSlideEvent() {
    this.bindThis();
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  moveSlide(distX) {
    this.movePosition = distX;
    this.slide.style.transform = `translate3d(${-distX}px,0,0)`;
    console.log(`fim ${distX}`);
  }
  updatePosition(clientX) {
    this.dist.movement = this.dist.startX - clientX;
    return this.dist.movement;
  }

  onMove(event) {
    const finalposition = this.updatePosition(event.clientX);
    this.moveSlide(finalposition);
  }

  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalposition = this.dist.movePosition;
  }

  init() {
    this.addSlideEvent();
    console.log("foi");
  }
}
