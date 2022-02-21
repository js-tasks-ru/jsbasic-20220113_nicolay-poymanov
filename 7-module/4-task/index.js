import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = 0;
  #value = 0;
  #segments = 0;
  #activeStepClass = 'slider__step-active';
  #draggingClass = 'slider_dragging';
  #rootElement = null;
  #thumbElement = null
  #thumbElementValueElement = null
  #progressElement = null;
  #stepsElement = null;
  elem = null;

  constructor({steps, value = 0}) {
    this.#steps = steps;
    this.#value = value;
    this.#segments = this.#steps - 1;

    this.#initStructure();
    this.#initSteps();
    this.#addRootElementClickEvent();
    this.#addDragAndDropEvents();
  }

  #initStructure() {
    const rootElement = document.createElement('div');
    rootElement.classList.add('slider');

    const valuePercents = this.#getValuePercents();

    const thumbElement = document.createElement('div');
    thumbElement.classList.add('slider__thumb');
    thumbElement.style.left = `${valuePercents}%`;

    const thumbElementValueElement = document.createElement('span');
    thumbElementValueElement.classList.add('slider__value');
    thumbElementValueElement.innerText = this.#value.toString();

    thumbElement.append(thumbElementValueElement);

    const progressElement = createElement(`
        <div class="slider__progress" style="width: ${valuePercents}%;"></div>
    `);

    const stepsElement = document.createElement('div');
    stepsElement.classList.add('slider__steps');

    rootElement.append(thumbElement);
    rootElement.append(progressElement);
    rootElement.append(stepsElement);

    this.#rootElement = rootElement;
    this.#thumbElement = thumbElement;
    this.#thumbElementValueElement = thumbElementValueElement;
    this.#progressElement = progressElement;
    this.#stepsElement = stepsElement;
    this.elem = rootElement;
  }

  #initSteps() {
    for (let i = 0; i < this.#steps; i++) {
      const stepElement = createElement(`<span class="${i === this.#value ? this.#activeStepClass : ''}"></span>`);
      this.#stepsElement.append(stepElement);
    }
  }

  #getValuePercents() {
    return this.#value / this.#segments * 100;
  }

  #addRootElementClickEvent() {
    this.#rootElement.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let approximateValue = leftRelative * this.#segments;
      this.#value = Math.round(approximateValue);
      const valuePercents = this.#getValuePercents();

      this.#updateSlider(valuePercents);

      const sliderChangeEvent = this.#createSlideChangeEvent();
      event.target.dispatchEvent(sliderChangeEvent);
    });
  }


  #addDragAndDropEvents() {
    this.#thumbElement.ondragstart = () => false;

    this.#thumbElement.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.#rootElement.classList.add(this.#draggingClass);

      const onPointerMove = (event) => {
        event.preventDefault();

        let left = event.clientX - this.#rootElement.getBoundingClientRect().left;

        let leftRelative = left / this.#rootElement.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let valuePercents = leftRelative * 100;
        let approximateValue = leftRelative * this.#segments;
        this.#value = Math.round(approximateValue);

        this.#updateSlider(valuePercents);
      };

      document.addEventListener('pointermove', onPointerMove);

      this.#thumbElement.addEventListener('pointerup', (event) => {
        document.removeEventListener('pointermove', onPointerMove);
        this.#thumbElement.onpointerup = null;

        this.#rootElement.classList.remove(this.#draggingClass);

        const sliderChangeEvent = this.#createSlideChangeEvent();
        event.target.dispatchEvent(sliderChangeEvent);
      });
    });
  }

  #updateSlider(valuePercents) {
    this.#thumbElement.style.left = `${valuePercents}%`;
    this.#progressElement.style.width = `${valuePercents}%`;

    this.#thumbElementValueElement.innerText = this.#value.toString();

    this.#stepsElement.querySelectorAll('span').forEach((item) => item.classList.remove(this.#activeStepClass));
    this.#stepsElement.querySelector(`span:nth-child(${this.#value + 1})`).classList.add(this.#activeStepClass);
  }

  #createSlideChangeEvent() {
    return new CustomEvent('slider-change', {
      detail: this.#value,
      bubbles: true
    });
  }
}
