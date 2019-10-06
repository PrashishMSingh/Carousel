function Carousel(WIDTH, HEIGHT, carouselElement){
  this.carousel = carouselElement
  this.init = function(){
    // container
    this.carousel.style.width = WIDTH / EM_VALUE + 'em';
    this.carousel.style.height = IMAGE_HEIGHT / EM_VALUE + 'em';
    this.carousel.style.position= 'relative';
    this.carousel.style.overflow= 'hidden';
    this.carousel.style.margin = 'auto';
    return this;
  }

  this.getElement = function(){
    return this.carousel;
  }

  function getCarousel()  {
    return this.carousel;
  }
}
