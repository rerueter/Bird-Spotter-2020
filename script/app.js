console.log('it a js')
//game object
const game = {
  cover:['<i class="rock fas fa-mountain"></i>','<i class="tree fas fa-tree"></i>','<i class="bush fas fa-spa"></i>'],
  p1:{
    score:0,
    doves:0,
    crows:0,
    kiwi:0,
  },
  p2:{
    score:0,
    doves:0,
    crows:0,
    kiwi:0,
  },
};

// field generator
const buildField=(size)=>{
  for(let i=1; i<=size; i++){
    let coverType = game.cover[Math.floor(Math.random()*3)]
    $('#game_field').append(`<div class="tile">${coverType}</div>`)
  };
};
buildField(100);

//=== put a bird on (behind) it===//
const paboi =()=>{
  
  const position = Math.floor(Math.random()*100); //0-99 corresponding to tile index numbers
  const $target = $('.tile').eq(position).addClass('target'); //select .tile element
  const $cover_active = $($target).children().eq(0); //select cover element
  
  $cover_active.addClass('foreground'); //sets class to increase active cover z-index // need to disable after animation
  
  //place bird according to cover type
  if($cover_active.hasClass('rock')){
    $('.target').append(`<i class="bird crow fas fa-crow"></i>`); 
  }else if($cover_active.hasClass('bush')){
    $('.target').append(`<i class="bird dove fas fa-dove"></i>`);
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`)
  }
   $('.target').removeClass('target');
}

//===game clock===//
let count = 30;

const tick=()=>{
  paboi();
  console.log(count);
  document.getElementById('year').innerHTML= `${count}`; ////!TEMP! CHANGE THIS////
  if(count<=0){
    clearInterval(gameClock);
    document.getElementById('year').innerHTML= `Time!`;
    return
  };
  count -= 1;
};

const startClock=()=>{
  gameClock = setInterval(tick,1000);
}
//===game clock===//

// animation tester - getting to grips w animate css
$('#btn-animate').on('click', ()=>{
  $('.crow').toggleClass(`animated bounce infinite`);
  $('.dove').toggleClass(`animated bounce infinite`);
  $('.kiwi').toggleClass(`animated bounce infinite`);
});
$('#btn-timer').on('click', startClock);

// bird click listener
$('body').on('click', '.bird', ()=>{
  console.log('bird spotted!')
})










// actually a nightmare, not fun. 
const funBirds =()=>{
  for(let i=0; i<100; i+=3){
    if($('tile').eq(i).children().eq(0).hasClass('rock')){
      $('.tile').eq(i).append(`<i class="bird crow fas fa-crow"></i>`)
    }else if($('.tile').eq(i).children().eq(0).hasClass('bush')){
      $('.tile').eq(i).append(`<i class="bird dove fas fa-dove"></i>`)
    }else if($('.cover').eq(i).children().eq(0).hasClass('tree')){
      $('.tile').eq(i).append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`)
    }
  }
}