# BIRD SPOTTER 2020

  Bird Spotter 2020 is my first project for General Assembly's SEI program.

## USER STORY

  Bird Spotter 2020 is an accuity / reflex game, similar to whack-a-mole and Duck Hunt. 

  A sample round of gameplay:
    
  (1) landing splash / title with brief objective desctiption (spot birds by clicking on them! spot as many as you can before time is up!) and 'start' button
    
    player clicks 'begin' button
    
  (2) field of play appears: 10x10 grid of various cover types is drawn in randomly. The type of cover determines what sort of bird may appear from behind it. 

  (3) Birds begin to emerge, one at a time. Timer begins counting down from 30. A bird emerges once every two seconds and each type of bird has specific behaviors. Crows will *peek* from behind trees, left or right. Doves will *spook* from bushes, diagonally up and left, straight up, or diagonally up and right. Kiwis will *hop* behind their cover and then *scoot* left or right. One bird will appear on screen at a time and leave / be removed before the next appears. 

  (4) Player attempts to mouseover as many birds as possible in 30 seconds.
  
  (5) When the countdown ends, a time up message appears. 
  
  (6) Score screen appears - visually displaying the birds the player spotted, and showing a top score and the player's current score.

    eg: ---------------------------------------
        BIRDS SPOTTED
        <crow><crow><crow><crow>
        <dove><dove><dove>
        <kiwi><kiwi>
        -------------+-------------------------
                              top:X score:Y | |
        ---------------------------------------

  (6) A button to the right of the score will start a new round and reset everything but the top score.

## Unsolved Problems

  (1) Asynchronous Loops - I didnt manage to include this, but I wanted the bird icons on the score screen to draw in one-by-one.
      I tried a couple of methods, but wasn't able to figure it out in time.
  
  (2) paboi()/funBirds() - these two functions don't interact the way I'd like them to - funBirds() uses paboi() ("Put a Bird on It") to 
      populate the board at semi-random intervals and then adds an Animate CSS bounce animation with one of three animation speeds to each
      bird. paboi() is also used by the main game loop to add birds to the board and call a semi-random animation for them. As a result, 
      funBirds() and paboi() both add their respective animations to the generated birds, at the same time. 
      
      I was lucky that Animate CSS animations seem to suppress vanilla CSS animations, or I'd have had a bigger problem on my hands. 
      Everything *works*, but I'd really like to keep paboi() from adding its animation classes when called by funBirds().

  (3) Design for Mobile - I based a lot of my CSS scale and dimensions on Veiw Height. This has unintended consequences when the view aperature 
      is taller than it is wide. Fixing requires entirely new CSS for the project. Doable, but not in the time allotted.
  
  (4) There are probably much cleaner ways to store and modify the Font Awesome bird icons I used. Most added classes are hard-coded.
  
## Technologies / Resources
  
  I used JavaScript and jQuery for game logic and DOM manipulation.

  I used CSS to write animations for the various in-game bird behaviors.

  I used Font Awesome's library of SVG icons to represent most dynamic elements on the game board.
    https://fontawesome.com/
  
  I used Animate CSS to provide polish to menu and page elements, and for the hopping animation that plays behind splash screens.
    https://daneden.github.io/animate.css/

  I used Google Fonts to source the Permanent Marker font, and Design Outside's National Park font. 
    https://nationalparktypeface.com/

## Wireframes

/images/P0_WF1.jpg
/images/P0_WF2.jpg
/images/P0_WF3.jpg
/images/P0_WF4.jpg
/images/P0_WF5.jpg

 
