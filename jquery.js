var playing = false;
var score;
var trials;
var step;
var action;  //used for set interval function

$(function () {

    //click on start reset button
    $("#startreset").click(function () {
        if (playing == true) {    //we are playing
            location.reload();  //reload page
        } else {                 //we arent playing
            playing = true;  //game initiated
            score = 0;      //set score to 0
            $("#scorevalue").html(score);
            $("#trialsLeft").show();    //show trials left
            $("#gameTitle").hide();
            trials = 3;
            addHearts();
            //hide game over box
            $("#gameover").hide();
            //change button text
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });

    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score);   //update the score
        // document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); //play sound

        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 500);  //slicing the fruit

        //send new fruit
        setTimeout(startAction, 800);
    });

    //populating trials left
    function addHearts() {
        $("#trialsLeft").empty();
        for (i = 0; i < trials; i++) {
            $("#trialsLeft").append('<img src="images/heart.png" class="life"> ');
        }
    }

    function startAction() {
        $("#fruit1").show();   //generate a fruit
        chooseFruit();      //choose a random fruit
        $("#fruit1").css({ 'left': (550 * Math.random()), 'top': -50 }); //random position

        //generate a random step
        step = 1 + Math.round(5 * Math.random());  //change step

        //move fruit down by one step every 10ms
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit by one step

            //check if fruit is too low
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                //check if any trials left
                if (trials > 1) {
                    $("#fruit1").show();   //generate a fruit
                    chooseFruit();      //choose a random fruit
                    $("#fruit1").css({ 'left': (550 * Math.random()), 'top': -50 }); //random position

                    //generate a random step
                    step = 1 + Math.round(5 * Math.random());  //change step
                    trials--;  //reduce trials by one
                    addHearts();   //populate trials left box
                }
                else {   //game over
                    playing = false;   //we are not playing anymore
                    $("#startreset").html("Start Game");   //change button to Start Game
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your Score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    //generate a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/fruit' + (1 + Math.round(8 * Math.random())) + '.jpg');
    }

    //stop dropping fruit
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }

});