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
  aniSpeed:['fast','','slow'],
  spooks:['spook','spook-l','spook-r'],
};

// field generator
const buildField=(size)=>{
  for(let i=1; i<=size; i++){
    let coverType = game.cover[Math.floor(Math.random()*3)]
    $('#game-field').append(`<div class="tile">${coverType}</div>`)
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
    $('.target').append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`);
  };
  $('.target').removeClass('target');
  setTimeout(function(){$cover_active.removeClass('foreground')},1000);
}

//===game clock===//
const tick=()=>{
  paboi(locator(game.size));
  console.log(game.time);
  
  document.getElementById('year').innerHTML= `${game.time}`; ////!TEMP! CHANGE THIS////
  if(game.time<=0){
    clearInterval(gameClock);
    document.getElementById('year').innerHTML= `Time!`;
    return
  };
  game.time -= 1;
  //FIXME need to make this apply to the current bird. maybe sore current bird in game object.
  setTimeout(
    function() {
      const birds = $('.bird').eq(0).remove();
      // const birds = $('.bird');
      console.log(birds);
  },1500);
};

const startClock=()=>{
  gameClock = setInterval(tick,2000);
}
//===Bird Bouncer===//
const birdBounce=()=>{  
    $('.crow').toggleClass(`animated bounce infinite`);
    $('.dove').toggleClass(`animated bounce infinite`);
    $('.kiwi').toggleClass(`animated bounce infinite`);
}

//===Animation Speed Randomizer===//
const speed=()=>{
  return game.aniSpeed[Math.floor(Math.random()*game.aniSpeed.length)];
}
// populate birds for splash screen 

const funBirds =()=>{
 for(let i=1;i<game.size;i+=Math.floor(Math.random()*(5 - 2 + 1) + 2)){
   paboi(i);
  };
  $.each($('.bird'), (elm)=>{
    $('.bird').eq(elm).addClass(`animated bounce infinite ${speed()}`);
  })
}

//===Listeners===//

// start button
$('#start').on('click', ()=>{
  $('#logo').addClass('animated bounce');
  $('#splash').toggleClass('fadeOut');
  $('.bird').remove();
  setTimeout(function(){$('#splash').remove()},2000)
  //FIXME startClock();
})
// bird bouncer
$('#btn-animate').on('click', funBirds);
// clock listener
$('#btn-timer').on('click', startClock);

// bird click listener
$('body').on('click', '.bird', ()=>{
  console.log('bird spotted!')
})

//===AutoStart===//
//FIXME funBirds();


//===Sandbox===//
const spooker=()=>{
  const randSpook = game.spooks[Math.floor(Math.random()*game.spooks.length)];
  console.log(randSpook);
  $('.dove').toggleClass(`${randSpook}`)
}






