$(document).ready(function(){
  var steps=10;
  var angle=6;
  
  var angleDiff=angle/steps;
  var startAngle=-angle/2;
  var opacityDiff=(1/steps)+0.05;
  
  var $container=$(".container");
  var $original=$(".layer");
  
  $(".col").each(function(){
    $(this).clone().appendTo($(this).parent());
  })
  for(var i=0;i<steps;i++){
    var a=startAngle+(angleDiff*i);
    var $newLayer=$original
      .clone()
      .appendTo($container)
      .css({
        transform:"rotateX("+a+"deg)",
        opacity:opacityDiff
      })
    ;
  }
  $original.remove();
  
  var last=Date.now();
  var y=0;
  var speed=0.05;
  (function updateScroll(){
    var now=Date.now();
    var deltaT=now-last;
    y+=speed*deltaT;
    y=y % ($(".layer").height()/2);
    TweenMax.set($(".layer"),{
      y:-y,
      
      transformOrigin:"50% "+(($(window).height()/3)+y)+"px"
    });
    last=now;
    
    requestAnimationFrame(updateScroll);
  }());
})

var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });