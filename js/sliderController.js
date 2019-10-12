const EM_VALUE = '16';

const SLIDER_IMAGE_WIDTH = '700';
const SLIDER_IMAGE_HEIGHT = '430';

const CHANGE_SPEED = 5;
const WAIT_MILLI = 1000;

const TRANSITION_DURATION = 3000;

function Carousel(WIDTH, HEIGHT, carouselElement){
  this.carousel = carouselElement
  this.init = function(){
    // container
    this.carousel.style.width = WIDTH / EM_VALUE + 'em';
    this.carousel.style.height = HEIGHT / EM_VALUE + 'em';
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

function Wrapper(wrapperElement, sliderImages, IMAGE_WIDTH, IMAGE_HEIGHT){

  this.topPosition = 0;
  this.leftPosition = 0;
  this.wrapper = wrapperElement;
  this.IMAGE_WIDTH = IMAGE_WIDTH;
  this.IMAGE_HEIGHT = IMAGE_HEIGHT;

  this.wrapperWidth = (sliderImages.length) * this.IMAGE_WIDTH
  this.wrapperHeight = (sliderImages.length) * this.IMAGE_HEIGHT


  this.init = function(){
    // wrapper
    this.wrapper.style.position = 'relative';
    return this;
  }

  this.setHorizontalSlider = function(){
    this.wrapper.style.left = this.leftPosition;
    this.wrapper.style.width =  this.wrapperWidth + 'px';
    this.rightPosition = -(this.wrapperWidth - this.IMAGE_WIDTH)

  }

  this.setVerticalSlider = function(){
    this.wrapper.style.top = this.topPosition;
    this.wrapper.style.height = this.wrapperHeight + 'px';
    this.bottomPosition = -(this.wrapperHeight - this.IMAGE_HEIGHT)
  }

  this.setTopPosition = function(topPosition){
    this.wrapper.style.top = topPosition + 'px';
    this.topPosition = topPosition;
  }

  this.setBottomPosition = function(bottomPosition){
    this.wrapper.style.bottom = bottomPosition + 'px;';
    this.bottomPosition = bottomPosition;
  }

  this.setRightPosition = function(rightPosition){
    this.wrapper.style.right = rightPosition + 'px';
    this.rightPosition = rightPosition;
  }

  this.setLeftPosition = function(leftPosition){
    this.wrapper.style.left = leftPosition + 'px';
    this.leftPosition = leftPosition;
  }

  this.getTopPosition = function(){
    return this.topPosition;
  }

  this.getBottomPosition = function(){
    return this.bottomPosition;
  }

  this.getRightPosition = function(){
    return this.rightPosition;
  }

  this.getLeftPosition = function(){
    return this.leftPosition;
  }

  this.getElement = function(){
    return this.wrapper;
  }
}


// Indicator Function
function Indicator(parentElement, indicatorCount){
  this.parentElement = parentElement
  this.indicatorCount = indicatorCount
  this.indexList = []
  this.currentIndex = 0

  this.init = function(){
    // Indicator
    this.indicator = document.createElement('ul');
    this.indicator.style.position='absolute';
    this.indicator.style.bottom = '0px';
    this.indicator.style.textAlign = 'center';
    this.indicator.style.width = '100%';
    this.inActiveClass = "fas fa-circle"
    this.activeClass = "far fa-circle"

    this.parentElement.appendChild(this.indicator)
    return this;
  }

  this.setIndicatorElement = function(element){
    this.indicator = document.getElementsByClassName(element)[0]
  }

  this.setIndicatorClass = function(activeClass, inActiveClass){
    this.activeClass = activeClass;
    this.inActiveClass = inActiveClass;
  }

  this.getElement = function(){
    return this.indicator;
  }

  this.checkActiveIndex = function(indicatorNode, pos){
    if(pos === this.currentIndex){
      indicatorNode.setAttribute("class", this.inActiveClass)
    }
    else{
      indicatorNode.setAttribute("class", this.activeClass)
    }
  }

  this.initializeIndicators = function(){
    for(var pos = 0; pos < indicatorCount; pos++){
      var indicatorList = document.createElement('li');
      indicatorList.style.width = '20px';
      indicatorList.style.height = '20px';

      this.checkActiveIndex(indicatorList, pos)
      this.indicator.appendChild(indicatorList)
    }
  }

  this.updateIndicators = function(){
    var indicatorList = Array.from(this.indicator.children)

    for(var i = 0; i <this.indicatorCount; i++){
      // sending the list at index i and ithe position
      this.checkActiveIndex(indicatorList[i], i)
    }
  }

  this.getIndicator = function(){
    return this.indicator;
  }

  this.incrementIndex = function(){
    this.currentIndex = this.currentIndex + 1
    this.updateIndicators()
  }

  this.decrementIndex = function(){
    this.currentIndex = this.currentIndex - 1
    this.updateIndicators()
  }

  this.getCurrentIndex = function(){
    return this.currentIndex;
  }

  this.setCurrentIndex = function(index){
    this.currentIndex = index;
    this.updateIndicators()
  }
}

// side slider button
function SideButton(parentElement){
  this.parentElement = parentElement;
  this.isEnabled = true;

  this.init = function(){

  }

  this.setBtnElement = function(class_name){
    this.sideBtnElement = document.getElementsByClassName(class_name)[0]
    return this;
  }

  this.createDefaultStyle = function(pos){
    this.sideBtnElement = document.createElement('button')
    this.slideIcon = document.createElement('i');

    this.sideBtnElement.style.position = 'absolute';
    this.sideBtnElement.style.lineHeight = '40px';
    this.sideBtnElement.style.width = '40px'
    this.sideBtnElement.style.textAlign = 'center'
    this.sideBtnElement.style.top = '44%';
    this.sideBtnElement.style.backgroundColor = 'red'

    this.slideIcon.style.fontSize = '20px';
    this.slideIcon.style.color = '#fcfcfc';

    if(pos == 'left'){
        this.slideIcon.setAttribute('class', 'fas fa-arrow-left');
        this.sideBtnElement.style.left = 0;
    }else{
        this.slideIcon.setAttribute('class', 'fas fa-arrow-right');
        this.sideBtnElement.style.right = 0;
    }

    this.sideBtnElement.appendChild(this.slideIcon);
    this.parentElement.appendChild(this.sideBtnElement);

    return this;
  }

  this.disableBtn = function(){
    if(this.isEnabled){
      this.sideBtnElement.disabled = true;
      this.isEnabled = false;
    }
  }

  this.enableBtn = function(){
    if(!this.isEnabled){
      this.sideBtnElement.disabled = false;
      this.isEnabled = true;
    }
  }

  this.getElement = function(){
    return this.sideBtnElement
  }

  // this.setIconPos = function(pos){
  //
  // }
}

function SliderController(carouselElement, intervalDuration, IMAGE_WIDTH, IMAGE_HEIGHT){
  this.IMAGE_WIDTH = IMAGE_WIDTH;
  this.IMAGE_HEIGHT = IMAGE_HEIGHT;
  this.sliderType = 'horizontal;'
  this.carouselElement = carouselElement;
  this.wrapperElement = this.carouselElement.getElementsByClassName('wrapper')[0];
  this.sliderImages = this.wrapperElement.children;
  this.canTransition = true;

  for(var i = 0; i<this.sliderImages.length; i++){
    this.sliderImages[i].style.float = 'left';
    this.sliderImages[i].style.width = this.IMAGE_WIDTH / EM_VALUE + 'em';
    this.sliderImages[i].style.height = this.IMAGE_HEIGHT/EM_VALUE + 'em';
  }

  this.carousel = new Carousel(this.IMAGE_WIDTH, this.IMAGE_HEIGHT, this.carouselElement).init()
  this.wrapper = new Wrapper(this.wrapperElement, this.sliderImages, this.IMAGE_WIDTH, this.IMAGE_HEIGHT).init()
  this.indicator = new Indicator(this.carousel.getElement(), this.sliderImages.length)


  this.leftSideBtn = new SideButton(this.carousel.getElement())
  this.rightSideBtn = new SideButton(this.carousel.getElement())


  this.setBtnsElement = function(btnLeft, btnRight){
    this.leftSideBtn = this.leftSideBtn.setBtnElement(btnLeft)
    this.rightSideBtn = this.rightSideBtn.setBtnElement(btnRight)
  }

  this.setDefaultBtn = function(){
    this.leftSideBtn.createDefaultStyle('left')
    this.rightSideBtn.createDefaultStyle('right')
  }

  this.setIndicatorElement = function(element){
    this.indicator.setIndicatorElement(element)
  }

  this.setDefaultIndicator = function(){
    this.indicator.init()
    this.indicator.initializeIndicators();
  }

  this.setIndicatorClass = function(activeClass, inActiveClass){
    this.indicator.setIndicatorClass(activeClass, inActiveClass)
    this.indicator.initializeIndicators();
  }

  this.setSliderType = function(type){
    if(type ==='vertical' ){
      this.wrapper.setVerticalSlider()
    }
    else{
      this.wrapper.setHorizontalSlider()
    }
    this.sliderType = type;
  }


  // Indicator Event Listener
   this.indicatorEvent = function(e){
    var wrapperPosition = this.wrapper.getLeftPosition()

    var newIndex = Array.from(this.indicator.getElement().children).indexOf(e.target);
    var destinationPosition = -(newIndex * this.IMAGE_WIDTH)

    this.indicator.setCurrentIndex(newIndex);
    var anim = setInterval((function(){
        if(wrapperPosition != destinationPosition){
          this.leftSideBtn.disableBtn()
          this.rightSideBtn.disableBtn()
          this.allowTransition(false)
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
          this.allowTransition(true)
          clearInterval(anim)
        }
    }).bind(this), CHANGE_SPEED)
  }

  // // Left button listener
  this.leftBtnEvent = function(){
  this.indicator.decrementIndex()
  this.leftSideBtn.disableBtn()
  this.rightSideBtn.disableBtn()
  this.allowTransition(false)

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
          this.allowTransition(true)
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
          this.allowTransition(true)
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
      this.allowTransition(false)

      var currentPosition = this.wrapper.getLeftPosition();
      var updatePosition = -(this.indicator.getCurrentIndex() * IMAGE_WIDTH)

      if(this.indicator.getCurrentIndex() >= this.sliderImages.length ||
      currentPosition < updatePosition){
          updatePosition = 0
          var sliderAnim = setInterval((function(){

            if(currentPosition !== updatePosition){
              if(currentPosition < updatePosition){
                currentPosition = currentPosition + CHANGE_SPEED
              }
              else{
                currentPosition = currentPosition - CHANGE_SPEED
              }
              this.wrapper.setLeftPosition(currentPosition)

            }else{
              this.leftSideBtn.enableBtn()
              this.rightSideBtn.enableBtn()
              this.indicator.setCurrentIndex(0)
              this.allowTransition(true)
              clearInterval(sliderAnim)
            }
          }).bind(this), 5)
      }

      else{
        var sliderAnim = setInterval((function(){
          // console.log(currentPosition , ' ,,, ', updatePosition, ' ,,, ', this.wrapper.getRightPosition(), ' ,,, ', this.indicator.getCurrentIndex)())
          if(currentPosition !== updatePosition){
            if(currentPosition > updatePosition){
              currentPosition = currentPosition - CHANGE_SPEED
            }
            else{
              currentPosition = currentPosition + CHANGE_SPEED
            }
            this.wrapper.setLeftPosition(currentPosition)
          }else{
            this.indicator.setCurrentIndex(-currentPosition/IMAGE_WIDTH);
            this.leftSideBtn.enableBtn()
            this.rightSideBtn.enableBtn()
            this.allowTransition(true)
            clearInterval(sliderAnim)
          }
        }).bind(this), 5)
      }
    }

  this.hideIndicator = function(){
    this.indicator.getElement().style.display = 'none';
  }

    // Right Index
    this.topBtnEvent= function(){
        this.indicator.incrementIndex()
        this.leftSideBtn.disableBtn()
        this.rightSideBtn.disableBtn()
        this.allowTransition(false)

        var currentPosition = this.wrapper.getTopPosition();

        var updatePosition = -(this.indicator.getCurrentIndex() * this.IMAGE_HEIGHT)

        if(this.indicator.getCurrentIndex() >= this.sliderImages.length || currentPosition < updatePosition){
            updatePosition = 0

            var sliderAnim = setInterval((function(){
              if(currentPosition !== updatePosition){
                if(currentPosition < updatePosition){
                  currentPosition = currentPosition + CHANGE_SPEED
                }else{
                  currentPosition = currentPosition - CHANGE_SPEED
                }
                this.wrapper.setTopPosition(currentPosition)
              }else{
                this.leftSideBtn.enableBtn()
                this.rightSideBtn.enableBtn()
                this.allowTransition(true)
                this.indicator.setCurrentIndex(0);
                clearInterval(sliderAnim)
              }
            }).bind(this), 5)
        }

        else{
          var sliderAnim = setInterval((function(){
            if(currentPosition !== updatePosition){
              if(currentPosition > updatePosition){
                  currentPosition = currentPosition - CHANGE_SPEED
              }else{
                currentPosition = currentPosition + CHANGE_SPEED
              }
              this.wrapper.setTopPosition(currentPosition )
            }else{
              this.indicator.setCurrentIndex(-currentPosition/this.IMAGE_HEIGHT);
              this.leftSideBtn.enableBtn()
              this.rightSideBtn.enableBtn()
              this.allowTransition(true)
              clearInterval(sliderAnim)
            }
          }).bind(this), 5)
        }
      }

    // Right Index
    this.bottomBtnEvent= function(){
      this.indicator.decrementIndex()
      this.leftSideBtn.disableBtn()
      this.rightSideBtn.disableBtn()
      this.allowTransition(false)

      var currentIndex = this.indicator.getCurrentIndex();
      var currentPosition = this.wrapper.getTopPosition();
      var updatePosition = -(currentIndex * this.IMAGE_HEIGHT)


      if(currentIndex <= 0){
          updatePosition = this.wrapper.getBottomPosition()

          var sliderAnim = setInterval((function(){

            console.log(currentPosition ," , ", updatePosition)
            if(currentPosition !== updatePosition){
              currentPosition = currentPosition - CHANGE_SPEED
              this.wrapper.setTopPosition(currentPosition)
            }else{
              this.leftSideBtn.enableBtn()
              this.rightSideBtn.enableBtn()
              this.allowTransition(true)
              this.indicator.setCurrentIndex(this.sliderImages.length-1)
              clearInterval(sliderAnim)
            }
          }).bind(this), CHANGE_SPEED)
        }else{
          var sliderAnim = setInterval((function(){
            if(currentPosition !== updatePosition){
              currentPosition = currentPosition + CHANGE_SPEED
              this.wrapper.setTopPosition(currentPosition)

            }else{
              this.indicator.setCurrentIndex(-currentPosition/this.IMAGE_HEIGHT)
              this.leftSideBtn.enableBtn()
              this.rightSideBtn.enableBtn()
              this.allowTransition(true)
              clearInterval(sliderAnim)
            }
          }).bind(this), CHANGE_SPEED)
        }
      }

  this.setActionListeners = function(){

    if(this.sliderType == 'vertical'){
      this.rightSideBtn.getElement().onclick = (function(){
          return this.bottomBtnEvent()
        }).bind(this)

      this.leftSideBtn.getElement().onclick = (function(){
          return this.topBtnEvent()
        }).bind(this)
    }

    else{
      this.leftSideBtn.getElement().onclick = (function(){
          return this.leftBtnEvent()
        }).bind(this)

      this.rightSideBtn.getElement().onclick = (function(){
          return this.rightBtnEvent()
        }).bind(this)
    }


    this.indicator.getElement().onclick = (function(e){
      return this.indicatorEvent(e)}
    ).bind(this)
  }

  this.allowTransition = function(transitionState){
    this.canTransition = transitionState;
  }

  this.startTransition = function(TRANSITION){
    if(this.sliderType == 'vertical'){
      setInterval((function(){
        if(this.canTransition){
          this.topBtnEvent()
        }
      }).bind(this), TRANSITION)
    }else{
      setInterval((function(){
        if(this.canTransition){
          this.rightBtnEvent()
        }
      }).bind(this), TRANSITION)
    }
  }
}

var carouselSecondSlide = document.getElementsByClassName('carousel');
for(var i = 0; i< carouselSecondSlide.length; i++){
  var sliderController = new SliderController(carouselSecondSlide[i], WAIT_MILLI, SLIDER_IMAGE_WIDTH, SLIDER_IMAGE_HEIGHT)
  sliderController.setDefaultBtn()
  sliderController.setSliderType('horizontal')
  sliderController.setDefaultIndicator();
  sliderController.setActionListeners();
  sliderController.startTransition(TRANSITION_DURATION)
}
