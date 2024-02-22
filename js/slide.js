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
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      movetype = 'touchmove';
      this.dist.startX = event.changedTouches[0].clientX;
    }

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  addSlideEvent() {
    this.bindThis();
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  moveSlide(distX) {
    this.movePosition = distX;
    this.slide.style.transform = `translate3d(${-distX}px,0,0)`;
  }
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.7;
    return this.dist.movement;
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;

    this.dist.finalposition =
      this.updatePosition(pointerPosition) + this.dist.movePosition;

    this.moveSlide(this.dist.finalposition); //posição final
  }

  onEnd(event) {
    const moveType = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);

    this.dist.movePosition = this.dist.finalposition;
  }

  init() {
    this.addSlideEvent();
  }
}
