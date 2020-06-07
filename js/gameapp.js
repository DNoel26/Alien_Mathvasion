import Question from "./Business Logic Objects/questions_super.js";
import Sum_Question from "./Business Logic Objects/sum_questions_sub.js";
import Diff_Question from "./Business Logic Objects/difference_questions_sub.js"
import Gameplay_UI from "./UI Logic Objects/gameplayUI.js";
import Boundaries from "./Business Logic Objects/boundaries.js";
import Speed_Controller from "./Business Logic Objects/speed_control.js";
import Sound from "./UI Logic Objects/soundUI.js";
import Input_Device from "./Database Logic Objects/input_device.js";
import Timer from "./Business Logic Objects/timer.js";
import Game_Rules from "./Business Logic Objects/game_rules.js";
import Player from "./Business Logic Objects/player.js";

console.log("Game_App Linked");

const Main_Game =
{
    game_init()
    {
        document.addEventListener("DOMContentLoaded",function(){   

            Gameplay_UI.restart_button.addEventListener("click", function(){

                let restart_msg = confirm("Game paused. Press OK to restart or cancel to resume");

                if(restart_msg == true)
                {
                    let confirm_restart_msg = confirm("Are you sure you want to restart?")
                    if(confirm_restart_msg == true)
                    {
                        document.location.reload();
                    }

                    else
                    {
                        event.preventDefault();
                        alert("Resuming game..."); 
                    }
                }

                else
                {
                    event.preventDefault();
                    alert("Resuming game...");
                }             
            });
            
            Gameplay_UI.end_button.addEventListener("click", function(){
                
                let end_msg = confirm("Return to homepage?");
                if(end_msg == true)
                {
                    let confirm_end_msg = confirm("Are you sure you want to end game and return to homepage?")
                    if(confirm_end_msg == true)
                    {
                        location.href = "../index.html";        
                    }   

                    else
                    {
                        alert("Resuming game...");
                        event.preventDefault();
                    }
                }

                else
                {
                    alert("Resuming game...");
                    event.preventDefault();
                }
            });
            
            document.addEventListener("click", function(event){
            
                const element = event.target;
        
                if(element.id == "save_exit_report_button")
                {
                    document.location.reload();    
                }
            });
            
            // -------------------- DOCUMENT EVENT LISTENERS ABOVE HERE ------------------- //

            let game_test_speed = ""; //Default value should be set to "". Otherwise, controls spaceship movement speed for testing.
            // ---------- LOAD AUDIO BELOW HERE ---------- //

            let bg_vol_ctrl = 0.15; //Controls background audio volume. Default volume set to 0.3 

            const Bg_Music = new Sound("../media/Deep_Torvus_3_trim_1.mp3","bg_audio_1");
            Bg_Music.add_sound();
            Bg_Music.audio_control.loop = true;
            Bg_Music.audio_control.volume = bg_vol_ctrl+0.1;

            const Bg_Music_2 = new Sound("../media/Phendrana_Depths_Remix_trim_1.mp3","bg_audio_2");
            Bg_Music_2.add_sound();
            Bg_Music_2.audio_control.loop = true;
            Bg_Music_2.audio_control.volume = bg_vol_ctrl;
            
            const Bg_Music_3 = new Sound("../media/Brinstar_Plant_Overgrowth.mp3","bg_audio_3");
            Bg_Music_3.add_sound();
            Bg_Music_3.audio_control.loop = true;
            Bg_Music_3.audio_control.volume = bg_vol_ctrl;

            const Alien_theme = new Sound("../media/alien_spaceship_start_theme.mp3","bg_audio_theme");
            Alien_theme.add_sound();
            Alien_theme.audio_control.loop = true;
            Alien_theme.audio_control.volume = 0.1;

            const Fire_Projectile_Sound = new Sound("../media/fire_projectile_trim.mp3","fire_projectile_sound");
            Fire_Projectile_Sound.add_sound();

            const Hit_Sound = new Sound("../media/ship_hit.mp3","hit_sound");
            Hit_Sound.add_sound();

            const Miss_Sound = new Sound("../media/incorrect_ans_trim.mp3","miss_sound");
            Miss_Sound.add_sound();

            const Game_Over_Sound = new Sound("../media/game_over_2.mp3","game_over_sound");
            Game_Over_Sound.add_sound();

            const Countdown_Sound = new Sound("../media/countdown_5_to_1","countdown_sound");
            Countdown_Sound.add_sound();

            // ---------- LOAD AUDIO ABOVE HERE ---------- //

            // ---------- FUNCTIONS BELOW HERE ----------//

            function load_level_1() //---------- Main function to load game into level 1
            {
                level_1_pro_obj = new Promise(function(resolve){
                    
                    Gameplay_UI.display_level_popup();
                    setTimeout(resolve,load_time);
                })
                .then(function level_1_play(){

                    Game_Rules.set_game_loaded();

                    Player_1.get_score();
                    Player_1.get_high_score();
                    Player_1.get_max_combo();
                    Player_1.get_total_hit_miss();
                    Player_1.get_total_hit_percent();

                    rand_bg_music_sel(); //---------- AUDIO--- RUNS MAIN BACKGROUND AUDIO
                    
                    start_sum_population();
    
                    Gameplay_UI.remove_level_popup();
                    
                    setTimeout(function(){

                        set_int_spaceships(); //---------- Brief delay for spaceships to start moving
                        
                        fire_rate_restart();

                    },500)

                     level_timer();
                })
                .catch(function(){

                    alert("Level 1 failed to initialize! Returning to the homepage.");

                    fire_rate_stop();
                    game_test_speed = 10000;
                    //location.href = "../index.html";
                })
            };

            function load_level_2()
            {
                level_2_pro_obj = new Promise(function(resolve){ //Main functions for gameplay after game load complete
                    
                    //Gameplay_UI.gamescreen.style.backgroundImage = 'url("../img/space_bg_gameplay_gif_lvl_2.gif")';
                    

                    Gameplay_UI.display_level_popup()
                    Game_Rules.level_1 = false;
                    Game_Rules.level_2 = true;
            
                    console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode + " LEVEL 2 DATA");
                    Game_Rules.reset_ship_margin_incr();

                    Gameplay_UI.level_display();
                    Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit)

                    setTimeout(resolve,load_time)
                })
                .then(function(){
                    
                    //Gameplay_UI.restart_all_game_animations();
                    Gameplay_UI.remove_level_popup();

                    rand_bg_music_sel(); //---------- AUDIO--- RUNS MAIN BACKGROUND AUDIO
                    
                    start_diff_population();
                    
                    setTimeout(function(){

                        set_int_spaceships();
                        fire_rate_restart();
                        
                    },500)
                    
                    console.log("LEVEL 2 IS LOADED = " + Game_Rules.loaded);

                    level_timer()
                })
                .catch(function(){

                        alert("Level 2 failed to initialize! Returning to the homepage.");
                        
                        fire_rate_stop();
                        game_test_speed = 10000;
                    })
                    .catch(function(){
                    
                        //location.href = "../index.html";
                    })
            }
                

            function score_tracker()
            {
                Player_1.get_score();
                Player_1.get_high_score();
                //Gameplay_UI.remove_report(); //-----Use this to remove report following testing---

                Sum_Timer.get_countdown();

                if(Game_Rules.level_1 === true)
                {
                    Gameplay_UI.timer_display(Sum_Timer.countdown, Sum_Timer.limit);      
                }

                else if(Game_Rules.level_2 === true)
                {
                    Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit);          
                }     
            }

            function level_timer()
            {                
                if(Game_Rules.level_1 === true)
                {
                    Sum_Timer.get_countdown();
                    Gameplay_UI.timer_display(Sum_Timer.countdown, Sum_Timer.limit);      
                }

                else if(Game_Rules.level_2 === true)
                {
                    Diff_Timer.get_countdown();
                    Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit);          
                }     
                
                timer_interval_id = setInterval(function(){
                    
                    if(Game_Rules.level_1 === true)
                    {
                        Sum_Timer.elapsed++;
                        Sum_Timer.get_countdown();
                        Gameplay_UI.timer_display(Sum_Timer.countdown,Sum_Timer.elapsed);
                    }

                    else if(Game_Rules.level_2 === true)
                    {
                        Diff_Timer.elapsed++
                        Diff_Timer.get_countdown();
                        Gameplay_UI.timer_display(Diff_Timer.countdown,Diff_Timer.elapsed);
                    }               

                    if((Game_Rules.level_1 && Sum_Timer.countdown < 6) || (Game_Rules.level_2 && Diff_Timer.countdown < 6))
                    {
                        Countdown_Sound.play_music(); //---------- AUDIO---
                    }

                    if((Game_Rules.level_1 === true && Sum_Timer.countdown < 1) || (Game_Rules.level_2 === true && Diff_Timer.countdown < 1))
                    {   
                        fire_rate_stop();
       
                        if(Game_Rules.level_1 === true)
                        {
                            //alert("TIME UP FOR LEVEL 1")    
                        }

                        else if(Game_Rules.level_2 === false)
                        {
                            //alert("TIME UP FOR LEVEL 2")
                        }

                        console.log("LEVEL END, CEASE FIRE!!!")

                        setTimeout(function(){

                            clearInterval(timer_interval_id);
                            clearInterval(spaceship_interval_id);
                            clearInterval(projectile_interval_id);
                            clearTimeout(timeout_fire_rate_restart);
                            
                                
                        },500)
                        
                        setTimeout(function(){

                            //Gameplay_UI.stop_all_game_animations();
                            explosion(0);
                            explosion(300)
                            Gameplay_UI.display_level_popup(null_level_end_popup);    
                        },700)
                         
                        explosion(5000)
                        .then(function(){
                            
                            Game_Rules.reset_ship_margin_incr();
                            Gameplay_UI.reset_spaceships(null_reset_top);
                            Gameplay_UI.remove_level_popup();                       
                            time_up()
                        })       
                    }
                },1000);
            };

            function time_up()
            {               
                depopulate_all();
                
                bg_music_pause();
                        
                if(Game_Rules.level_1 === true)
                {
                    level_1_end_level_2_start = new Promise(function(resolve){

                        setTimeout(function(){

                            Game_Rules.level_1 = false;
                            Game_Rules.level_2 = true;

                            Diff_Timer.get_countdown();
                            Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit);          

                            resolve();
                        },1000)   
                    })  
                    .then(function(){

                        load_level_2(); 
                    })     
                }
                    
                else if(Game_Rules.level_2 === true)
                {

                    fire_rate_stop()
                    clearInterval(spaceship_interval_id)
                    clearInterval(projectile_interval_id)

                    level_2_end_report_start = setTimeout(function(){

                        Player_1.get_max_combo();

                        Gameplay_UI.display_report_screen(
                            "Congratulations! You Survived!",
                            Player_1.get_full_name(),
                            Player_1.tag,
                            Player_1.difficulty_completed,
                            Player_1.hit_count[0],
                            Player_1.hit_count[1],
                            Player_1.miss_count[0],
                            Player_1.miss_count[1],
                            Player_1.max_combo,
                            Player_1.high_score,
                            Player_1.score
                        );
                    },2000)     
                }  
            };

            function rand_bg_music_sel()
            {
                let sel = Math.floor(Math.random()*3 + 1);

                if(sel === 1)
                {
                    Bg_Music.play_music(); //----------AUDIO---
                    Bg_Music.audio_control.style.display = "initial"
                }

                else if(sel === 2)
                {
                    Bg_Music_2.play_music(); //----------AUDIO---
                    Bg_Music_2.audio_control.style.display = "initial" 
                }

                else if(sel === 3)
                {
                    Bg_Music_3.play_music(); //----------AUDIO---
                    Bg_Music_3.audio_control.style.display = "initial" 
                }
            };

            function bg_music_pause()
            {
                Bg_Music.pause_music();
                Bg_Music_2.pause_music();
                Bg_Music_3.pause_music();
            };

            function start_sum_population()
            {
                Sum.populate_correct_ans_sum();
                Sum.populate_incorrect_ans_arr_sum();
                Sum.select_correct_ans_position();
                console.log(Sum);
                
                Gameplay_UI.populate_gun(Sum);  
                Gameplay_UI.populate_spaceship(Sum);  
            };
        
            function start_diff_population()
            {
                Diff.populate_correct_ans_diff();
                Diff.populate_incorrect_ans_arr_diff();
                Diff.select_correct_ans_position();
                console.log(Diff);
                
                Gameplay_UI.populate_gun(Diff);
                Gameplay_UI.populate_spaceship(Diff);  
            };

            function depopulate_all() 
            {
                Gameplay_UI.depopulate_spaceship();
                Gameplay_UI.depopulate_gun();
                Gameplay_UI.reset_projectile();
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

            function explosion(fn_time)  //resets ships after explosion timer expires
            {
                return new Promise(function(resolve){

                    clearInterval(spaceship_interval_id)
                    fire_rate_stop();
                    Gameplay_UI.correct_ship_hit_animate();
                    
                    Hit_Sound.play_music(); //----------AUDIO---

                    setTimeout(resolve,fn_time);
                })
            };  

            function move_each_ship(fn_position_num)
            {
                Game_Rules.increase_ship_margin();     
                Gameplay_UI.move_spaceships(fn_position_num,Game_Rules.ship_margin_incr[fn_position_num]);   
            }

            function set_int_spaceships() //main gameplay timer start and end function
            {
                console.log(Game_Rules.ship_margin_incr);
                
                // ---------- SPACESHIP RANDOM SPEED FUNCTIONS BELOW ---------- //

                console.log(Game_Rules.set_ext_randomizer());

                spaceship_interval_id = setInterval(function(){
                    
                    for(let interval_index = 0; interval_index < Gameplay_UI.spaceships.length; interval_index++)
                    { 
                        move_each_ship(interval_index);
                        
                        let stop_user_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top+12)
                        
                        if(stop_user_check == true)
                        {
                            fire_rate_stop();    
                        }

                        let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top+24);
                     
                        if(lose_check == true)
                        {
                            clearInterval(spaceship_interval_id);
                            clearInterval(timer_interval_id);
                            clearInterval(projectile_interval_id);
                        
                            Gameplay_UI.gamescreen.children[5].style.visibility = "hidden";
                            
                            fire_rate_stop();

                            for(let i=0; i < Gameplay_UI.spaceships.length; i++)
                            {
                                Gameplay_UI.gamescreen.children[i].children[0].style.visibility = "hidden";
                                Gameplay_UI.gamescreen.children[i].style.cursor = "initial";
                            }

                            Gameplay_UI.gamescreen.style.backgroundImage = 'url("../img/game_over_explosion_gif.gif")';

                            bg_music_pause(); //----------AUDIO---

                            new Promise(function(resolve){

                                setTimeout(resolve,2000);
                            })
                            .then(function(){

                                Game_Over_Sound.play_music();

                                level_2_end_report_start = setTimeout(function(){

                                    Player_1.get_max_combo();
            
                                    Gameplay_UI.display_report_screen(
                                        "Game Over. You Failed!",
                                        Player_1.get_full_name(),
                                        Player_1.tag,
                                        Player_1.difficulty_completed,
                                        Player_1.hit_count[0],
                                        Player_1.hit_count[1],
                                        Player_1.miss_count[0],
                                        Player_1.miss_count[1],
                                        Player_1.max_combo,
                                        Player_1.high_score,
                                        Player_1.score
                                    );
                                },5000)
                            })
                            .catch(function(){

                                alert("Browser has crashed! Please refresh the page.")
                            })
                    };
                    
                }},Speed_Controller.spaceship_speed_ctrl(game_speed))
            };
                
            function set_int_projectile() //to be used in spacebar press and mouse click events
            {
                projectile_margin_bottom = 0;
                let hit_check = false;
                let within_bounds_check = false;
                
                console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode)

                fire_rate_stop();

                Fire_Projectile_Sound.play_music(); //----------AUDIO---

                projectile_interval_id = setInterval(function(){

                    projectile_margin_bottom += 2.5; //unit in vh
                    Gameplay_UI.fire_projectile(projectile_margin_bottom);

                    for(let hit_index = 0; hit_index < Gameplay_UI.spaceships.length; hit_index++)
                    {
                        hit_check = Boundaries.check_collision(Gameplay_UI.spaceships[hit_index].getBoundingClientRect().bottom, Gameplay_UI.gun_projectile.getBoundingClientRect().top + 144);
                    
                        if(hit_check === true)
                        {
                            break;
                        }
                    }

                    //Below conditions ensure that the correct answer bounds are in place depending on level
                    if(Game_Rules.level_1 === true)
                    {
                        within_bounds_check = Boundaries.check_within_bounds(Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().left, Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().right, Gameplay_UI.gun_projectile.getBoundingClientRect().left, Gameplay_UI.gun_projectile.getBoundingClientRect().right);
                    }

                    else if(Game_Rules.level_2 === true)
                    {
                        within_bounds_check = Boundaries.check_within_bounds(Gameplay_UI.spaceships[Diff.correct_ans.position].getBoundingClientRect().left, Gameplay_UI.spaceships[Diff.correct_ans.position].getBoundingClientRect().right, Gameplay_UI.gun_projectile.getBoundingClientRect().left, Gameplay_UI.gun_projectile.getBoundingClientRect().right);    
                    }
                    
                    if(hit_check === true) //ALL ANSWER HITS
                    {                       
                        clearInterval(projectile_interval_id);
                        clearInterval(spaceship_interval_id);    
 
                        depopulate_all();
                        
                        if(Game_Rules.level_1 === true)
                        {
                            start_sum_population();    
                        }
                        
                        else if(Game_Rules.level_2 === true)
                        {
                            start_diff_population();
                        }

                        if(stop_end_bug_lvl_1 || stop_end_bug_lvl_2) //Hitting a target at < 1 sec may cause ships to continue moving 
                        {
                            fire_rate_stop();
                        }
                    }

                    if(within_bounds_check === false && hit_check === true) //WRONG ANSWER HIT
                    {
                        console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode)
                        
                        console.log(Sum_Timer.countdown, Diff_Timer.countdown)

                        Gameplay_UI.incorrect_ship_hit_animate();
                        Game_Rules.hit = false;
                        Game_Rules.miss = true;

                        Miss_Sound.play_music(); //----------AUDIO---

                        Player_1.get_miss_count();
                        Player_1.get_total_hit_miss();
                        Player_1.get_score();
                        Player_1.get_high_score();
                        Player_1.get_max_combo();

                        Gameplay_UI.miss_display(Player_1.total_misses);
                        Gameplay_UI.current_score_display(Player_1.score);
                        Gameplay_UI.highest_score_display(Player_1.high_score);
                        Gameplay_UI.combo_display(Player_1.combo);

                        console.log(Player_1.hit_count + "hits 3asdas");
                        console.log(Player_1.miss_count + "misses 3asdas");

                        if(sum_level_off_cond || diff_level_off_cond)
                        {      
                            //Gameplay_UI.stop_all_game_animations();
                            fire_rate_stop();

                            setTimeout(function(){

                                fire_rate_stop
                                clearInterval(spaceship_interval_id)
                                clearInterval(projectile_interval_id)
                            },500);
                        }

                        timeout_set_int_spaceship = setTimeout(function(){
                            
                            set_int_spaceships();
                            Gameplay_UI.reset_spaceships();
                                                        
                            timeout_fire_rate_restart = setTimeout(fire_rate_restart,700);
                        },500);
                    }

                    if(within_bounds_check === true && hit_check === true) //RIGHT ANSWER HIT
                    {
                        console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode)
                        
                        Game_Rules.hit = true;
                        Game_Rules.miss = false;  

                        Player_1.get_hit_count();
                        Player_1.get_total_hit_miss();
                        Player_1.get_score();
                        Player_1.get_high_score();
                        Player_1.get_max_combo();

                        Gameplay_UI.hit_display(Player_1.total_hits);
                        Gameplay_UI.current_score_display(Player_1.score);
                        Gameplay_UI.highest_score_display(Player_1.high_score);
                        Gameplay_UI.combo_display(Player_1.combo);

                        console.log(Player_1.hit_count + "hits 3");
                        console.log(Player_1.miss_count + "misses 3");   
                        
                        explosion(600)
                        .then(function(){
                            
                            Gameplay_UI.reset_spaceships(null_reset_top)
                            Game_Rules.reset_ship_margin_incr();
                            set_int_spaceships();
                            
                            if(sum_level_on_cond || diff_level_on_cond)
                            {
                                timeout_fire_rate_restart = setTimeout(fire_rate_restart,700);    
                            }     

                            if(sum_level_off_cond || diff_level_off_cond)
                            {                               
                                fire_rate_stop();
                                //Gameplay_UI.stop_all_game_animations();
                                setTimeout(fire_rate_stop,500);
                            }     
                        })
                        .catch(function(){
        
                            alert("PROBLEM")
                        })                  
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
                    if(out_of_bounds_check_left === true)
                    {
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
                    if(out_of_bounds_check_right === true)
                    {
                        gun_margin_left -= 48;

                        Gameplay_UI.move_gun(gun_margin_left);
                    }
                    
                    else
                    {
                        gun_margin_left += 12;

                        Gameplay_UI.move_gun(gun_margin_left);  
                    };
                };

                if(event.key == " " && Input_Device.gamekey.spacebar === false)
                {
                    Input_Device.gamekey.spacebar = true;

                    setTimeout(function(){
                        
                        Input_Device.gamekey.spacebar = false;
                    },1000);

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
                        gun_margin_left = 21 + (click_index - 1)*12; //units in vw
                                                            
                        Gameplay_UI.click_position_gun(gun_margin_left);

                        set_int_projectile();
                    }  
                };    
            };

            // ---------- FUNCTIONS ABOVE HERE ---------- //

            let BLEH; //GENERIC TEST VARIABLE ONLY
            const null_reset_top = null; //default value must not be changed from "", generic variable to be declared in Gameplay_UI.reset_spaceships() method, prevents ships from returning to the top on reset
            const null_level_end_popup = null; //default value must not be changed from "", generic variable to be decalred in Gameplay_UI.display_level_popup() method, shows level complete message at time up
            const null_ship_speed = null; //default value should be set to null for random speed to work, 5000+ (SLOW) for testing

            let projectile_margin_bottom = 0; //unit in %
            let gun_margin_left = 0; //unit in %
            let ship_explode_hit, ship_explode_end;
            
            let spaceship_interval_id;
            let timer_interval_id;
            let projectile_interval_id;
            let timeout_fire_rate_restart;
            let timeout_set_int_spaceship;
            let start_game_timeout;

            let game_index = 0; 

            let load_time = 2000; //Controls default game load time in ms

            let level_1_promise; 
            let level_2_promise;
            let wait_reset;
            let level_1_end_level_2_start, level_2_end_report_start;
            let level_1_pro_obj = {}, level_2_pro_obj = {};
            let explode;
            let user_difficulty_selected = [false,false,false,false,false];
            let game_speed;

            // ---------- INITIALIZE CLASSES BELOW HERE ---------- //
                        
            const Sum = new Sum_Question();
            const Diff = new Diff_Question();

            const Sum_Timer = new Timer(90);
            const Diff_Timer = new Timer(60);

            const Player_1 = new Player("Darnell", "Noel", "DN26");
            

            // ---------- INITIALIZE CLASSES ABOVE HERE ---------- //

            // ---------- START LEVEL 1 BELOW ---------- //

            Gameplay_UI.difficulty_button_settings();

            //Game_Rules.set_easy_mode();
            //Game_Rules.set_hard_mode();
            Game_Rules.level_1 = true; //Must be TRUE at start
            Game_Rules.level_2 = false; //Must be FALSE at start
            
            Player_1.get_full_name();

            if(Game_Rules.level_1 === true)
            {
                Sum_Timer.get_countdown();
                Gameplay_UI.timer_display(Sum_Timer.countdown, Sum_Timer.limit);      
            }
            
            Sum_Timer.countdown = Sum_Timer.limit, Diff_Timer.countdown = Diff_Timer.limit;
            
            console.log(Sum_Timer.countdown, Diff_Timer.countdown)

            let sum_level_on_cond = (Sum_Timer.elapsed !== Sum_Timer.limit) && (Game_Rules.level_1 === true);
            let sum_level_off_cond = (Sum_Timer.elapsed === Sum_Timer.limit) && (Game_Rules.level_1 === true);
            let diff_level_on_cond = (Diff_Timer.elapsed !== Diff_Timer.limit) && (Game_Rules.level_2 === true);
            let diff_level_off_cond = (Diff_Timer.elapsed === Diff_Timer.limit) && (Game_Rules.level_2 === true);
            let stop_end_bug_lvl_1 = (Sum_Timer.elapsed >= (Sum_Timer.limit - 1)) && (Game_Rules.level_1 === true);
            let stop_end_bug_lvl_2 = (Sum_Timer.elapsed >= Sum_Timer.limit) && (Game_Rules.level_1 === true);

            Sum_Timer.restrict_countdown();
            Diff_Timer.restrict_countdown();
            Sum_Timer.restrict_elapsed();
            Diff_Timer.restrict_elapsed();
            
            document.addEventListener("click",function(event){

                let difficulty_button = event.target;
                
                if(difficulty_button.id == "hardest_mode_button")
                {
                    Game_Rules.set_hard_mode();
                    Gameplay_UI.difficulty_display(0);
                    Player_1.difficulty_completed = Gameplay_UI.difficulty_options[0];
                    game_speed = (Math.random()*10 + 20);
                    console.log(Game_Rules.easy_mode, Game_Rules.hard_mode, Speed_Controller.spaceship_speed_ctrl(), " HARDEST MODE SELECTED");

                    return user_difficulty_selected[0] = true;
                }

                else if(difficulty_button.id == "hard_mode_button")
                {
                    Game_Rules.set_hard_mode();
                    Gameplay_UI.difficulty_display(1)
                    game_speed = null; //Default at null set to Math.random()*10 + 40
                    console.log(Game_Rules.easy_mode, Game_Rules.hard_mode, Speed_Controller.spaceship_speed_ctrl(), " HARD MODE SELECTED");

                    return user_difficulty_selected[1] = true;
                }

                else if(difficulty_button.id == "normal_mode_button")
                {
                    Game_Rules.set_easy_mode();
                    Gameplay_UI.difficulty_display(2)
                    game_speed = null; //Default at null set to Math.random()*10 + 40
                    console.log(Game_Rules.easy_mode, Game_Rules.hard_mode, Speed_Controller.spaceship_speed_ctrl(), " NORMAL MODE SELECTED");

                    return user_difficulty_selected[2] = true;
                }

                else if(difficulty_button.id == "easy_mode_button")
                {
                    Game_Rules.set_easy_mode();
                    Gameplay_UI.difficulty_display(3)
                    game_speed = Math.random()*10 + 90;
                    console.log(Game_Rules.easy_mode, Game_Rules.hard_mode, Speed_Controller.spaceship_speed_ctrl(), " EASY MODE SELECTED");

                    return user_difficulty_selected[3] = true;
                }

                else if(difficulty_button.id == "easiest_mode_button")
                {
                    Game_Rules.set_easy_mode();
                    Gameplay_UI.difficulty_display(4)
                    game_speed = Math.random()*10 + 120;
                    console.log(Game_Rules.easy_mode, Game_Rules.hard_mode, Speed_Controller.spaceship_speed_ctrl(), " EASIEST MODE SELECTED");
                    
                    return user_difficulty_selected[4] = true;         
                }
            })           
            
            Gameplay_UI.player_name_display(Player_1.get_full_name());
            Gameplay_UI.player_tag_display(Player_1.tag)
            Gameplay_UI.level_display();
            Gameplay_UI.difficulty_display();
            Gameplay_UI.hit_display(Player_1.total_hits);
            Gameplay_UI.miss_display(Player_1.total_misses);
            Gameplay_UI.combo_display(Player_1.combo);
            Gameplay_UI.current_score_display(Player_1.score);
            Gameplay_UI.highest_score_display(Player_1.high_score);

            return new Promise(function(resolve){

                Alien_theme.play_music()

                start_game_timeout = setTimeout(resolve,5000); //This function waits for the user to select a difficulty     
            })
            .then(function(){

                if(user_difficulty_selected.some(function(val){return val === true}))
                {
                    Player_1.set_difficulty();
                }
                
                else
                {
                    alert("Please select a difficulty!");
                    document.location.reload();
                }
            })
            .then(function(){

                Gameplay_UI.remove_difficulty_button_settings();
                load_level_1()
            }) //GAME START HERE
                
        })
    }
};

Main_Game.game_init();

export default Main_Game;