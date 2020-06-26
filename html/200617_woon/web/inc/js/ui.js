window.addEventListener('load', function(){
    const sectionSlide = document.querySelector('.section-slide');
    const slidePanel = sectionSlide.querySelector('.slide-panel');
    const indicator = sectionSlide.querySelector('.indi');
    const items = slidePanel.children;

    slidePanel.style.width = `${100*items.length}%`;
    for(let i=0; i<items.length; i++){
        items[i].style.width = `${100/items.length}%`;
        indicator.append(document.createElement('li'));
    }
    indicator.children[0].className="active";
});