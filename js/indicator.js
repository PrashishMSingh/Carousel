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
