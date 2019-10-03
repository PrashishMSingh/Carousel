const IMAGEWIDTH = '700';
const IMAGEHEIGHT = '430';
const CHANGESPEED = 10;


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
    console.log(leftPosition)
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

  this.init = function(){
    this.sideBtnElement = document.createElement('div')
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

//
//
//
//
//
//
//




indicator.getElement().onclick = function(e){
  // this.wrapper.style.left = (-this.currentIndex * parseInt(IMAGEWIDTH)) + 'px'
  // var itemIndex = .indexOf(e.target)
  // console.log(Array.from(indicator.getElement().children).indexOf(e.target))

  indicator.setCurrentIndex(Array.from(indicator.getElement().children).indexOf(e.target));
  wrapper.setLeftPosition(-(indicator.getCurrentIndex() * IMAGEWIDTH))
}


// Left button listener
leftSideBtn.getElement().onclick = function(){

  indicator.decrementIndex()

  var currentIndex = indicator.getCurrentIndex();
  var currentPosition = wrapper.getLeftPosition();
  var updatePosition = -(currentIndex * IMAGEWIDTH)

  if(currentIndex < 0){
      updatePosition = wrapper.getRightPosition()
      indicator.setCurrentIndex(sliderImages.length-1)

      var sliderAnim = setInterval(function(){
        if(currentPosition !== updatePosition){
          currentPosition = currentPosition - CHANGESPEED

          console.log("current ", currentPosition , " updated : ", updatePosition , "current index : ", indicator.getCurrentIndex())
          wrapper.setLeftPosition(currentPosition)
        }else{
          clearInterval(sliderAnim)
        }
      }, 5)
  }else{
    // this.currentIndex++;
    // indicator.incrementIndex()
    // console.log('ind : ', indicator.getCurrentIndex())
    var sliderAnim = setInterval(function(){
      if(currentPosition !== updatePosition){
        currentPosition = currentPosition + CHANGESPEED
        // this.wrapper.style.left = currentPosition + 'px'
        wrapper.setLeftPosition(currentPosition)
        console.log("update Index aaaaaa : ", updatePosition, "current insdex : ", currentPosition, " : ", indicator.getCurrentIndex() )

      }else{
        indicator.setCurrentIndex(-currentPosition/IMAGEWIDTH)
        clearInterval(sliderAnim)
      }
    }, 5)
  }
}


// Right Index
rightSideBtn.getElement().onclick = function(){
  indicator.incrementIndex()
  var currentPosition = wrapper.getLeftPosition();

  var updatePosition = -(indicator.getCurrentIndex() * IMAGEWIDTH)

  // console.log("current index : ", indicator.getCurrentIndex() , "images length : ", sliderImages.length)

  if(indicator.getCurrentIndex() >= sliderImages.length){
      updatePosition = 0
      indicator.setCurrentIndex(0);

      var sliderAnim = setInterval(function(){

        if(currentPosition !== updatePosition){
          currentPosition = currentPosition + CHANGESPEED

          // this.wrapper.style.left = currentPosition + 'px'
          wrapper.setLeftPosition(currentPosition)
        }else{
          clearInterval(sliderAnim)
        }
      }, 5)
  }


  else{
    // index na mile
    // console.log(indicator.getCurrentIndex())
    var sliderAnim = setInterval(function(){
      if(currentPosition !== updatePosition){
        currentPosition = currentPosition - CHANGESPEED

        // this.wrapper.style.left = currentPosition + 'px'
        wrapper.setLeftPosition(currentPosition )
        console.log("current Position : ", currentPosition , "update postition : ", updatePosition)
      }else{
        indicator.setCurrentIndex(-currentPosition/IMAGEWIDTH) ;
        clearInterval(sliderAnim)
      }
    }, 5)
  }
}



// function Slider(carousel, wrapper, sliderImages){
//   this.carousel = carousel;
//   this.wrapper = wrapper;
//   this.sliderImages = sliderImages;
//   this.currentIndex = 1;
//
//   this.updateIndex = function(){
//     var indicatorList = this.indexIndicator.children
//
//
//     for(var i = 0; i<indicatorList.length; i++){
//       if(i === this.currentIndex -1){
//         indicatorList[i].setAttribute("class", "fas fa-circle")
//       }
//       else{
//         indicatorList[i].setAttribute("class", "far fa-circle")
//       }
//     }
//   }
//
//   this.getIndicatorList = function(pos){
//     var indicatorList = document.createElement('li');
//     indicatorList.style.width = '40px';
//     indicatorList.style.height = '40px';
//
//     if(pos === this.currentIndex -1){
//       indicatorList.setAttribute("class", "fas fa-circle")
//     }
//     else{
//       indicatorList.setAttribute("class", "far fa-circle")
//     }
//     return indicatorList
//   }
//
//   this.createSideButtons = function(iconClass, orientation){
//     var slideIcon = document.createElement('i')
//     slideIcon.setAttribute('class', iconClass);
//     slideIcon.style.fontSize = '20px';
//     slideIcon.style.color = '#fcfcfc';
//
//     var sideBtn = document.createElement('div');
//
//     sideBtn.style.position = 'absolute';
//     sideBtn.style.lineHeight = '40px';
//     sideBtn.style.width = '40px'
//     sideBtn.style.textAlign = 'center'
//     sideBtn.style.top = '44%';
//
//     sideBtn.style.backgroundColor = 'red'
//     sideBtn.appendChild(slideIcon)
//
//     if(orientation === 'left'){
//       sideBtn.style.left = 0
//       sideBtn.onclick = this.leftBtnListener
//
//     }else{
//       sideBtn.style.right = 0
//       sideBtn.onclick = this.rightBtnListener
//     }
//
//     return sideBtn
//   }
//
//   this.leftBtnListener= (function(){
//
//       var currentPosition = parseInt(this.wrapper.style.left);
//
//       this.currentIndex --;
//       if(this.currentIndex < 1){
//           updatePosition = (-this.sliderImages.length + 1) * parseInt(IMAGEWIDTH)
//
//           var sliderAnim = setInterval(function(){
//             if(currentPosition > updatePosition){
//               currentPosition --
//               this.wrapper.style.left = currentPosition + 'px'
//             }else{
//               clearInterval(sliderAnim)
//             }
//           }, 5)
//           this.currentIndex = sliderImages.length
//
//       }
//       else{
//         var updatePosition = ((-this.currentIndex+1) * parseInt(IMAGEWIDTH))
//         var sliderAnim = setInterval(function(){
//           if(currentPosition !== updatePosition){
//             currentPosition ++
//             this.wrapper.style.left = currentPosition + 'px'
//           }else{
//             clearInterval(sliderAnim)
//           }
//           this.currentIndex = currentPosition/parseInt(IMAGEWIDTH);
//         }, 5)
//
//       }
//       // index update
//       this.updateIndex();
//
//       // this.wrapper.style.left = (-this.currentIndex * parseInt(IMAGEWIDTH)) + 'px'
//
//   }).bind(this)
//
//   this.rightBtnListener =(function(){
//       var currentPosition = parseInt(this.wrapper.style.left);
//       var updatePosition = (-this.currentIndex * parseInt(IMAGEWIDTH))
//
//
//       if(this.currentIndex >= sliderImages.length){
//           updatePosition = 0
//
//           this.currentIndex = 1
//           var sliderAnim = setInterval(function(){
//             if(currentPosition !== updatePosition){
//               currentPosition ++
//               this.wrapper.style.left = currentPosition + 'px'
//             }else{
//               clearInterval(sliderAnim)
//             }
//           }, 5)
//       }else{
//         this.currentIndex++;
//         var sliderAnim = setInterval(function(){
//           if(currentPosition !== updatePosition){
//             currentPosition --
//             this.wrapper.style.left = currentPosition + 'px'
//
//           }else{
//             this.currentIndex = currentPosition/parseInt(IMAGEWIDTH);
//
//
//             clearInterval(sliderAnim)
//           }
//         }, 5)
//       }
//
//
//       // index update
//       this.updateIndex();
//
//   }).bind(this)
//
// }



// Slider.prototype.createSideBtn = function(){
//   // defigning the left and right buttons
//   this.rightBtn = this.createSideButtons('fas fa-arrow-right', 'right')
//   this.leftBtn = this.createSideButtons('fas fa-arrow-left', 'left')
//
//   this.carousel.appendChild(this.rightBtn)
//   this.carousel.appendChild(this.leftBtn)
// }
//
// Slider.prototype.setAttributes = function(){
//   // wrapper
//   this.wrapper.style.position = 'relative';
//   this.wrapper.style.width = sliderImages.length * parseInt(IMAGEWIDTH) + 'px';
//   this.wrapper.style.left = 0;
//
//   // container
//   this.carousel.style.width = IMAGEWIDTH;
//   this.carousel.style.height = parseInt(IMAGEHEIGHT) + 20 + 'px';
//   this.carousel.style.position= 'relative';
//   this.carousel.style.overflow= 'hidden';
//   this.carousel.style.margin = 'auto';
//
//   // images

//
//   // Indicator
//   this.indexIndicator = document.createElement('ul');
//   this.indexIndicator.style.position='absolute';
//   this.indexIndicator.style.bottom = '0px';
//   this.indexIndicator.style.textAlign = 'center';
//   this.indexIndicator.style.width = '100%';
//   this.indexIndicator.style.display = 'inline-block';
//
//   for(var i = 0; i < this.sliderImages.length; i++){
//     var indicatorList = this.getIndicatorList(i)
//     this.indexIndicator.appendChild(indicatorList)
//   }
//
//   this.indexIndicator.onclick = (function(e, i){
//     this.currentIndex = Array.from(this.indexIndicator.children).indexOf(e.target)+1
//     this.updateIndex()
//     this.wrapper.style.left = (-this.currentIndex * parseInt(IMAGEWIDTH)) + 'px'
//   }).bind(this)
//   this.carousel.appendChild(this.indexIndicator)
// }



// Referencing the tags
// var carousel = document.getElementsByClassName('carousel')[0];
// var wrapper = document.getElementsByClassName('wrapper')[0];
// var sliderImages = wrapper.children;
//
// var slider = new Slider(carousel, wrapper, sliderImages);
// slider.createSideBtn();
// slider.setAttributes();
