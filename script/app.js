console.log('it a js')
//game object
const game = {
  cover:['<i class="rock fas fa-mountain"></i>','<i class="tree fas fa-tree"></i>','<i class="bush fas fa-spa"></i>'],
};

// field generator
const buildField=(size)=>{
  for(let i=1; i<=size; i++){
    let coverType = game.cover[Math.floor(Math.random()*3)]
    $('#game_field').append(`<div class="cover">${coverType}</div>`)
  };
};
buildField(100);

// put a bird on (behind) it
const paboi =()=>{
  // generates a random number between 0 and 99 corresponding to grid indexes
  const position = Math.floor(Math.random()*100);
  // uses position to select .cover element to act upon
  const $target = $('.cover').eq(position).addClass('target')
  const $cover_active = $($target).children().eq(0);
  // console.log($target);
  if($cover_active.hasClass('rock')){
    $('.target').append(`<i class="bird crow fas fa-crow"></i>`); 
  }else if($cover_active.hasClass('bush')){
    $('.target').append(`<i class="bird dove fas fa-dove"></i>`)
  }else if($cover_active.hasClass('tree')){
    $('.target').append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`)
  }
  $('.target').removeClass('target');
}
paboi();

// animation tester - getting to grips w animate css
$('#btn-animate').on('click', ()=>{
  $('.crow').toggleClass('animated bounce infinite');
  $('.dove').toggleClass('animated bounceOutUp slower');
  $('.kiwi').toggleClass('animated shake slower infinite');
});

// actually a nightmare, not fun. 
const funBirds =()=>{
  for(let i=0; i<100; i++){
    if($('.cover').eq(i).children().eq(0).hasClass('rock')){
      $('.cover').eq(i).append(`<i class="bird crow fas fa-crow"></i>`)
    }else if($('.cover').eq(i).children().eq(0).hasClass('bush')){
      $('.cover').eq(i).append(`<i class="bird dove fas fa-dove"></i>`)
    }else if($('.cover').eq(i).children().eq(0).hasClass('tree')){
      $('.cover').eq(i).append(`<i class="bird kiwi fas fa-kiwi-bird"></i>`)
    }
  }
}