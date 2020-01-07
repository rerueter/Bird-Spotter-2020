***===BIRD SPOTTER 2020===***

*///1///===MVP===///1///*

Bird Spotter 2020 is an accuity / reflex game, similar to whack-a-mole. 
Instead of a grid of holes, the field of play is a grid of bushes, trees, rocks, (hereafter referred to as "cover",) size of grid tbd.
Birds will emerge from behind cover and the player will click on them to "spot" them. 
There will be at least three types of bird, each worth points commensurate with the difficulty of clicking on them. 
A round will conclude at the end of a set period of time, and the total score will be displayed. 
The multiplayer aspect will involve players taking turns and the comparison of total scores. 
The field of play will be populated exclusively by icons from font awesome. I'm going for a specific look. 
Animations will likely involve the use of Animate CSS or another animation library. 

Bird types will be visually distinct, and will appear and move in specific ways: 
  1) *Peeking* from behind cover. The bird will emerge partially and pause exposed before retreating back behind their cover.
    - behavior for ground birds, represented by the Font Awesome "kiwi" icon. 
    - possible from Rock or Bush cover types
  2) *Spooking* The cover will shake momentarily, and then a bird will emerge and fly up through the top boundary of the field of play. 
    - flight type birds, represented by generic Font Awesome "bird" icon
    - possible from Bush or Tree cover types
    - spooked birds may fly directly up, or left or right at 45 degree angles
  3) *Flyby* At a random height, from either left or right, a bird will "fly" across the screen, on a flat horizontal plane. 
    - represented by the Font Awesome "dove" icon. 

  Rocks, Trees and Bushes will be represented by Font Awesome icons as well. 

Naming for types is not final. 

*///2///===USER STORY===///3///*

  A sample round of gameplay:
    
  (1) landing splash / title with brief objective desctiption (spot birds by clicking on them! spot as many as you can before time is up!) and 'begin' button
    
    player clicks 'begin' button
    
  (2) field of play appears. 10x10(size tbd) grid of various cover types is drawn in (randomly?) The type of cover determines what sort of bird may appear from behind it. 

  (3) after a brief countdown / ready? go! statement, birds begin to emerge, one at a time. timer begins counting down from 30. A bird emerges once every second (actual timing tbd). One bird will appear on screen at a time. 

    player attempts to click as many birds as possible
  
  (4) at end of countdown, time up message appears. 
  
  (5) time up message contains a table with a row for each type of bird is drawn in, populated with the number of birds spotted for each type. point total is displayed.
    eg: Peeks   (1pt)| <kiwi><kiwi><kiwi><kiwi>
        -------------+-------------------------
        Spooks (2pts)| <bird><bird><bird>
        -------------+-------------------------
        Flybys (3pts)| <dove><dove>
        -------------+-------------------------
         ===TOTAL=== | 4 + 6 + 6 = 16 points!

  (6) a prompt for player 2 to begin appears

    player 2 clicks 'begin' button

  (7) steps 3-5 repeat for player 2

  (8) a score comparison appears, naming the winner and prompting a new game 
  
*///3///===MILESTONES===///3///*

(1) Board Structure
  <a> build page skeleton with header, game area, etc. base html and css. 
  <b> create main gameplay grid / units for the construction of grid. make decision about static or dynamic board layout. 
    - advantages to dynamic: more varied gameplay, good practice to implement
    - advantages to static: more directed layout, aesthetic choices possible 
    - determine size
  <c> create schema for DOM manipulation, solidify naming conventions etc 

(2) Mechanics
  <a> write the the game's subcomponents
    - board population (if dynamic) 
    - timer
      - start condition
      - stop condition
      - call bird spawning function
    - bird spawning 
      - based on timer 'ticks'
      - based on 'cover' type
      - start by toggling the icons for cover with the icons of the birds
    - score keeping
  <b> build the on-click listeners


(3) Animation
  <a> get to grips with Animate CSS
  <b> build animations for specific cover + birds
    - figure out layering / what kind of z-axis stuff I'll need to do 
    - animation timings

(4) Connection
  <a> make sure the animations and on-click functions are working together
  <b> get result and score comparisons working
  <c> adjust gameplay values like animation speed, bird spawn frequency, etc to feel

(5) CSS / cleanup 
  <a> get into css and make things look nice

(6) stretch goals
  <a> visual polish, ie:
    - animation variants
    - create a scrolling effect so that the title screen pans down to the play field
    - nice transitions with score cards, etc. 
    - semi-random colorization for cover items, ie, 3 greens for bushes, 3 tones of grey for rocks
  <b> timers on the transitions as well, ie, on clicking 'begin': 3. 2. 1. Go!, etc. 
  <c> code cleanup / refactoring



  Per Kenny - JS Velocity animation library
  custom grid 
  grid css class
  flexbox
