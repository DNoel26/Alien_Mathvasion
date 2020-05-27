import Question from "./Business Logic Objects/questions_super.js";
import Sum_Question from "./Business Logic Objects/sum_questions_sub.js";
import Diff_Question from "./Business Logic Objects/difference_questions_sub.js"
import Gameplay_UI from "./UI Logic Objects/gameplayUI.js";

console.log("Game_App Linked")
    
const Main_Game =
{
    game_init()
    {
        Gameplay_UI.spaceships;
        Gameplay_UI.gamescreen;
        Gameplay_UI.gun;

        document.addEventListener("DOMContentLoaded",function(){

            //console.log(gameContainer.clientHeight);
            const Sum = new Sum_Question();
            const Diff = new Diff_Question();

            Sum.populate_correct_ans_sum();
            Sum.populate_incorrect_ans_arr_sum();
            Sum.select_correct_ans_position();
            console.log(Sum)
            let speed_test = 90;

            console.log(Gameplay_UI.populate_spaceship(Sum) + "TESTING POPULATE SPACESHIP")

            /*test.populate_correct_ans_sum();
            test.get_incorrect_ans_sum();
            test.populate_incorrect_ans_arr_sum();*/

            /*console.log("populated correct ans = " + test.populate_correct_ans_sum()) + console.log(test.correct_ans.first_num, test.correct_ans.second_num);
            console.log("returned incorrect ques = " + test.get_incorrect_ques_sum());
            console.log("populated incorrect ans = " + test.populate_incorrect_ans_arr_sum());

            console.log("correct ans after " + test.correct_ans.val)
            console.log("incorrect ans after " + test.incorrect_ans[0].val)
            console.log("incorrect ans after " + test.incorrect_ans[1].val)
            console.log("incorrect ans after " + test.incorrect_ans[2].val)
            console.log("incorrect ans after " + test.incorrect_ans[3].val)

            console.log("populated incorrect ans = " + JSON.stringify(test.incorrect_ans));*/

            //console.log(new Sum_Question().get_ans());



            let marginBottomPx=0;
            let marginTopPx=0;

            /*for(let i=0; i < spaceship.length; i++)
            {
                spaceship[i].style.backgroundColor = "blue";
                spaceship[i].style.marginBottom = 0;
                spaceship[i].style.marginTop = 0;
                
                rand_sum_block = document.createElement("h3");
                rand_sum_block.innerHTML = `${rand_first_num_generator()} + ${rand_second_num_generator()}`;

                spaceship[i].appendChild(rand_sum_block);

                const ship_margin = setInterval(function(){

                    //marginBottomPx-=1;
                
                    //spaceship[i].style.marginBottom = marginBottomPx + "px"; //Ask Kadeem how to get += to work here

                    marginTopPx+=1;

                    spaceship[i].style.marginTop = marginTopPx + "px"; //Ask Kadeem how to get += to work here

                    if(spaceship[i].style.marginTop == 500 + "px")
                    {
                        clearInterval(ship_margin);

                        document.location.reload();
                    }

                },(Math.random()*2 + speed_test)*10);
            }*/

            document.addEventListener("keydown",function(keypress){ // Gun control

                if(keypress.keyCode == 37)
                {
                    alert("Left click pressed")

                    //gun.style.marginRight = parseInt(gun.style.marginRight) + 10 + "px";
                }

                if(keypress.keyCode == 39)
                {
                    alert("Right click pressed")

                    //gun.style.marginLeft = parseInt(gun.style.marginLeft) + 10 + "px";
                }
            })

        });    
    }
}

Main_Game.game_init();

//export default Main_Game;