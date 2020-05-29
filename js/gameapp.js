import Question from "./Business Logic Objects/questions_super.js";
import Sum_Question from "./Business Logic Objects/sum_questions_sub.js";
import Diff_Question from "./Business Logic Objects/difference_questions_sub.js"
import Gameplay_UI from "./UI Logic Objects/gameplayUI.js";
import Boundaries from "./Business Logic Objects/boundaries.js";
import Speed_Controller from "./Business Logic Objects/speed_control.js";

console.log("Game_App Linked")
    
const Main_Game =
{
    game_init()
    {
        Gameplay_UI.spaceships;
        Gameplay_UI.gamescreen;
        Gameplay_UI.gun;
        console.log("Original Client height height of viewport is " + document.documentElement.clientHeight);
        console.log("Original Client width of viewport is " + document.documentElement.clientWidth);

        console.log("Original Client height of gamescreen section is " + Gameplay_UI.gamescreen.clientHeight);
        console.log("Original Client width of gamescreen section is " + Gameplay_UI.gamescreen.clientWidth);
        console.log("Original ClientRect for gamescreen ", Gameplay_UI.gamescreen.getBoundingClientRect());
        console.log("Original ClientRect for spaceships ", Gameplay_UI.spaceships[0].getBoundingClientRect());
        console.log("Original ClientRect for gun ", Gameplay_UI.gun.getBoundingClientRect());
        console.log("Original ClientRect for gun projectile ", Gameplay_UI.gun_projectile.getBoundingClientRect());

        document.addEventListener("DOMContentLoaded",function(){
            
            let ship_margin_top = [0,0,0,0,0];
            let projectile_margin_bottom = 0;
            let index = 0;

            //console.log(gameContainer.clientHeight);
            const Sum = new Sum_Question();
            const Diff = new Diff_Question();

            Sum.populate_correct_ans_sum();
            Sum.populate_incorrect_ans_arr_sum();
            Sum.select_correct_ans_position();
            console.log(Sum);
            
            console.log(Gameplay_UI.populate_spaceship(Sum) + "TESTING POPULATE SPACESHIP");
            Gameplay_UI.populate_gun(Sum);
            
            const timer_arr = [];
            const move_ship = function(ship_index)
            {
                //ship_margin_top += 10;

                Gameplay_UI.move_spaceships(ship_index, ship_margin_top[ship_index]);
                    
                let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[ship_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top);

                if(lose_check == true)
                {
                    clearInterval(1);

                    //alert("GAME OVER!!!");

                    document.location.reload();
                }  
            }

            //for(let index = 0; index < Gameplay_UI.spaceships.length; index++)          
            //timer_arr[0] = setInterval(function(){ //checks for spaceship to gun collision
                //console.log(timer_arr[0]);
                //ship_margin_top[0] += 10;
                
                //move_ship(0);
                /*for(index = 0; index < Gameplay_UI.spaceships.length; index++)
                {
                    Gameplay_UI.move_spaceships(index, ship_margin_top);
                    
                    let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top);

                    if(lose_check == true)
                    {
                        clearInterval(1);

                        //alert("GAME OVER!!!");

                        document.location.reload();
                    }  
                }*/
            //},Speed_Controller.spaceship_speed_ctrl(500));

            /*timer_arr[1] = setInterval(function(){

                console.log(timer_arr[1]);
                ship_margin_top[1] += 10;
                
                move_ship(1);
            },Speed_Controller.spaceship_speed_ctrl(2000))*/
            
            for(let interval_index = 0; interval_index < Gameplay_UI.spaceships.length; interval_index++)
            {
                const move_ship = setInterval(function(){
                    ship_margin_top[interval_index] += 1

                    Gameplay_UI.move_spaceships(interval_index, ship_margin_top);
                    
                    let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top);

                    if(lose_check == true)
                    {
                        clearInterval(move_ship);

                        //alert("GAME OVER!!!");
                        (Math.random()*1 + 5)*100
                        document.location.reload();
                    }  
                },Speed_Controller.spaceship_speed_ctrl((Math.random()*15 + 5)*1.5))
            }
            

            Gameplay_UI.gun.addEventListener("click",function(){ //checks for projectile to spaceship collision

                const move_projectile = setInterval(function(){

                    projectile_margin_bottom += 8
                    Gameplay_UI.move_projectile(projectile_margin_bottom)

                    let hit_check = Boundaries.check_collision(Gameplay_UI.spaceships[0].getBoundingClientRect().bottom, Gameplay_UI.gun_projectile.getBoundingClientRect().top + 16);

                    if(hit_check == true)
                    {
                        alert("UFO HIT!!!");
                        
                        clearInterval(move_projectile);

                        document.location.reload();
                    }

                },Speed_Controller.gun_projectile_speed_ctrl())
                

                
            });
        });
    }

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

        /*document.addEventListener("keydown",function(keypress){ // Gun control

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
        })*/
}

Main_Game.game_init();

//export default Main_Game;