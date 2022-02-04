function initCarousel() {
  const carousel = {
    currentSlide: 1,
    totalSlides: null,
    containerWidth: null,
    elements: {
      controls: {
        left: null,
        right: null,
      },
      container: null,
    },
    moveDirections: {
      left: 'left',
      right: 'right',
    },
    init: function (selectors) {
      this.elements.controls.left = document.querySelector(selectors.leftArrow);
      this.elements.controls.right = document.querySelector(selectors.rightArrow);
      this.elements.container = document.querySelector(selectors.container);
      this.totalSlides = document.querySelectorAll(selectors.slide).length;
      this.containerWidth = this.elements.container.offsetWidth;

      this.updateControlsVisibility();
      this.initLeftControlListener();
      this.initRightControlListener();
    },
    updateControlsVisibility: function () {
      // Если слайд один или вообще отсутствуют
      if (this.totalSlides <= 1) {
        this.hide(this.elements.controls.left);
        this.hide(this.elements.controls.right);
        return;
      }

      // Если первый слайд
      if (this.currentSlide - 1 === 0) {
        this.hide(this.elements.controls.left);
        this.show(this.elements.controls.right);
        return;
      }

      // Если последний слайд
      if (this.currentSlide + 1 > this.totalSlides) {
        this.show(this.elements.controls.left);
        this.hide(this.elements.controls.right);
        return;
      }

      this.show(this.elements.controls.left);
      this.show(this.elements.controls.right);
    },
    initLeftControlListener: function () {
      const object = this;
      this.elements.controls.left.addEventListener('click', function () {
        const translateValue = object.getTranslateValueLeft();
        object.moveSlide(object.moveDirections.left, translateValue);
      });
    },
    initRightControlListener: function () {
      const object = this;
      this.elements.controls.right.addEventListener('click', function () {
        const translateValue = object.getTranslateValueRight();
        object.moveSlide(object.moveDirections.right, translateValue);
      });
    },
    getTranslateValueRight: function () {
      return this.currentSlide * this.containerWidth;
    },
    getTranslateValueLeft: function () {
      return -((this.currentSlide - 1) * this.containerWidth) + this.containerWidth;
    },
    moveSlide: function (direction, translateValue) {
      let transformValue;

      if (direction === this.moveDirections.left) {
        transformValue = `translateX(${translateValue}px)`;
        this.currentSlide--;
      } else if (direction === this.moveDirections.right) {
        transformValue = `translateX(-${translateValue}px)`;
        this.currentSlide++;
      }

      this.elements.container.style.transform = transformValue;

      this.updateControlsVisibility();
    },
    show: function (arrow) {
      arrow.style.display = 'block';
    },
    hide: function (arrow) {
      arrow.style.display = 'none';
    },
  };

  const selectors = {
    slide: '.carousel__slide',
    container: '.carousel__inner',
    leftArrow: '.carousel__arrow_left',
    rightArrow: '.carousel__arrow_right'
  };

  carousel.init(selectors);
}
