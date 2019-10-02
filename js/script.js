var IMAGE_WIDTH = '700px';
var IMAGE_HEIGHT = '430px';

let imageIndex = 5;
let wrapperLeft = 0;

var container = document.getElementsByClassName("carousel")[0];
  container.style.height = IMAGE_HEIGHT;
  container.style.width = IMAGE_WIDTH;
  container.style.overflow = 'hidden';
  container.style.margin = 'auto'

var wrapperElement = document.getElementsByClassName("wrapper")[0];
var images = wrapperElement.children;

for(var i = 0; i< images.length; i++){
  images[i].style.float = "left"
  images[i].style.width = IMAGE_WIDTH
  images[i].style.height = IMAGE_HEIGHT
}

var wrapperSize = images[0].naturalWidth * images.length
wrapperElement.style.position = 'relative';
wrapperElement.style.width = wrapperSize + 'px'
wrapperElement.style.height = IMAGE_HEIGHT
wrapperElement.style.background = 'red'
wrapperElement.style.left = 0;

var rightBtn = setSliderAttribute('right-btn');
var leftBtn = setSliderAttribute('left-btn');

rightBtn.style.right = '0';
leftBtn.style.left = '0';

var leftIcon = createSliderIcon('fas fa-arrow-left')
var rightIcon = createSliderIcon('fas fa-arrow-right')

var indexIcons = createIndexIcon('index-icon')
indexIcons.style.position = 'absolute'
indexIcons.style.lineHeight = "20px";
indexIcons.style.padding = "0 20px";
indexIcons.style.bottom="20px;"
indexIcons.style.left="20px;"
indexIcons.style.display = "inline-block"


function updateIndexIcons(){
  var indexList = document.getElementsByClassName('index-icon')[0];
  var indexes = indexList.children
  console.log("index : ", imageIndex)

  for(var i = 0; i < indexes.length ; i++){
    if(i+1 === imageIndex){
      indexes[i].setAttribute("class", "fas fa-circle")
    }
    else{
      indexes[i].setAttribute("class", "far fa-circle")
    }
  }
}

function createIndexIcon(className){
  var indexContainer = document.createElement('ul')
  indexContainer.setAttribute("class", className)
  for(var i = 1; i<= images.length; i++){
    var indexList = document.createElement('li')
    indexList.style.listStyle = 'none';
    indexList.style.float = 'left';
    indexList.style.padding = '20px';

    if(i+1 === imageIndex){
      indexList.setAttribute("class", "fas fa-circle")
    }
    else{
      indexList.setAttribute("class", "far fa-circle")
    }

    indexContainer.append(indexList)
  }

  return indexContainer;
}

container.appendChild(rightBtn)
container.appendChild(leftBtn)
container.appendChild(indexIcons)

leftBtn.appendChild(leftIcon)
rightBtn.appendChild(rightIcon)

rightBtn.onclick = function(){
  imageIndex ++;
  updateIndexIcons()
  if(imageIndex >= images.length){
    imageIndex = 0;
    wrapperElement.style.left = -((images.length-1) * parseInt(IMAGE_WIDTH)) + 'px';

  }else{
    wrapperElement.style.left = (parseInt(wrapperElement.style.left) + parseInt(IMAGE_WIDTH)) + 'px';
  }

  console.log('index : ', wrapperElement.style.left)
}

leftBtn.onclick = function(){

  imageIndex --;
  updateIndexIcons()
  if(imageIndex <= 0){
    imageIndex = 4;
    wrapperElement.style.left = 0;
  }
  else{
    wrapperElement.style.left = (parseInt(wrapperElement.style.left) - parseInt(IMAGE_WIDTH)) + 'px';
  }
  console.log('index : ', wrapperElement.style.left)
}



function createSliderIcon(className){
  var sliderIcon = document.createElement('i');
  sliderIcon.setAttribute('class', className);
  sliderIcon.style.color='#fcfcfc';
  sliderIcon.style.lineHeight = '50px';
  sliderIcon.style.padding = '0 10px'
  sliderIcon.style.fontSize = '20px'
  return sliderIcon;
}

function setSliderAttribute(className){
  var sliderBtn = document.createElement('span');
  sliderBtn.setAttribute('class', className);
  sliderBtn.style.display = 'inline-block';
  sliderBtn.style.position = 'absolute';
  sliderBtn.style.backgroundColor = '#212429';
  sliderBtn.style.top="45%";
  return sliderBtn;
}
