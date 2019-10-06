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
