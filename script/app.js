console.log('it a js')
//variables for adjusting the dials//

//game object
const game = {
  size:100,
  time:30,
  round:1,
  p1:{
    score:0,
    doves:3,
    crows:2,
    kiwis:1,
  },
  p2:{
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
    $('.target').append(`<i class="bird dove fas fa-dove"></i>`).addClass('animated shake faster');
    setTimeout(function(){$('.dove').addClass(`${spooker()}`)},100);
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird crow fas fa-crow"></i>`);
    setTimeout(function(){$('.crow').addClass(`${peeker()}`)},100); 
  };
  // cleanup
  $('.target').removeClass('target');
  setTimeout(function(){$cover_active.removeClass('foreground')},1900);
}

//===game clock===//
const tick=()=>{
  if(game.time!==0 && game.time%2===0){
    paboi(locator(game.size));
    //sweeps current bird from field
    setTimeout(function() {const birds = $('.bird').eq(0).remove()},1800);
    console.log(game.time);
  }
  document.getElementById('countdown').innerHTML= `${game.time}`;
  if(game.time<=0){
    clearInterval(gameClock);
    document.getElementById('countdown').innerHTML= `Time!`;
    if(game.round===1){
      tally(game.p1);
    }
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

//===Animation Speed Randomizer===//
const speed=()=>{
  return game.aniSpeed[Math.floor(Math.random()*game.aniSpeed.length)];
}
// populate birds for splash screen 

const funBirds =()=>{
  $('.bird').remove();
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
  console.log(randSpook);
  return randSpook;
  //$('.dove').addClass(`${randSpook}`)
}
const peeker=()=>{
  const randPeek = game.peeks[Math.floor(Math.random()*game.peeks.length)]
  console.log(randPeek);
  return randPeek;
}
const tally=(player)=>{
  $('main').append(`      <section id="killScreen"class="splash animated fadeIn delay-2s">
  <div class="sub-kill scoreboard">
    <p class="score-title">B I R D S . S P O T T E D</p>
    <div id="p1Crows"></div>
    <div id="p1Doves"></div>
    <div id="p1Kiwis"></div>
  </div>
  <div class="sub-kill total">
    <p class="score-title">S C O R E<span class='colon'>:</span></p>
    <p class="score"></p>         
  </div>
</section>`);
  for(let i=player.crows;i>0;i--){
    $('#p1Crows').append(`${game.crow}`);
    $('#p1Crows').children().addClass('score-bird');
  }
  for(let i=player.doves;i>0;i--){
    $('#p1Doves').append(`${game.dove}`);
    $('#p1Doves').children().addClass('score-bird');
  }
  for(let i=player.kiwis;i>0;i--){
    $('#p1Kiwis').append(`${game.kiwi}`);
    $('#p1Kiwis').children().addClass('score-bird');
  }
  // $('#p1Doves').html(`${game.p1.doves}`);
  // $('#p1Kiwis').html(`${game.p1.kiwis}`);
  $('.score').html(`${player.score}`).addClass('animated fadeIn')
}

//===Listeners===//

// start button
$('#start').on('click', ()=>{
  $('#logo').addClass('animated bounce');
  $('#startScreen').toggleClass('fadeOut');
  $('.bird').remove();
  setTimeout(function(){$('#startScreen').remove()},2000)
  startClock();
})
// bird bouncer
$('#btn-animate').on('click', spooker);
// clock listener
$('#btn-fun').on('click', ()=>tally(game.p1));

// bird click listener
//FIXME MAKE THESE ACCEPT ARGUMENTS IF YOU HAVE TIME. CURRENTLY EXTREMELY WET.
$('body').on('click', '.crow', ()=>{
  console.log('crow click')
  if(game.round===1){
    game.p1.crows++;
    game.p1.score+=4;
  };
  if(game.round===2){
    game.p2.crows++;
    game.p2.score+=4;
  };
})
$('body').on('click', '.dove', ()=>{
  console.log('dove click')
  if(game.round===1){
    game.p1.doves++
    game.p1.score+=6
  };
  if(game.round===2){
    game.p2.doves++;
    game.p2.doves+=6;
  };
})
$('body').on('click', '.kiwi', ()=>{
  console.log('kiwi click')
  if(game.round===1){
    game.p1.kiwis++;
    game.p1.score+=2;
  };
  if(game.round===2){
    game.p2.kiwis++
    game.p2.score+2
  };
})

//===AutoStart===//
funBirds();









