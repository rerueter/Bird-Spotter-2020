console.log('it a js')
//variables for adjusting the dials//

//game object
const game = {
  size:100,
  time:30,
  round:1,
  topScore:0,
  p1:{
    score:0,
    doves:0,
    crows:0,
    kiwis:0,
  },

  aniSpeed:['fast','','slow'],
  spooks:['spook','spook-l','spook-r'],
  peeks:['peek-l','peek-r'],
  scoots:['scoot-l','scoot-r'],
  cover:['<i class="rock fas fa-mountain"></i>','<i class="tree fas fa-tree"></i>','<i class="bush fas fa-spa"></i>'],
  crow:`<i class="crow fas fa-crow"></i>`,
  dove:`<i class="dove fas fa-dove"></i>`,
  kiwi:`<i class="kiwi fas fa-kiwi-bird"></i>`,
};

// field generator
const buildField=(size)=>{
  for(let i=1; i<=size; i++){
    let coverType = game.cover[Math.floor(Math.random()*3)]
    $('#game-field').append(`<div class="tile">${coverType}</div>`)
  };
};


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
    setTimeout(scooter,100);
  }else if($cover_active.hasClass('bush')){
    $('.target').append(`<i class="bird dove fas fa-dove"></i>`);
    setTimeout(function(){$('.dove').addClass(`${spooker()}`)},100);
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird crow fas fa-crow"></i>`);
    setTimeout(peeker,100); 
  };
  // cleanup
  $('.target').removeClass('target');
  setTimeout(function(){$cover_active.removeClass('foreground')},1900);
}

//===game clock===//
const tick=()=>{
  if(game.time!==0 && game.time%2===0){
    paboi(locator(game.size));
//NOTE vv sweeps current bird from field vv
    setTimeout(function() {const birds = $('.bird').eq(0).remove()},1800);
    console.log(game.time);
  }
  document.getElementById('countdown').innerHTML= `${game.time}`;
  if(game.time<=0){
    clearInterval(gameClock);
    document.getElementById('countdown').innerHTML= `Time!`;
    if(game.round===1){
//NOTE calls scorecard
      tally(game.p1);
    }
    return
  };
  game.time -= 1;
};

const startClock=()=>{
  gameClock = setInterval(tick,1000);
}
//===Animation Speed Randomizer for funBirds===//
const speed=()=>{
  return game.aniSpeed[Math.floor(Math.random()*game.aniSpeed.length)];
}

//===Fun Animation for Splash and Score Screens===//
const funBirds =()=>{
  $('.bird').remove();
  for(let i=1;i<game.size;i+=Math.floor(Math.random()*(5 - 2 + 1) + 2)){
   paboi(i);
  };
  $.each($('.bird'), (elm)=>{
    $('.bird').eq(elm).addClass(`animated bounce infinite ${speed()}`);
  })
}

//===Sandbox===//NOTE ANIMATIONS
const spooker=()=>{
  const randSpook = game.spooks[Math.floor(Math.random()*game.spooks.length)];
  console.log(randSpook);
  return randSpook;
  //$('.dove').addClass(`${randSpook}`)
}
const peeker=()=>{
  const randPeek = game.peeks[Math.floor(Math.random()*game.peeks.length)]
  console.log(randPeek);
  //return randPeek;
//NOTE ALT function
  $('.crow').addClass(randPeek);
  setTimeout(function(){
    $('.crow').removeClass(randPeek)
  },1000);
}
const scooter=()=>{
  const randScoot = game.scoots[Math.floor(Math.random()*game.scoots.length)];
  console.log(randScoot);
  $('.kiwi').addClass(randScoot);
}
const startSplash=()=>{
  $('main').append(`<section id="startScreen" class="splash animated fadeIn delay-1s">
  <div class="logobar">
    <div class="tile"><i class="fas fa-crow" id='logo'></i></div>
    <h1>B I R D <i class="fas fa-binoculars"></i> S P O T T E R <span id="year">2020</span></h1>
  </div>
  <div class=menubar>
    <p>Click birds to spot them!</p>
    <p id="start">Start!</p>
  </div>
</section>`)
}
const tally=(player)=>{
  $('main').append(`<section id="killScreen"class="splash">
  <section class="ks-organize">
  <div class="sub-kill scoreboard">
    <p class="board-title">B I R D S&#160&#160S P O T T E D</p>
    <div id="p1Crows"></div>
    <div id="p1Doves"></div>
    <div id="p1Kiwis"></div>
  </div>
  <div class="sub-kill total">
    <p class="score-title">S C O R E <span class='colon'>:</span></p>
    <p class="score"></p>         
  </div>
  </section>
</section>`);


  funBirds()


  for(let i=player.crows;i>0;i--){
    setTimeout(function(){
      $('#p1Crows').append(`${game.crow}`);
      $('#p1Crows').children().addClass('score-bird animated zoomIn fast');
    },500);
  }
  for(let i=player.doves;i>0;i--){
    $('#p1Doves').append(`${game.dove}`);
    $('#p1Doves').children().addClass('score-bird animated zoomIn fast');
  }
  for(let i=player.kiwis;i>0;i--){
    $('#p1Kiwis').append(`${game.kiwi}`);
    $('#p1Kiwis').children().addClass('score-bird animated zoomIn fast');
  }

  $('.score').html(`${player.score}`).addClass('animated fadeIn')
}

//===Listeners===//

// start button
$('body').on('click', '#start', ()=>{
  $('#logo').addClass('animated bounce');
  $('#startScreen').toggleClass('fadeOut');
  $('.bird').remove();
  setTimeout(function(){$('#startScreen').remove()},2000);
//NOTE begins startclock, ticks
  startClock();
})
// Animate
$('#btn-animate').on('click', spooker);
// Timer
$('#btn-animate').on('click', spooker);
// Fun
$('#btn-fun').on('click', ()=>tally(game.p1));

// bird click listener
//FIXME condense these. CURRENTLY EXTREMELY WET.
$('body').on('mouseenter', '.crow', ()=>{
  console.log('crow click')
    game.p1.crows++;
    game.p1.score+=2;
})
$('body').on('mouseenter', '.dove', ()=>{
  console.log('dove click');
    game.p1.doves++;
    game.p1.score+=3

})
$('body').on('mouseenter', '.kiwi', ()=>{
  console.log('kiwi click')  
    game.p1.kiwis++;
    game.p1.score+=4;

})

//===AutoStart===//
buildField(game.size);
//funBirds();
//startSplash();








