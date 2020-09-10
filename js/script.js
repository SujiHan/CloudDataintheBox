$(document).ready(function() {
(function() {
  var box1 = $("#box1"),
    box2 = $("#box2"),
    box3 = $("#box3"),
    kick = $("#kick_jump"),
    startButton = $("#start_game"),
    messageBar = $("#msg_bd"),
    messageFinal= $('#msg_bd_result'),
    kickDropDownAnimationDelay = 1500,
    shuffleSpeed = 500,
    nuberOfShuffels = 15,
    z = 0;


  var ans = Math.floor(Math.random() * 3) + 1;

  startButton.on("click", function(event) {
    event.preventDefault();
    var kickInitialPosition = 0;
    //Show the character fist
    kick.show();
    // Show the message "Starting the game"
    // setMessage("Starting the game", "color_0");
    // Update the initial position based on the answer
    kickInitialPosition = 68 + ((ans - 1) * 280);

    // Move kick Under the relative box based on answer
    kick.css({
      left: kickInitialPosition + "px"
    });

    // Droping kick from the top into the box.
    kick.animate({
      top: "200px" //상자 안 오브젝트 위치
    }, {
      duration: kickDropDownAnimationDelay,
      specialEasing: {
        top: 'easeOutBounce'
      },
      complete: function() {
        kick.html("<img src='img/kick_smile.png' alt='' />");
        kick.animate({
          top: "200px" //상자 안 오브젝트 위치
        }, {
          duration: 500,
          specialEasing: {
            top: 'easeInQuint'
          },
          complete: function() {
            // setMessage("Closing the boxes ;)")

            // Close all the three boxes in a regular interval.
            box1.delay(500).queue(function(n) {
              $(this).html("<img src='img/box_c1.png' alt='' />");
              if(ans == 1) kick.hide();
              n();
            });
            box2.delay(1000).queue(function(n) {
              $(this).html("<img src='img/box_c1.png' alt='' />");
              if(ans == 2) kick.hide();
              n();
            });
            box3.delay(1500).queue(function(n) {
              $(this).html("<img src='img/box_c1.png' alt='' />");
              if(ans == 3) kick.hide();


              var box1_left = box1.position().left,
                box2_left = box2.position().left,
                box3_left = box3.position().left,
                box_top = box3.position().top;

              box1.css({
                position: "absolute",
                top: box_top + "px",
                left: box1_left + "px"
              });

              box2.css({
                position: "absolute",
                top: box_top + "px",
                left: box2_left + "px"
              });

              box3.css({
                position: "absolute",
                top: box_top + "px",
                left: box3_left + "px"
              });

              shuffle = function(o) { //v1.0
                for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
              };

              var interval = setInterval(function() {

                // setMessage("Shuffling ....");



                var array = shuffle([1, 2, 3]);

                $("#box" + array[0]).animate({
                  left: $("#box" + array[1]).position().left + "px"
                }, {
                  duration: shuffleSpeed / 2,
                  specialEasing: {
                    left: 'easeInQuint'
                  }
                });

                $("#box" + array[1]).animate({
                  left: $("#box" + array[0]).position().left + "px"
                }, {
                  duration: shuffleSpeed / 2,
                  specialEasing: {
                    left: 'easeInQuint'
                  }
                });


              }, shuffleSpeed);


              setTimeout(function() {
                clearInterval(interval);
                var flag = 0;
                $('div[id^="box"]').css("cursor", "pointer");
                // setMessage("Click on the box, that you think Mr Kick is hidden >> :p")

                box1.click(function() {
                  if(flag == 0) {
                    $(this).html('<img src="img/box_o_t1.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="img/box_o_b1.png" id="box_o_b" alt="">');
                    if(ans == 1) {
                      kick.css({
                        left: $(this).position().left + 46 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      print_error();
                      flag = 1;
                    }
                  }
                });

                box2.click(function() {
                  if(flag == 0) {
                    $(this).html('<img src="img/box_o_t1.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="img/box_o_b1.png" id="box_o_b" alt="">');
                    if(ans == 2) {
                      kick.css({
                        left: $(this).position().left + 46 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      flag = 1;
                      print_error();
                    }
                  }
                });

                $("#box3").click(function() {
                  if(flag == 0) {
                    $(this).html('<img src="img/box_o_t1.png" id="box_o_t" alt="">');
                    $(this).append(' <img src="img/box_o_b1.png" id="box_o_b" alt="">');
                    if(ans == 3) {
                      kick.css({
                        left: $(this).position().left + 46 + "px"
                      });
                      flag = 1;
                      slide_out();
                    } else {
                      flag = 1;
                      print_error();
                    }
                  }
                });


                function slide_out() {
                  setMessage("<a href='index.html' >Try again</a>", "color_2");
                  kick.show();
                  kick.animate({
                    top: "200px"
                  }, {
                    duration: 500,
                    specialEasing: {
                      top: 'easeInQuint'
                    }
                  });

                }

                function print_error() {
                  setMessage("<a href='index.html'>Delete more</a>", "color_1");
                }



              }, nuberOfShuffels * shuffleSpeed);
              n();
            });
          }
        });
      }
    });
  });

  function setMessage(message, color) {
    messageFinal.html(message).addClass(color);
  }

})();


});
