var htmlElement = document.querySelector('html');
var vinhomesText = document.querySelector('.newest-project--desc span');
var neighborText = document.querySelector('.neiborhood > span');

window.onscroll = function() {
    var scrollNumber = (htmlElement.scrollTop/htmlElement.scrollHeight)*htmlElement.scrollWidth;
    //Vinhomes Text adjust to window scroll
    vinhomesText.style.transform = `translate(calc(500px - ${scrollNumber}px) , 0)`;
    //Cong Dong text adjust to window scroll
    neighborText.style.transform = `translate(calc(900px - ${scrollNumber}px) , 0)`;
}

