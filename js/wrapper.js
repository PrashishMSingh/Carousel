function Wrapper(wrapperElement, sliderImages){
  this.wrapper = wrapperElement;
  this.wrapperWidth = (sliderImages.length) * IMAGE_WIDTH

  this.init = function(){
    // wrapper
    this.wrapper.style.position = 'relative';

    this.leftPosition = 0;
    this.wrapper.background = 'red';
    this.rightPosition = -(this.wrapperWidth - IMAGE_WIDTH)
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
