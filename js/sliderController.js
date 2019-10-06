function SliderController(carouselElement, intervalDuration){
  this.carouselElement = carouselElement;
  this.wrapperElement = this.carouselElement.getElementsByClassName('wrapper')[0];
  this.sliderImages = this.wrapperElement.children;

  for(var i = 0; i<this.sliderImages.length; i++){
    this.sliderImages[i].style.float = 'left';
    this.sliderImages[i].style.width = IMAGE_WIDTH / EM_VALUE + 'em';
    this.sliderImages[i].style.height = IMAGE_HEIGHT/EM_VALUE + 'em';
  }

  this.carousel = new Carousel(IMAGE_WIDTH, IMAGE_HEIGHT, this.carouselElement).init()
  this.wrapper = new Wrapper(this.wrapperElement, this.sliderImages).init()
  this.indicator = new Indicator(this.carousel.getElement(), this.sliderImages.length).init()

  this.leftSideBtn = new SideButton(this.carousel.getElement()).init()
  this.rightSideBtn = new SideButton(this.carousel.getElement()).init()

  this.leftSideBtn.setIconPos('left')
  this.rightSideBtn.setIconPos('right')
  this.indicator.initializeIndicators();

  // Indicator Event Listener
   this.indicatorEvent = function(e){
    var wrapperPosition = this.wrapper.getLeftPosition()

    var newIndex = Array.from(this.indicator.getElement().children).indexOf(e.target);
    var destinationPosition = -(newIndex * IMAGE_WIDTH)

    this.indicator.setCurrentIndex(newIndex);
    var anim = setInterval((function(){
        if(wrapperPosition != destinationPosition){
          this.leftSideBtn.disableBtn()
          this.rightSideBtn.disableBtn()
          if(wrapperPosition < destinationPosition){
              wrapperPosition = wrapperPosition + CHANGE_SPEED
            }
          else{
            wrapperPosition = wrapperPosition - CHANGE_SPEED
          }
          this.wrapper.setLeftPosition(wrapperPosition)
        }else{
          this.leftSideBtn.enableBtn()
          this.rightSideBtn.enableBtn()
          clearInterval(anim)
        }
    }).bind(this), CHANGE_SPEED)
  }

  // // Left button listener
  this.leftBtnEvent = function(){
  this.indicator.decrementIndex()
  this.leftSideBtn.disableBtn()
  this.rightSideBtn.disableBtn()

  var currentIndex = this.indicator.getCurrentIndex();
  var currentPosition = this.wrapper.getLeftPosition();
  var updatePosition = -(currentIndex * IMAGE_WIDTH)

  if(currentIndex < 0){
      updatePosition = this.wrapper.getRightPosition()
      this.indicator.setCurrentIndex(this.sliderImages.length-1)

      var sliderAnim = setInterval((function(){
        if(currentPosition !== updatePosition){
          currentPosition = currentPosition - CHANGE_SPEED

          this.wrapper.setLeftPosition(currentPosition)
        }else{
          this.leftSideBtn.enableBtn()
          this.rightSideBtn.enableBtn()
          clearInterval(sliderAnim)
        }
      }).bind(this), 5)
    }else{
      var sliderAnim = setInterval((function(){
        if(currentPosition !== updatePosition){
          currentPosition = currentPosition + CHANGE_SPEED
          this.wrapper.setLeftPosition(currentPosition)

        }else{
          this.indicator.setCurrentIndex(-currentPosition/IMAGE_WIDTH)
          this.leftSideBtn.enableBtn()
          this.rightSideBtn.enableBtn()
          clearInterval(sliderAnim)
        }
      }).bind(this), 5)
    }
  }

  // Right Index
  this.rightBtnEvent= function(){
      this.indicator.incrementIndex()
      this.leftSideBtn.disableBtn()
      this.rightSideBtn.disableBtn()

      var currentPosition = this.wrapper.getLeftPosition();
      var updatePosition = -(this.indicator.getCurrentIndex() * IMAGE_WIDTH)

      if(this.indicator.getCurrentIndex() >= this.sliderImages.length){
          updatePosition = 0
          this.indicator.setCurrentIndex(0);

          var sliderAnim = setInterval((function(){
            if(currentPosition !== updatePosition){
              currentPosition = currentPosition + CHANGE_SPEED
              this.wrapper.setLeftPosition(currentPosition)
            }else{
              this.leftSideBtn.enableBtn()
              this.rightSideBtn.enableBtn()
              clearInterval(sliderAnim)
            }
          }).bind(this), 5)
      }

      else{
        var sliderAnim = setInterval((function(){
          if(currentPosition !== updatePosition){
            currentPosition = currentPosition - CHANGE_SPEED
            this.wrapper.setLeftPosition(currentPosition )
          }else{
            this.indicator.setCurrentIndex(-currentPosition/IMAGE_WIDTH);
            this.leftSideBtn.enableBtn()
            this.rightSideBtn.enableBtn()
            clearInterval(sliderAnim)
          }
        }).bind(this), 5)
      }
    }

  this.startTransition = function(TRANSITION){
    console.log("transition")
    setInterval((function(){
      var currentPosition = this.wrapper.getLeftPosition()

      this.indicator.incrementIndex()
      if(this.indicator.getCurrentIndex() >= this.sliderImages.length){
        this.indicator.setCurrentIndex(0)
        this.wrapper.setLeftPosition(0)
      }

      var destination = -((this.indicator.getCurrentIndex()) * IMAGE_WIDTH)
      if(currentPosition > destination){
        while(currentPosition > destination){
            currentPosition--
            this.wrapper.setLeftPosition(currentPosition)
        }
      }

    }).bind(this), TRANSITION)
  }

  this.indicator.getElement().onclick = (function(e){
    return this.indicatorEvent(e)}
  ).bind(this)

  this.leftSideBtn.getElement().onclick = (function(){
      return this.leftBtnEvent()
    }).bind(this)

  this.rightSideBtn.getElement().onclick = (function(){
      return this.rightBtnEvent()
    }).bind(this)
}

// Referencing the tags
var carouselElementList = document.getElementsByClassName('carousel');
for(var item = 0; item <carouselElementList.length; item++){
  carouselElementList[item].style.float = 'left'
  var sliderController = new SliderController(carouselElementList[item])
  sliderController.startTransition((item+1) * 1000)
}
