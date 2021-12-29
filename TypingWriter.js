//typewriter
var textElements= document.querySelectorAll('.content__text-banner h2');
var dashElement = document.querySelector('.content__text-banner h3')
var textCurrent;
const speedType = 50;
const speedBackSpace = 30; 
const delayType = 500;
const delayBackSpace = 2000;
var i;
var j;
var k=-1;

function typeWriter(){
    i=0;
    k++;
    if(k==textElements.length){
        k=0;
    }
    textCurrent = textElements[k].innerHTML;
    j=textCurrent.length;
    dashElement.classList.remove('active');
    textElements[k].classList.add('active');
    textElements[k].innerHTML='';
    addWord();
} 

function addWord(){
    if(i<textCurrent.length){
        textElements[k].innerHTML = textElements[k].innerHTML.replace('|','')
        textElements[k].innerHTML += textCurrent.charAt(i++) + '|';
        setTimeout(addWord , speedType);
    }
    else if(j>=0){
        setTimeout(removeWord , delayBackSpace);
   }
}

function removeWord(){
    if(j>=0){
        textElements[k].innerHTML = textElements[k].innerHTML.replace('|','');
        textElements[k].innerHTML =  textCurrent.slice(0,j--) + '|';
        setTimeout(removeWord, speedBackSpace);
    }
    else{
        textElements[k].classList.remove('active');
        dashElement.classList.add('active');
        textElements[k].innerHTML = textCurrent;
        setTimeout(typeWriter , delayType);
    }
}
typeWriter();

//select location
var locationWrapper = document.querySelector('.js-display-attr')
var selectionLocation = document.querySelectorAll('.js-onclick-location')
var locationSelected = document.querySelector('.js-onclick-location span')

selectionLocation.forEach(item => {
    var i = 0;
    item.onclick = function(e){
        i++;
        if(i%2==1){
            e.stopPropagation();
        }
        locationWrapper.style.display ="block";
        roomWrapper.style.display = 'none';
    }
})

var locationItem = document.querySelectorAll('.location-item');
locationItem[0].style.backgroundColor = '#ccc';

locationItem.forEach(item => {
    item.onclick = function(e) {
        e.stopPropagation();
        locationItem.forEach(item => {
            item.style.backgroundColor = 'transparent';
        })
        item.style.backgroundColor = '#ccc';
        locationSelected.innerText = item.innerText;
        hideDropMenu();
    }
})

//select room
var roomWrapper = document.querySelector('.js-display-attr-2')
var selectionRoom = document.querySelectorAll('.js-onclick-room')
var roomSelected = document.querySelector('.js-onclick-room span')

selectionRoom.forEach(item => {
    var i=0;
    item.onclick = function(e){
        i++;
        if(i%2==1){
            e.stopPropagation();
        }
        roomWrapper.style.display ="block";
        locationWrapper.style.display = 'none';
    }
})

var roomItem = document.querySelectorAll('.room-item');
roomItem[0].style.backgroundColor = '#ccc';

roomItem.forEach(item => {
    item.onclick = function(e) {
        e.stopPropagation();
        roomItem.forEach(item => {
            item.style.backgroundColor = 'transparent';
        })
        item.style.backgroundColor = '#ccc';
        roomSelected.innerText = item.innerText;
        hideDropMenu();
    }
})

//select expense
var expenseWrapper = document.querySelector('.expense-wrapper')
var selectionExpense = document.querySelectorAll('.js-onclick-expense')
var expenseSelected = document.querySelector('.js-onclick-expense span')
expenseWrapper.style.display ="block";

selectionExpense.forEach(item => {
    var i=0;
    item.onclick = function(e){
        e.stopPropagation();
        expenseWrapper.style.display ="block";
    }
})

dragElement()
function dragElement(){
    const leftBtn = document.querySelector('.expense-left-btn') 
    const rightBtn = document.querySelector('.expense-right-btn')
    //line is between left and right Btn
    const line = document.querySelector('.expense-line')
    const rect = line.getBoundingClientRect()
    //catch event when mousedown on Btn
    var elemt1, elemt2;
    leftBtn.onmousedown = () => {
        elemt1 = leftBtn
        dragMouseDown();
    }
    rightBtn.onmousedown = () => {
        elemt2 = rightBtn
        dragMouseDown();
    }

    function dragMouseDown(e){
        var pos1=0, pos2=0;
        //position1 when start mousedown
        document.onmouseup = closeDragBtn
        document.onmousemove = dragBtn
    
        function dragBtn(e){
            if(elemt1){
                dragLeftBtn(e);
            }
            if(elemt2){
                dragRightBtn(e);
            }
        }

        function dragLeftBtn(e){      
            pos1 = rect.left
            _offset = e.clientX - pos1
            pos2 = _offset > 0 ? (_offset < 324.5 ? _offset : 324.5 ) : 0
            console.log(pos2 , 123)
            elemt1.style.left = Math.floor(pos2 / 5.9) * 5.9 + 'px'
            //update min money text 
            const minExpense = document.querySelector('.current-min-expense')
            minExpense.innerHTML = (Math.floor(pos2/5.9)) / 10 + 'tỷ'
            if( pos2 >= 324.5 ) { elemt1.style.zIndex = '2' }
        } 

        function dragRightBtn(e){ 
            pos1 = rect.right
            _offset =  + e.clientX - pos1
            pos2 = _offset < 0 ? (_offset > -324.5 ? _offset : -324.5 ) : 0 
            console.log(_offset , rightBtn.onmousedown)
            elemt2.style.right = Math.floor(-pos2 / 5.9)*5.9 + 'px'
            //update max money text
            const maxExpense = document.querySelector('.current-max-expense')
            maxExpense.innerHTML = ( 55 - Math.floor(-pos2/5.9)) / 10 + 'tỷ'
            if( pos2 >= 324.5 ) { elemt2.style.zIndex = '2' }
        }
    
        function closeDragBtn(){
            document.onmousemove = 0;
            document.onmousedown = 0; 
            elemt1 = elemt2 = undefined;
        }
    }
}







//hide dropMenu when window.onclick event
function hideDropMenu(){
    roomWrapper.style.display = 'none';
    locationWrapper.style.display = 'none';
    expenseWrapper.style.display = 'none';
}

window.onclick = () => hideDropMenu();
