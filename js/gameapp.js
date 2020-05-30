import Question from "./Business Logic Objects/questions_super.js";
import Sum_Question from "./Business Logic Objects/sum_questions_sub.js";
import Diff_Question from "./Business Logic Objects/difference_questions_sub.js"
import Gameplay_UI from "./UI Logic Objects/gameplayUI.js";
import Boundaries from "./Business Logic Objects/boundaries.js";
import Speed_Controller from "./Business Logic Objects/speed_control.js";
import Sound from "./UI Logic Objects/soundUI.js";

console.log("Game_App Linked")
console.log(new KeyboardEvent('keydown'))
    
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
        console.log("Original ClientRect for spaceship 1 ", Gameplay_UI.spaceships[0].getBoundingClientRect());
        console.log("Original ClientRect for spaceship 2 ", Gameplay_UI.spaceships[1].getBoundingClientRect());
        console.log("Original ClientRect for spaceship 3 ", Gameplay_UI.spaceships[2].getBoundingClientRect());
        console.log("Original ClientRect for spaceship 4 ", Gameplay_UI.spaceships[3].getBoundingClientRect());
        console.log("Original ClientRect for spaceship 5 ", Gameplay_UI.spaceships[4].getBoundingClientRect());
        console.log("Original ClientRect for gun ", Gameplay_UI.gun.getBoundingClientRect());
        console.log("Original ClientRect for gun projectile ", Gameplay_UI.gun_projectile.getBoundingClientRect());

        document.addEventListener("DOMContentLoaded",function(){
            
            let ship_margin_top = [0,0,0,0,0]; //unit in %
            let projectile_margin_bottom = 0; //unit in %
            let gun_margin_left = 0; //unit in %
            let index = 0;

            const bg_music = new Sound("../media/Deep_Torvus_3_trim_1.mp3","bg_audio");
            bg_music.add_sound();
            bg_music.play_music();

            const hit_sound = new Sound("../media/ship_hit.mp3","hit_sound");
            hit_sound.add_sound();

            const game_over_sound = new Sound("../media/game_over_2.mp3","game_over_sound");
            game_over_sound.add_sound();

            const Sum = new Sum_Question();
            const Diff = new Diff_Question();

            Sum.populate_correct_ans_sum();
            Sum.populate_incorrect_ans_arr_sum();
            Sum.select_correct_ans_position();
            console.log(Sum);
            
            Gameplay_UI.populate_spaceship(Sum);
            Gameplay_UI.populate_gun(Sum);
            
            // ---------- GAME APP / MAIN GAME FUNCTIONS BELOW HERE ---------- //
            
            function set_int_spaceships()
            {
                for(let interval_index = 0; interval_index < Gameplay_UI.spaceships.length; interval_index++) //moves spaceships down
                {
                    const move_ship = setInterval(function(){
                        
                        ship_margin_top[interval_index] += 1;

                        Gameplay_UI.move_spaceships(interval_index, ship_margin_top);
                        
                        let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top);

                        if(lose_check == true)
                        {
                            clearInterval(move_ship);

                            document.removeEventListener("keydown", event_gun_keydown);
                            Gameplay_UI.gamescreen.removeEventListener("click", event_gun_click);

                            Gameplay_UI.gamescreen.children[5].style.visibility = "hidden";
                            
                            for(let i=0; i < 6; i++)
                            {
                                Gameplay_UI.gamescreen.children[i].children[0].style.visibility = "hidden";
                                Gameplay_UI.gamescreen.children[i].style.cursor = "initial";
                            }
                            
                            //alert("GAME OVER!!!");

                            Gameplay_UI.gamescreen.style.backgroundImage = 'url("../img/game_over_explosion_gif.gif")';

                            bg_music.pause_music();

                            setTimeout(function(){

                                game_over_sound.play_music();  
                            },2000);
                            
                            setTimeout(function(){

                                document.location.reload();
                            },5000);
                        };
                        
                        //console.log("Shifting ClientRect for spaceships ", Gameplay_UI.spaceships[0].getBoundingClientRect());
                        //console.log("Shifting ClientRect for gun ", Gameplay_UI.gun.getBoundingClientRect());
            
                    },Speed_Controller.spaceship_speed_ctrl()); //this for loop controls speeds of spaceships
                }; 
            }

            function set_int_projectile() //to be used in spacebar press and mouse click events
            {
                projectile_margin_bottom = 0;
                
                const move_projectile = setInterval(function(){

                    projectile_margin_bottom += 0.2; //unit in %
                    Gameplay_UI.fire_projectile(projectile_margin_bottom);

                    document.removeEventListener("keydown", event_gun_keydown);
                    Gameplay_UI.gamescreen.removeEventListener("click", event_gun_click);

                    let hit_check = false;
                    let within_bounds_check = false;

                    for(let hit_index = 0; hit_index < Gameplay_UI.spaceships.length; hit_index++)
                    {
                        hit_check = Boundaries.check_collision(Gameplay_UI.spaceships[hit_index].getBoundingClientRect().bottom, Gameplay_UI.gun_projectile.getBoundingClientRect().top + 144);
                    
                        if(hit_check == true)
                        {
                            break;
                        }
                    }

                    within_bounds_check = Boundaries.check_within_bounds(Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().left, Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().right, Gameplay_UI.gun_projectile.getBoundingClientRect().left, Gameplay_UI.gun_projectile.getBoundingClientRect().right);
                    
                    if(hit_check == true)
                    {
                        //alert("UFO HIT!!!");
                        
                        clearInterval(move_projectile);

                        //document.location.reload();

                        Gameplay_UI.reset_projectile();

                        Gameplay_UI.depopulate_spaceship();
                        Gameplay_UI.depopulate_gun();
                        
                        Sum.populate_correct_ans_sum();
                        Sum.populate_incorrect_ans_arr_sum();
                        Sum.select_correct_ans_position();
                        console.log(Sum);
            
                        Gameplay_UI.populate_spaceship(Sum);
                        Gameplay_UI.populate_gun(Sum);

                        //Gameplay_UI.populate_spaceship(new Sum_Question());
                        Gameplay_UI.gamescreen.addEventListener("click", event_gun_click);
                        document.addEventListener("keydown", event_gun_keydown);
                    }

                    if(within_bounds_check == true && hit_check == true)
                    {
                        //alert("RIGHT ANSWER!!!");
                        hit_sound.play_music();

                        Gameplay_UI.reset_spaceships();
                        ship_margin_top = [0,0,0,0,0];  
                    };

                },Speed_Controller.gun_projectile_speed_ctrl());    
            }; //function for firing projectile

            function event_gun_keydown(event)
            {
                console.log(event);

                let out_of_bounds_check_left = Boundaries.check_collision(Boundaries.check_remaining_distance_left(), Gameplay_UI.gun.getBoundingClientRect().left);

                let out_of_bounds_check_right = Boundaries.check_collision(Gameplay_UI.gun.getBoundingClientRect().right, Boundaries.check_remaining_distance_right());

                if(event.key == "ArrowLeft")
                {
                    //alert("Left arrow pressed!")
                    if(out_of_bounds_check_left == true)
                    {
                        //alert("Gamescreen OOB left!");

                        gun_margin_left += 48;

                        Gameplay_UI.move_gun(gun_margin_left);
                    }

                    else
                    {
                        gun_margin_left -= 12;

                        Gameplay_UI.move_gun(gun_margin_left);
                    }; 
                };

                if(event.key == "ArrowRight")
                {
                    //alert("Right arrow pressed!");
                    if(out_of_bounds_check_right == true)
                    {
                        //alert("Gamescreen OOB right!");

                        gun_margin_left -= 48;

                        Gameplay_UI.move_gun(gun_margin_left);
                    }
                    
                    else
                    {
                        gun_margin_left += 12;

                        Gameplay_UI.move_gun(gun_margin_left);  
                    };
                };

                if(event.key == " ")
                {
                    //alert("Spacebar pressed!")

                    set_int_projectile(); 
                };

                console.log("ClientRect for gun after move ", Gameplay_UI.gun.getBoundingClientRect());
            }; //function for moving gun/projectile left and right and shooting projectile

            function event_gun_click(event)
            {
                const element = event.target;

                if(element.className == "spaceship")
                {
                    Gameplay_UI.reset_gun(); // ----- ASK KADEEM WHY 0 WORKS HERE -----
                };

                for(let click_index = 1; click_index < Gameplay_UI.spaceships.length + 1; click_index++)
                {                   
                    
                    if(element.id == `ship_${click_index}`)
                    {                                              
                        gun_margin_left = 21 + (click_index - 1)*12;
                                                               
                        Gameplay_UI.click_position_gun(gun_margin_left);

                        set_int_projectile();
                    }  
                };

                /*if(element.className == "spaceship")
                {
                    console.log(event.target);  
                    
                    alert("clicked!")

                    projectile();
                }*/     
            }; //function for moving gun/projectile and shooting projectile simultaneously on mouse click/screentouch

            // ---------- GAME APP / MAIN GAME FUNCTIONS ABOVE HERE ---------- //
            
            set_int_spaceships();

            document.addEventListener("keydown", event_gun_keydown); //keyboard events

            Gameplay_UI.gamescreen.addEventListener("click", event_gun_click); //code for clicking or touching spaceships and firing projectile simultaneously

            Gameplay_UI.gun.addEventListener("click", set_int_projectile); //checks for projectile to spaceship collision 
            //click gun to fire projectile at current position 
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