const IMAGEWIDTH = '700px';
const IMAGEHEIGHT = '430px';

function Slider(carousel, wrapper, sliderImages){
  this.carousel = carousel;
  this.wrapper = wrapper;
  this.sliderImages = sliderImages;
  this.currentIndex = 1;

  this.updateIndex = function(){
    var indicatorList = this.indexIndicator.children


    for(var i = 0; i<indicatorList.length; i++){
      if(i === this.currentIndex -1){
        indicatorList[i].setAttribute("class", "fas fa-circle")
      }
      else{
        indicatorList[i].setAttribute("class", "far fa-circle")
      }
    }
  }

  this.getIndicatorList = function(pos){
    var indicatorList = document.createElement('li');
    indicatorList.style.width = '40px';
    indicatorList.style.height = '40px';

    if(pos === this.currentIndex -1){
      indicatorList.setAttribute("class", "fas fa-circle")
    }
    else{
      indicatorList.setAttribute("class", "far fa-circle")
    }
    return indicatorList
  }

  this.createSideButtons = function(iconClass, orientation){
    var slideIcon = document.createElement('i')
    slideIcon.setAttribute('class', iconClass);
    slideIcon.style.fontSize = '20px';
    slideIcon.style.color = '#fcfcfc';

    var sideBtn = document.createElement('div');

    sideBtn.style.position = 'absolute';
    sideBtn.style.lineHeight = '40px';
    sideBtn.style.width = '40px'
    sideBtn.style.textAlign = 'center'
    sideBtn.style.top = '44%';

    sideBtn.style.backgroundColor = 'red'
    sideBtn.appendChild(slideIcon)

    if(orientation === 'left'){
      sideBtn.style.left = 0
      sideBtn.onclick = this.leftBtnListener

    }else{
      sideBtn.style.right = 0
      sideBtn.onclick = this.rightBtnListener
    }

    return sideBtn
  }

  this.leftBtnListener= (function(){

      var currentPosition = parseInt(this.wrapper.style.left);

      this.currentIndex --;
      if(this.currentIndex < 1){
          updatePosition = (-this.sliderImages.length + 1) * parseInt(IMAGEWIDTH)

          var sliderAnim = setInterval(function(){
            if(currentPosition > updatePosition){
              currentPosition --
              this.wrapper.style.left = currentPosition + 'px'
            }else{
              clearInterval(sliderAnim)
            }
          }, -1000)
          this.currentIndex = sliderImages.length

      }
      else{
        var updatePosition = ((-this.currentIndex+1) * parseInt(IMAGEWIDTH))
        var sliderAnim = setInterval(function(){
          if(currentPosition !== updatePosition){
            currentPosition ++
            this.wrapper.style.left = currentPosition + 'px'
          }else{
            clearInterval(sliderAnim)
          }
          this.currentIndex = currentPosition/parseInt(IMAGEWIDTH);
        }, -1000)

      }
      // index update
      this.updateIndex();

      // this.wrapper.style.left = (-this.currentIndex * parseInt(IMAGEWIDTH)) + 'px'

  }).bind(this)

  this.rightBtnListener =(function(){
      var currentPosition = parseInt(this.wrapper.style.left);
      var updatePosition = (-this.currentIndex * parseInt(IMAGEWIDTH))


      if(this.currentIndex >= sliderImages.length){
          updatePosition = 0

          this.currentIndex = 1
          var sliderAnim = setInterval(function(){
            if(currentPosition !== updatePosition){
              currentPosition ++
              this.wrapper.style.left = currentPosition + 'px'
            }else{
              clearInterval(sliderAnim)
            }
          }, -1000)
      }else{
        this.currentIndex++;
        var sliderAnim = setInterval(function(){
          if(currentPosition !== updatePosition){
            currentPosition --
            this.wrapper.style.left = currentPosition + 'px'

          }else{
            this.currentIndex = currentPosition/parseInt(IMAGEWIDTH);


            clearInterval(sliderAnim)
          }
        }, -1000)
      }


      // index update
      this.updateIndex();

  }).bind(this)

}



Slider.prototype.createSideBtn = function(){
  // defigning the left and right buttons
  this.rightBtn = this.createSideButtons('fas fa-arrow-right', 'right')
  this.leftBtn = this.createSideButtons('fas fa-arrow-left', 'left')

  this.carousel.appendChild(this.rightBtn)
  this.carousel.appendChild(this.leftBtn)
}

Slider.prototype.setAttributes = function(){
  // wrapper
  this.wrapper.style.position = 'relative';
  this.wrapper.style.width = sliderImages.length * parseInt(IMAGEWIDTH) + 'px';
  this.wrapper.style.left = 0;
  // container
  this.carousel.style.width = IMAGEWIDTH;
  this.carousel.style.height = parseInt(IMAGEHEIGHT) + 20 + 'px';
  this.carousel.style.position= 'relative';
  this.carousel.style.overflow= 'hidden';
  this.carousel.style.margin = 'auto';

  // images
  for(var i = 0; i<this.sliderImages.length; i++){
    this.sliderImages[i].style.float = 'left';
    this.sliderImages[i].style.display = 'inline-block'
  }

  // Indicator
  this.indexIndicator = document.createElement('ul');
  this.indexIndicator.style.position='absolute';
  this.indexIndicator.style.bottom = '0px';
  this.indexIndicator.style.textAlign = 'center';
  this.indexIndicator.style.width = '100%';
  this.indexIndicator.style.display = 'inline-block';

  for(var i = 0; i < this.sliderImages.length; i++){
    var indicatorList = this.getIndicatorList(i)
    this.indexIndicator.appendChild(indicatorList)
  }

  this.indexIndicator.onclick = (function(e, i){
    this.currentIndex = Array.from(this.indexIndicator.children).indexOf(e.target)+1
    this.updateIndex()
    this.wrapper.style.left = (-this.currentIndex * parseInt(IMAGEWIDTH)) + 'px'
  }).bind(this)
  this.carousel.appendChild(this.indexIndicator)
}



// Referencing the tags
var carousel = document.getElementsByClassName('carousel')[0];
var wrapper = document.getElementsByClassName('wrapper')[0];
var sliderImages = wrapper.children;

var slider = new Slider(carousel, wrapper, sliderImages);
slider.createSideBtn();
slider.setAttributes();
