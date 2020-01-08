console.log('it a js')
//variables for adjusting the dials//

//game object
const game = {
  size:100,
  time:30,
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
buildField(game.size)

//===coord gen for putting birds on things===//
locator=(num)=>{
  return Math.floor(Math.random()*num)+1; //rndm based on num input
}

//=== put a bird on (behind) it===//
const paboi =(num)=>{
  const position = num;
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
const tick=()=>{
  paboi();
  console.log(count);
  document.getElementById('year').innerHTML= `${game.time}`; ////!TEMP! CHANGE THIS////
  if(count<=0){
    clearInterval(gameClock);
    document.getElementById('year').innerHTML= `Time!`;
    return
  };
  game.time -= 1;
};

const startClock=()=>{
  gameClock = setInterval(tick,1000);
}
//===Bird Bouncer===//
const birdBounce=()=>{  
    $('.crow').toggleClass(`animated bounce infinite`);
    $('.dove').toggleClass(`animated bounce infinite`);
    $('.kiwi').toggleClass(`animated bounce infinite`);
}


// actually a nightmare, not fun. 
//FIXME apply this to the specific bird per loop iteration!!
const funBirds =()=>{
 for(let i=1;i<game.size;i+=locator(4)){
   paboi(i);
  //  $('.bird').eq(i).addClass(`animated bounce infinite delay-${Math.floor(Math.random()*2)}s`);
  };
  // $('.bird').each().addClass(`animated bounce infinite delay-${Math.floor(Math.random()*2)}s`);
  $.each($('.bird'), (elm)=>{
   
    const randomDelay = Math.floor(Math.random()*10)
    console.log({elm,randomDelay});
    $('.bird').eq(elm).addClass(`animated bounce infinite delay-${randomDelay}s`);
  })
}
//===Listeners===//
// start button
$('#start').on('click', ()=>{
  $('#splash').toggleClass('slideOutUp');
})
// bird bouncer
$('#btn-animate').on('click', funBirds);
// clock listener
$('#btn-timer').on('click', startClock);

// bird click listener
$('body').on('click', '.bird', ()=>{
  console.log('bird spotted!')
})








