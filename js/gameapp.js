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

        //document.addEventListener("DOMContentLoaded",function(){
            
            //let ship_margin_top = [0,0,0,0,0]; //unit in %
            let projectile_margin_bottom = 0; //unit in %
            let gun_margin_left = 0; //unit in %
            let index = 0; 
            let bg_vol_ctrl = 0.3; 
            const no_reset_move = ""; //generic variable to be declared in Gameplay_UI.reset_spaceships() method, prevents ships from returning to the top on reset

            let spaceship_interval_id = [];

            const Bg_Music = new Sound("../media/Deep_Torvus_3_trim_1.mp3","bg_audio_1");
            Bg_Music.add_sound();
            Bg_Music.audio_control.loop = true;
            Bg_Music.audio_control.volume = bg_vol_ctrl;

            const Bg_Music_2 = new Sound("../media/Phendrana_Depths_Remix_trim_1.mp3","bg_audio_2");
            Bg_Music_2.add_sound();
            Bg_Music_2.audio_control.loop = true;
            Bg_Music_2.audio_control.volume = bg_vol_ctrl-0.1;   

            const Fire_Projectile_Sound = new Sound("../media/fire_projectile_trim.mp3","fire_projectile_sound");
            Fire_Projectile_Sound.add_sound();

            const Hit_Sound = new Sound("../media/ship_hit.mp3","hit_sound");
            Hit_Sound.add_sound();

            const Miss_Sound = new Sound("../media/incorrect_ans_trim.mp3","miss_sound");
            Miss_Sound.add_sound();

            const Game_Over_Sound = new Sound("../media/game_over_2.mp3","game_over_sound");
            Game_Over_Sound.add_sound();

            const Sum = new Sum_Question();
            const Diff = new Diff_Question();
            
            rand_bg_music_sel();  

            start_sum_population(); 

            //start_diff_population();

            // ---------- GAME APP / MAIN GAME FUNCTIONS BELOW HERE ---------- //
            
            function rand_bg_music_sel()
            {
                let sel = Math.floor(Math.random()*2 + 1);

                if(sel == 1)
                {
                    Bg_Music.play_music(); //----------AUDIO---
                    Bg_Music.audio_control.style.display = "initial"
                }

                else if(sel == 2)
                {
                    Bg_Music_2.play_music(); //----------AUDIO---
                    Bg_Music_2.audio_control.style.display = "initial" 
                }
            };

            function start_sum_population()
            {
                Sum.populate_correct_ans_sum();
                Sum.populate_incorrect_ans_arr_sum();
                Sum.select_correct_ans_position();
                console.log(Sum);
                
                Gameplay_UI.populate_spaceship(Sum);
                Gameplay_UI.populate_gun(Sum);  
            };
            
            function start_diff_population()
            {
                Sum.populate_correct_ans_sum();
                Sum.populate_incorrect_ans_arr_sum();
                Sum.select_correct_ans_position();
                console.log(Sum);
    
                Gameplay_UI.populate_spaceship(Sum);
                Gameplay_UI.populate_gun(Sum);
            };

            function depopulate_all() 
            {
                Gameplay_UI.reset_projectile();

                Gameplay_UI.depopulate_spaceship();
                Gameplay_UI.depopulate_gun();
            };

            function fire_rate_stop() //stops all gunner functionalities for the user
            {
                document.removeEventListener("keydown", event_gun_keydown);
                Gameplay_UI.gamescreen.removeEventListener("mousedown", event_gun_click);
                Gameplay_UI.gun.removeEventListener("mousedown", set_int_projectile);
            };

            function fire_rate_restart() //restarts all gunner functionalities for the user
            {
                document.addEventListener("keydown", event_gun_keydown);
                Gameplay_UI.gamescreen.addEventListener("mousedown", event_gun_click); 
                Gameplay_UI.gun.addEventListener("mousedown", set_int_projectile);
            };

            function set_int_spaceships() //main gameplay timer start and end function
            {
                let ship_margin_top = [0,0,0,0,0];
                fire_rate_restart(); 
                
                for(let interval_index = 0; interval_index < Gameplay_UI.spaceships.length; interval_index++) //moves spaceships down
                {
                    set_int_spaceships_internal(interval_index);
                }

                function set_int_spaceships_internal(interval_index)
                {
                    spaceship_interval_id[interval_index] = setInterval(function(){
                        
                        ship_margin_top[interval_index] += 1;

                        Gameplay_UI.move_spaceships(interval_index, ship_margin_top); //ship_margin_top index is called within function
                        
                        let stop_user_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top)

                        if(stop_user_check == true)
                        {
                            fire_rate_stop();    
                        }

                        let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top+24);

                        if(lose_check == true)
                        {
                            clearInterval(spaceship_interval_id[interval_index]);

                            fire_rate_stop();

                            Gameplay_UI.gamescreen.children[5].style.visibility = "hidden";
                            
                            for(let i=0; i < Gameplay_UI.spaceships.length; i++)
                            {
                                Gameplay_UI.gamescreen.children[i].children[0].style.visibility = "hidden";
                                Gameplay_UI.gamescreen.children[i].style.cursor = "initial";
                            }
                            
                            //alert("GAME OVER!!!");

                            Gameplay_UI.gamescreen.style.backgroundImage = 'url("../img/game_over_explosion_gif.gif")';

                            //Bg_Music.pause_music(); //----------AUDIO---

                            /*let game_over_timer_1 = new Promise(function(resolve){

                                setTimeout(function(){

                                    console.log("HELLO A A A");
                                    //Game_Over_Sound.play_music(); //----------AUDIO--- 
                                    resolve();
                                },2000);
                            })
                            
                            game_over_timer_1.then(function(){

                                let game_over_timer_2 = new Promise(function(resolve){
                                
                                    setTimeout(function(){
    
                                        console.log("HELLO B B B")
    
                                        resolve();
    
                                        
                                    },5000);
                                }) 
                            });

                            game_over_timer_2.then(function(){

                                document.location.reload();  
                            })*/

                        };
                        
                        //console.log("Shifting ClientRect for spaceships ", Gameplay_UI.spaceships[0].getBoundingClientRect());
                        //console.log("Shifting ClientRect for gun ", Gameplay_UI.gun.getBoundingClientRect());

                    },Speed_Controller.spaceship_speed_ctrl(50)); //this for loop controls speeds of spaceships
                }; 
            };    
                
            function set_int_projectile() //to be used in spacebar press and mouse click events
            {
                projectile_margin_bottom = 0;
                let hit_check = false;
                let within_bounds_check = false;
                Fire_Projectile_Sound.play_music(); //----------AUDIO---

                const projectile_interval_id = setInterval(function(){

                    projectile_margin_bottom += 0.5; //unit in %
                    Gameplay_UI.fire_projectile(projectile_margin_bottom);

                    fire_rate_stop();

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
                        clearInterval(projectile_interval_id);

                        //document.location.reload();

                        depopulate_all();
                        
                        start_sum_population();

                        fire_rate_restart();
                    }

                    if(within_bounds_check == false && hit_check == true)
                    {
                        Gameplay_UI.incorrect_ship_hit();

                        Miss_Sound.play_music(); //----------AUDIO---

                        setTimeout(function(){

                            Gameplay_UI.reset_spaceships(no_reset_move);
                        },500)
                    }

                    if(within_bounds_check == true && hit_check == true)
                    {
                        Gameplay_UI.correct_ship_hit();
 
                        //alert("RIGHT ANSWER!!!");
                        Hit_Sound.play_music(); //----------AUDIO---
                        for(let int_index = 0; int_index < Gameplay_UI.spaceships.length; int_index++)
                        {
                            clearInterval(spaceship_interval_id[int_index]); 
                        };

                        function explosion() { //resets ships after explosion timer expires

                            return new Promise(function(resolve){

                                setTimeout(resolve,700);

                            }).then(function(){

                                //alert("TIME DONE")
                                
                                fire_rate_stop(); 

                                Gameplay_UI.reset_spaceships();
                        
                                set_int_spaceships(); 
                            })
                        };

                        explosion();                       
                    };

                },Speed_Controller.gun_projectile_speed_ctrl());    
            }; //function for firing projectile

            function event_gun_keydown(event) //controls the gun with the keyboard and checks for out of bounds
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

            function event_gun_click(event) //On mouse click, moves both the gun and fires the projectile simulaneously
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
  
            }; //function for moving gun/projectile and shooting projectile simultaneously on mouse click/screentouch

            // ---------- GAME APP / MAIN GAME FUNCTIONS ABOVE HERE ---------- //
            
            set_int_spaceships();

            document.addEventListener("keydown", event_gun_keydown); //keyboard events

            Gameplay_UI.gamescreen.addEventListener("mousedown", event_gun_click); //code for clicking or touching spaceships and firing projectile simultaneously

            Gameplay_UI.gun.addEventListener("mousedown", set_int_projectile); //checks for projectile to spaceship collision 
            //click gun to fire projectile at current position 
        //}); //----- END OF DOCUMENT LOAD LISTENER -----//
    }
}

setTimeout(Main_Game.game_init,1000);

export default Main_Game;