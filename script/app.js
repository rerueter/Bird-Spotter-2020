console.log('it a js')
//variables for adjusting the dials//

//game object
const game = {
  size:100,
  time:30,
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
  crow:`<i class="score-bird animated slideInTop fas fa-crow"></i>`,
  dove:`<i class="score-bird animated slideInTop fas fa-dove"></i>`,
  kiwi:`<i class="score-bird animated slideInTop fas fa-kiwi-bird"></i>`,
};
/*
NOTE ===Field Generator===
*/
const buildField=(size)=>{
  for(let i=1; i<=size; i++){
    let coverType = game.cover[Math.floor(Math.random()*3)]
    $('#game-field').append(`<div class="tile">${coverType}</div>`)
  };
};
/*
NOTE ===Game Clock=== 
*/
const tick=()=>{
  if(game.time!==0 && game.time%2===0){
    paboi(locator(game.size));
//sweeps current bird from field vv
    setTimeout(function() {const birds = $('.bird').eq(0).remove()},1800);
    console.log(game.time);
  }
  document.getElementById('countdown').innerHTML= `${game.time}`;
  if(game.time<=0){
    clearInterval(gameClock);
    document.getElementById('countdown').innerHTML= `Time!`;
  //calls scorecard
    tally(game.p1);
    return
  };

  game.time -= 1;
};

const startClock=()=>{
  gameClock = setInterval(tick,1000);
}
/*
NOTE ===Coordinate Number Gen for PABOI()===
*/
locator=(num)=>{
  return Math.floor(Math.random()*num)+1; //rndm based on num input
};

/*
NOTE ===Put a Bird On/Behind It===
*/
const paboi =(position)=>{
  const $target = $('.tile').eq(position).addClass('target'); //select tile element
  const $cover_active = $($target).children().eq(0); //select child cover element
  
  $cover_active.addClass('foreground'); //sets class to increase active cover z-index 
  
  //places bird according to cover type and adds randomized animation class
  if($cover_active.hasClass('rock')){
    $('.target').append(`<i class="bird scorable kiwi fas fa-kiwi-bird"></i>`);
    setTimeout(scooter,100);
  }else if($cover_active.hasClass('bush')){
    $('.target').append(`<i class="bird scorable dove fas fa-dove"></i>`);
    setTimeout(function(){$('.dove').addClass(`${spooker()}`)},100);
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird scorable crow fas fa-crow"></i>`);
    setTimeout(peeker,100); 
  };
  // cleanup
  $('.target').removeClass('target');
  setTimeout(function(){$cover_active.removeClass('foreground')},1900);
};

//===Animation Speed Randomizer for funBirds===//
const speed=()=>{
  return game.aniSpeed[Math.floor(Math.random()*game.aniSpeed.length)];
};

//===Fun Animation for Splash and Score Screens===//
const funBirds =()=>{
  for(let i=1;i<game.size;i+=Math.floor(Math.random()*(5 - 2 + 1) + 2)){
    paboi(i);
  };
  $.each($('.bird'), (elm)=>{
    $('.bird').eq(elm).addClass(`animated bounce infinite ${speed()}`).removeClass('crow kiwi dove');
  })
  $('.scorable').removeClass('scorable');
};

/*
NOTE ===Game Reset===
*/
const newGame=()=>{
  game.time=30;
  game.p1.crows=0;
  game.p1.doves=0;
  game.p1.kiwis=0;
  game.p1.score=0;
  $('#killScreen').addClass('animated fadeOut')
  $('#countdown').html('');
  $('.bird').remove();
  setTimeout(function(){
    $('.tile').remove();
    $('#killScreen').remove();
    buildField(game.size);
    startClock();
  },2000)
};

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
  $('.kiwi').addClass('hop');
  console.log($('.kiwi').css('transition'));
  setTimeout(function(){
    $('.kiwi').removeClass('hop')

    console.log($('.kiwi').css('transition'));
  },200);
  setTimeout(function(){
    $('.kiwi').css('transition','1s linear').addClass(randScoot);
  },400);
}
const startSplash=()=>{
  buildField(game.size);
  funBirds();
  $('main').append(`
    <section id="startScreen" class="splash animated fadeIn delay-1s">
      <section class='title'>
        <div class="logobar">
          <div class="tile sub-title"><i class="fas fa-crow" id='logo'></i></div>
          <h1 class="sub-title">B I R D <i class="fas fa-binoculars"></i> S P O T T E R <span id="year">2020</span></h1>
        </div>
        <div class="menubar sub-title">
          <p>Use your binoculars!</p>
          <p id="start">START!</p>
        </div>
      </section>
    </section>
  `);
};
const tally=(player)=>{
  $('main').append(`
    <section id="killScreen"class="splash animated fadeIn delay-1s">
      <section class="ks-organize">
        <div class="sub-kill scoreboard">
          <p class="board-title">B I R D S&#160&#160S P O T T E D <span class='colon'>:</span></p>
          <div id="p1Crows"></div>
          <div id="p1Doves"></div>
          <div id="p1Kiwis"></div>
        </div>
        <div class="total">
          <div class="total-div">
            <p class="score-title">TOP <span class='colon'>:</span></p>
            <p class="top-score">45</p>
            <p class="score-title">SCORE <span class='colon'>:</span></p>
            <p class="score"></p>
          </div>
          <div class="rp-div">
            <i class="rp-bins fas fa-binoculars"></i>
            <p class="replay">AGAIN!<p>  
          </div>       
        </div>
      </section>
    </section>
  `);

  scoreChecker();
  funBirds();

  for(let i=player.crows;i>0;i--){
    setTimeout(function(){
      $('#p1Crows').append(`${game.crow}`);
      // $('#p1Crows').children().addClass('score-bird animated slideInTop fast');
    },500);
  }
  for(let i=player.doves;i>0;i--){
    $('#p1Doves').append(`${game.dove}`);
    // $('#p1Doves').children().addClass('score-bird animated slideInTop fast');
  }
  for(let i=player.kiwis;i>0;i--){
    $('#p1Kiwis').append(`${game.kiwi}`);
    // $('#p1Kiwis').children().addClass('score-bird animated slideInTop fast');
  }

  $('.score').html(`${player.score}`).addClass('animated fadeIn')
};
const scoreChecker=()=>{
  if(game.p1.score>game.topScore){
    game.topScore=game.p1.score;
  };
  $('.top-score').html(`${game.topScore}`);
};


//===NOTE Listeners===//

// Start Button 
$('body').on('click', '#start', ()=>{
  $('#logo').addClass('animated bounce');
  $('#startScreen').toggleClass('fadeOut');
  $('.bird').remove();
  setTimeout(function(){
    $('#startScreen').remove()
    startClock();
  },2000);
})

// Replay Button
$('body').on('click','.replay', ()=>{
  $('.rp-bins').addClass('animated bounce');
  newGame();
});

/* 
NOTE bird click listener
*/

$("body").on('mouseover','.bird', function(event){
  var n = event.target.classList;
  // console.log(n)
  if(n.contains('bird')&&n.contains('scorable')){
    console.log('booya')
    if(n.contains('crow')){game.p1.crows++; game.p1.score+=2;};
    if(n.contains('dove')){game.p1.doves++; game.p1.score+=5;};
    if(n.contains('kiwi')){game.p1.kiwis++; game.p1.score+=10;};
    $(event.target).removeClass('scorable');
  };
});

//===AutoStart===//
// buildField(game.size);
//funBirds();
startSplash();








