export default class Carrosel {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }
  bindThis() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);

    console.log(event);
  }

  addSlideEvent() {
    this.bindThis();
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  onMove() {
    console.log("moveu");
  }

  onEnd() {
    console.log("acabou");
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  init() {
    this.addSlideEvent();
    console.log("foi");
  }
}
