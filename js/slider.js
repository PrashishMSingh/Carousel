const IMAGEWIDTH = '700';
const IMAGEHEIGHT = '430';
const CHANGESPEED = 5;


function Carousel(WIDTH, HEIGHT, carouselElement){
  this.carousel = carouselElement
  this.init = function(){
    // container
    this.carousel.style.width = WIDTH + 'px';
    this.carousel.style.height = parseInt(HEIGHT) + 20 + 'px';
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

function Wrapper(wrapperElement, sliderImages){
  this.wrapper = wrapperElement;
  this.wrapperWidth = (sliderImages.length) * IMAGEWIDTH

  this.init = function(){
    // wrapper
    this.wrapper.style.position = 'relative';

    this.leftPosition = 0;
    this.wrapper.background = 'red';
    this.rightPosition = -(this.wrapperWidth - IMAGEWIDTH)
    this.wrapper.style.width =  this.wrapperWidth + 'px';
    this.wrapper.style.left = this.leftPosition + 'px';
    return this;
  }

  this.setRightPosition = function(rightPosition){
    this.wrapper.style.right = rightPosition + 'px';
    this.rightPosition = rightPosition;
  }

  this.setLeftPosition = function(leftPosition){
    this.wrapper.style.left = leftPosition + 'px';
    this.leftPosition = leftPosition;
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

  this.getWrapper = function(){
    return this.wrapper;
  }
}

// Indicator Function
function Indicator(parentElement, indicatorCount){
  this.parentElement = parentElement
  this.indicatorCount = indicatorCount
  this.indexList = []
  this.init = function(){

    // Indicator
    this.indicator = document.createElement('ul');
    this.indicator.style.position='absolute';
    this.indicator.style.bottom = '0px';
    this.indicator.style.textAlign = 'center';
    this.indicator.style.width = '100%';

    this.currentIndex = 0

    this.parentElement.appendChild(this.indicator)
    return this;
  }

  this.getElement = function(){
    return this.indicator;
  }

  this.checkActiveIndex = function(indicatorNode, pos){
    if(pos === this.currentIndex){
      indicatorNode.setAttribute("class", "fas fa-circle")
    }
    else{
      indicatorNode.setAttribute("class", "far fa-circle")
    }
  }

  this.initializeIndicators = function(){
    for(var pos = 0; pos < indicatorCount; pos++){
      var indicatorList = document.createElement('li');
      indicatorList.style.width = '40px';
      indicatorList.style.height = '40px';

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

  this.setIconPos = function(pos){
    if(pos == 'left'){
        this.slideIcon.setAttribute('class', 'fas fa-arrow-left');
        this.sideBtnElement.style.left = 0;
    }else{
        this.slideIcon.setAttribute('class', 'fas fa-arrow-right');
        this.sideBtnElement.style.right = 0;
    }
  }
}

// Referencing the tags
var carouselElement = document.getElementsByClassName('carousel')[0];
var wrapperElement = document.getElementsByClassName('wrapper')[0];

var sliderImages = wrapperElement.children;
  for(var i = 0; i<this.sliderImages.length; i++){
    this.sliderImages[i].style.float = 'left';
  }

var carousel = new Carousel(IMAGEWIDTH, IMAGEHEIGHT, carouselElement).init()
var wrapper = new Wrapper(wrapperElement, sliderImages).init()
var indicator = new Indicator(carousel.getElement(), sliderImages.length).init()

var leftSideBtn = new SideButton(carousel.getElement()).init()
var rightSideBtn = new SideButton(carousel.getElement()).init()

leftSideBtn.setIconPos('left')
rightSideBtn.setIconPos('right')
indicator.initializeIndicators();

function disableBtn(){
  leftSideBtn.getElement().disable
  rightSideBtn.getElement().disable
}

indicator.getElement().onclick = function(e){
  var wrapperPosition = wrapper.getLeftPosition()
  var newIndex = Array.from(indicator.getElement().children).indexOf(e.target);
  var destinationPosition = -(newIndex * IMAGEWIDTH)
  indicator.setCurrentIndex(newIndex);

  var anim = setInterval(function(){
      if(wrapperPosition != destinationPosition){
        leftSideBtn.disableBtn()
        rightSideBtn.disableBtn()
        if(wrapperPosition < destinationPosition){
            wrapperPosition = wrapperPosition + CHANGESPEED
          }
        else{
          wrapperPosition = wrapperPosition - CHANGESPEED
        }
        wrapper.setLeftPosition(wrapperPosition)
      }else{
        leftSideBtn.enableBtn()
        rightSideBtn.enableBtn()
        clearInterval(anim)
      }
  }, CHANGESPEED)
}

// Left button listener
leftSideBtn.getElement().onclick = function(){
  indicator.decrementIndex()
  leftSideBtn.disableBtn()
  rightSideBtn.disableBtn()

  var currentIndex = indicator.getCurrentIndex();
  var currentPosition = wrapper.getLeftPosition();
  var updatePosition = -(currentIndex * IMAGEWIDTH)

  if(currentIndex < 0){
      updatePosition = wrapper.getRightPosition()
      indicator.setCurrentIndex(sliderImages.length-1)

      var sliderAnim = setInterval(function(){
        if(currentPosition !== updatePosition){
          currentPosition = currentPosition - CHANGESPEED

          wrapper.setLeftPosition(currentPosition)
        }else{
          leftSideBtn.enableBtn()
          rightSideBtn.enableBtn()
          clearInterval(sliderAnim)
        }
      }, 5)
  }else{
    var sliderAnim = setInterval(function(){
      if(currentPosition !== updatePosition){
        currentPosition = currentPosition + CHANGESPEED
        wrapper.setLeftPosition(currentPosition)

      }else{
        indicator.setCurrentIndex(-currentPosition/IMAGEWIDTH)
        leftSideBtn.enableBtn()
        rightSideBtn.enableBtn()
        clearInterval(sliderAnim)
      }
    }, 5)
  }
}

// Right Index
rightSideBtn.getElement().onclick = function(){
  indicator.incrementIndex()
  leftSideBtn.disableBtn()
  rightSideBtn.disableBtn()

  var currentPosition = wrapper.getLeftPosition();
  var updatePosition = -(indicator.getCurrentIndex() * IMAGEWIDTH)

  if(indicator.getCurrentIndex() >= sliderImages.length){
      updatePosition = 0
      indicator.setCurrentIndex(0);

      var sliderAnim = setInterval(function(){
        if(currentPosition !== updatePosition){
          currentPosition = currentPosition + CHANGESPEED
          wrapper.setLeftPosition(currentPosition)
        }else{
          leftSideBtn.enableBtn()
          rightSideBtn.enableBtn()
          clearInterval(sliderAnim)
        }
      }, 5)
  }

  else{
    var sliderAnim = setInterval(function(){
      if(currentPosition !== updatePosition){
        currentPosition = currentPosition - CHANGESPEED
        wrapper.setLeftPosition(currentPosition )
      }else{
        indicator.setCurrentIndex(-currentPosition/IMAGEWIDTH);
        leftSideBtn.enableBtn()
        rightSideBtn.enableBtn()
        clearInterval(sliderAnim)
      }
    }, 5)
  }
}
