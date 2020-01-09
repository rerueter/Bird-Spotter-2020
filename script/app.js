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
const paboi =(position)=>{
  //const position = num;
  const $target = $('.tile').eq(position).addClass('target'); //select tile element
  const $cover_active = $($target).children().eq(0); //select child cover element
  
  $cover_active.addClass('foreground'); //sets class to increase active cover z-index 
  
  //places bird according to cover type
  if($cover_active.hasClass('rock')){
    $('.target').append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`);
  }else if($cover_active.hasClass('bush')){
    $('.target').append(`<i class="bird dove fas fa-dove"></i>`);
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird crow fas fa-crow"></i>`); 
  };
  // cleanup
  $('.target').removeClass('target');
  setTimeout(function(){$cover_active.removeClass('foreground')},1000);
}

//===game clock===//
const tick=()=>{
  if(game.time!==0 && game.time%2===0){
    paboi(locator(game.size));
    setTimeout(function() {const birds = $('.bird').eq(0).remove()},1800);
    console.log(game.time);
  }
  document.getElementById('countdown').innerHTML= `${game.time}`;
  if(game.time<=0){
    clearInterval(gameClock);
    document.getElementById('countdown').innerHTML= `Time!`;
    return
  };
  game.time -= 1;
  //sweeps current bird from field
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

//===Sandbox===//
const spooker=()=>{
  const randSpook = game.spooks[Math.floor(Math.random()*game.spooks.length)];
  // return randSpook;
  console.log(randSpook);
  $('.dove').addClass(`${randSpook}`)
}
const peeker=()=>{

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
$('#btn-animate').on('click', spooker);
// clock listener
$('#btn-timer').on('click', startClock);

// bird click listener
$('body').on('click', '.bird', ()=>{
  console.log('bird spotted!')
})

//===AutoStart===//
//FIXME funBirds();









