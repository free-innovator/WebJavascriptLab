window.addEventListener('load', function(){
    const footer = document.querySelector('.footer');
    const btnPlus = document.querySelector('.footer .btn-plus');

    const footerAni = gsap.timeline().pause();
    footerAni.to(btnPlus, { duration: 0.3, width: '8vh', height: '8vh', y: '-4vh', ease: Power3.easeOut }, 0);
    footerAni.fromTo(footer, { clipPath: 'circle(80%)'}, { duration: 0.4, clipPath: 'circle(30%)', ease: Power2.easeInOut }, 0);

    footer.addEventListener('mouseenter', function(){
        footerAni.play();
    });
    footer.addEventListener('mouseleave', function(){
        footerAni.reverse();
    });
    // const plusBtn
});