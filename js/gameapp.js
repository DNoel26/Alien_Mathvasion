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

                document.location.reload();
            });
            
            Gameplay_UI.end_button.addEventListener("click", function(){
            
                if(confirm("Return to homepage?"))
                {
                    location.href = "../index.html";    
                }
                
                else
                {
                    alert("Resuming game")
                }
            });
            
            document.addEventListener("click", function(event){
            
                const element = event.target;
        
                if(element.id == "save_exit_report_button")
                {
                    //alert("OW");
                    
                    document.location.reload();    
                }
            });
            
            // -------------------- DOCUMENT EVENT LISTENERS ABOVE HERE ------------------- //

            let game_test_speed = ""; //Default value should be set to "". Otherwise, controls spaceship movement speed for testing.
            // ---------- LOAD AUDIO BELOW HERE ---------- //

            let bg_vol_ctrl = 0.1; //Controls background audio volume. Default volume set to 0.3 

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

            const Countdown_Sound = new Sound("../media/countdown_5_to_1","countdown_sound");
            Countdown_Sound.add_sound();

            

            // ---------- LOAD AUDIO ABOVE HERE ---------- //

            // ---------- FUNCTIONS BELOW HERE ----------//

            function load_level_1() //---------- Main function to load game into level 1
            {
                level_1_pro_obj
                .then(function level_1_play(){
                    
                    alert("LEVEL 1 INITIALIZED")

                    Game_Rules.set_game_loaded();

                    Player_1.get_score();
                    Player_1.get_high_score();
                    //Player_1.get_hit_count();
                    //Player_1.get_miss_count();
                    Player_1.get_max_combo();
                    Player_1.get_total_hit_miss();
                    Player_1.get_total_hit_percent();

                    rand_bg_music_sel(); //---------- AUDIO--- RUNS MAIN BACKGROUND AUDIO
                    
                    start_sum_population();
                    //start_diff_population();
    
                    Gameplay_UI.remove_level_popup();
                    
                    setTimeout(function(){

                        set_int_spaceships(); //---------- Brief delay for spaceships to start moving
                        
                        fire_rate_restart();

                    },500)

                     level_timer();
                })
                .catch(function(){

                    alert("Level 1 failed to initialize! Returning to the homepage.");

                    //depopulate_all();
                    fire_rate_stop();
                    game_test_speed = 10000;

                    setTimeout(location.href = "../index.html",10000);
                })
                .catch(function(){
                   
                    location.href = "../index.html";
                })
            };

            function load_level_2()
            {
                level_2_pro_obj
                .then(function(){
                    
                    Gameplay_UI.remove_level_popup();
                    alert("LEVEL 2 INITIALIZED");

                    //Game_Rules.set_level();

                    rand_bg_music_sel(); //---------- AUDIO--- RUNS MAIN BACKGROUND AUDIO
                    
                    start_diff_population();
                    
                    setTimeout(function(){

                        set_int_spaceships();
                        fire_rate_restart();
                        
                    },500)
                    
                    console.log("LEVEL 2 IS LOADED = " + Game_Rules.loaded);

                    level_timer()
                })
            }
                /*.catch(function(){

                    alert("Level 2 failed to initialize! Returning to the homepage.");
                    
                    //depopulate_all();
                    fire_rate_stop();
                    game_test_speed = 10000;
                })
                .catch(function(){
                   
                    location.href = "../index.html";
                })*/

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
                Sum_Timer.restrict_countdown()
                Diff_Timer.restrict_countdown()
                
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
                            alert("TIME UP FOR LEVEL 1")    
                        }

                        else if(Game_Rules.level_2 === false)
                        {
                            alert("TIME UP FOR LEVEL 2")
                        }

                        console.log("LEVEL END, CEASE FIRE!!!")

                        Gameplay_UI.reset_spaceships(null_reset_top);
                        Gameplay_UI.display_level_popup(null_level_end_popup);

                        clearInterval(timer_interval_id);
                        
                        explosion(ship_explode_end,5000)
                        .then(function(){
                            
                            alert("TIME UP FUNCTION EXECUTE NOW")
                            Gameplay_UI.reset_spaceships()
                            Gameplay_UI.remove_level_popup();                       
                            time_up()
                            
                            /*.then(function(){

                                load_level_2(level_2_promise)
                            })*/
                        })       
                    }
                },1000);
            };

            function time_up()
            {               
                depopulate_all();
                //Gameplay_UI.reset_spaceships(null_reset_top)

                //clearInterval(spaceship_interval_id)
                //clearInterval(projectile_interval_id);
                //clearTimeout(timeout_fire_rate_restart);
                //clearTimeout(timeout_set_int_spaceship);

                /*for(let i=0; i < Gameplay_UI.spaceships.length; i++)
                {
                    clearInterval(spaceship_interval_id[i]);    
                }*/
                
                bg_music_pause();
                        
                if(Game_Rules.level_1 === true)
                {
                    level_1_end_level_2_start = new Promise(function(resolve){

                        setTimeout(function(){

                            //alert("LEVEL 1 COMPLETE???");

                            Game_Rules.level_1 = false;
                            Game_Rules.level_2 = true;

                            if(Game_Rules.level_2 === true)
                            {
                                Diff_Timer.get_countdown();
                                Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit);          
                            }

                            resolve();
                        },1000)   
                    })  
                    .then(function(){

                        load_level_2(level_2_promise,load_time); 
                    })     
                }
                    
                else if(Game_Rules.level_2 === true)
                {
                    alert("LEVEL 2 COMPLETE???");

                    level_2_end_report_start = setTimeout(function(){

                        Player_1.get_max_combo();

                        Gameplay_UI.display_report_screen(
                            "Status Report",
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

            function bg_music_pause()
            {
                Bg_Music.pause_music();
                Bg_Music_2.pause_music();
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

            function explosion(fn_explode,fn_time)  //resets ships after explosion timer expires
            {
                return fn_explode = new Promise(function(resolve){

                    fire_rate_stop();
                    Gameplay_UI.correct_ship_hit_animate();
                    
                    //for(let int_index = 0; int_index < Gameplay_UI.spaceships.length; int_index++)
                    //{
                    clearInterval(spaceship_interval_id);//[int_index]); 
                    //};
                    
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
                console.log(Game_Rules.ship_margin_incr)
                
                /*if(Game_Rules.hit === false && Game_Rules.miss === false)
                {
                    fire_rate_restart();  
                }*/
                
                // ---------- SPACESHIP RANDOM SPEED FUNCTIONS BELOW ---------- //

                console.log(Game_Rules.set_ext_randomizer());

                spaceship_interval_id = setInterval(function(){
                    
                    for(let interval_index = 0; interval_index < Gameplay_UI.spaceships.length; interval_index++)
                    { 
                        move_each_ship(interval_index);

                        //Game_Rules.increase_ship_margin();     
                        //Gameplay_UI.move_spaceships(interval_index,Game_Rules.ship_margin_incr[interval_index]);
                        
                        let stop_user_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top+12)
                        
                        if(stop_user_check == true)
                        {
                            fire_rate_stop();    
                        }

                        //console.log(`${Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom} + belongs to ${interval_index}`)
                        //console.log(Gameplay_UI.gun.getBoundingClientRect().top+24)

                        let lose_check = Boundaries.check_collision(Gameplay_UI.spaceships[interval_index].getBoundingClientRect().bottom, Gameplay_UI.gun.getBoundingClientRect().top+24);
                     
                        if(lose_check == true)
                        {
                            clearInterval(spaceship_interval_id);
                            clearInterval(timer_interval_id);
                            clearInterval(projectile_interval_id);
                            //alert("Interval cleared");
                        
                            Gameplay_UI.gamescreen.children[5].style.visibility = "hidden";
                            
                            fire_rate_stop();

                            for(let i=0; i < Gameplay_UI.spaceships.length; i++)
                            {
                                Gameplay_UI.gamescreen.children[i].children[0].style.visibility = "hidden";
                                Gameplay_UI.gamescreen.children[i].style.cursor = "initial";
                            }

                            Gameplay_UI.gamescreen.style.backgroundImage = 'url("../img/game_over_explosion_gif.gif")';

                            Bg_Music.pause_music(); //----------AUDIO---
                            Bg_Music_2.pause_music(); //----------AUDIO---

                            new Promise(function(resolve){

                                setTimeout(resolve,2000);
                            })
                            .then(function(){

                                Game_Over_Sound.play_music();

                                //Gameplay_UI.display_report_screen();

                                setTimeout(function(){

                                    document.location.reload()
                                },5000)
                            })
                            .catch(function(){

                                alert("Browser has crashed! Please refresh the page.")
                            })
                    };
                    
                }},Speed_Controller.spaceship_speed_ctrl(50))
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

                    projectile_margin_bottom += 7; //unit in vh
                    Gameplay_UI.fire_projectile(projectile_margin_bottom);

                    for(let hit_index = 0; hit_index < Gameplay_UI.spaceships.length; hit_index++)
                    {
                        hit_check = Boundaries.check_collision(Gameplay_UI.spaceships[hit_index].getBoundingClientRect().bottom, Gameplay_UI.gun_projectile.getBoundingClientRect().top + 144);
                    
                        if(hit_check === true)
                        {
                            break;
                        }
                    }

                    within_bounds_check = Boundaries.check_within_bounds(Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().left, Gameplay_UI.spaceships[Sum.correct_ans.position].getBoundingClientRect().right, Gameplay_UI.gun_projectile.getBoundingClientRect().left, Gameplay_UI.gun_projectile.getBoundingClientRect().right);
                    
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
                    }

                    if(within_bounds_check === false && hit_check === true) //WRONG ANSWER HIT
                    {
                        console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode)
                        
                        Gameplay_UI.incorrect_ship_hit_animate();
                        Game_Rules.hit = false;
                        Game_Rules.miss = true;

                        Miss_Sound.play_music(); //----------AUDIO---

                        //Gameplay_UI.miss_display(Player_1.miss_count);

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

                        timeout_set_int_spaceship = setTimeout(function(){

                            Gameplay_UI.reset_spaceships();
                            //Game_Rules.reset_ship_margin_incr();
                            set_int_spaceships();

                            timeout_fire_rate_restart = setTimeout(fire_rate_restart,1000);
                            
                            if(Sum_Timer.countdown < 1 || Diff_Timer.countdown < 1)
                            {                               
                                setTimeout(fire_rate_stop,500);
                            }   

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
                        
                        explosion(ship_explode_hit,700)
                        .then(function(){
                            
                            Gameplay_UI.reset_spaceships(null_reset_top)
                            Game_Rules.reset_ship_margin_incr();
                            set_int_spaceships();
                            
                            if(Sum_Timer.countdown >= 1 || Diff_Timer.countdown >= 1)
                            {
                                timeout_fire_rate_restart = setTimeout(fire_rate_restart,800);    
                            }     

                            if(Sum_Timer.countdown < 1 || Diff_Timer.countdown < 1)
                            {                               
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
                    //alert("Left arrow pressed!")
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

            //let ship_margin_top = [0,0,0,0,0]; //Ensures that spaceships properly reset to top
            let projectile_margin_bottom = 0; //unit in %
            let gun_margin_left = 0; //unit in %
            let ship_explode_hit, ship_explode_end;
            
            let spaceship_interval_id = [];
            let timer_interval_id;
            let projectile_interval_id;
            let timeout_fire_rate_restart;
            let timeout_set_int_spaceship
            //let game_test_speed = 5000;

            let game_index = 0; 

            let load_time = 2000; //Controls default game load time in ms

            let level_1_promise; 
            let level_2_promise;
            let wait_reset;
            let level_1_end_level_2_start, level_2_end_report_start;

            // ---------- INITIALIZE CLASSES BELOW HERE ---------- //
                        
            const Sum = new Sum_Question();
            const Diff = new Diff_Question();

            const Sum_Timer = new Timer(5);
            const Diff_Timer = new Timer(5);

            const Player_1 = new Player("Darnell", "Noel", "DN26");
            

            // ---------- INITIALIZE CLASSES ABOVE HERE ---------- //

            // ---------- START LEVEL 1 BELOW ---------- //
            
            Game_Rules.set_hard_mode();
            Game_Rules.level_1 = true; //Must be TRUE at start
            Game_Rules.level_2 = false; //Must be FALSE at start
            
            Player_1.get_full_name();
            Player_1.set_difficulty();
            
            Gameplay_UI.player_name_display(Player_1.get_full_name());
            Gameplay_UI.player_tag_display(Player_1.tag)
            Gameplay_UI.level_display();
            Gameplay_UI.difficulty_display();
            Gameplay_UI.hit_display(Player_1.total_hits);
            Gameplay_UI.miss_display(Player_1.total_misses);
            Gameplay_UI.combo_display(Player_1.combo);
            Gameplay_UI.current_score_display(Player_1.score);
            Gameplay_UI.highest_score_display(Player_1.high_score);

            if(Game_Rules.level_1 === true)
            {
                Sum_Timer.get_countdown();
                Gameplay_UI.timer_display(Sum_Timer.countdown, Sum_Timer.limit);      
            }
            
            Sum_Timer.countdown = 0, Diff_Timer.countdown = 0;
            
            console.log(Sum_Timer.countdown, Diff_Timer.countdown)

            if(Sum_Timer.countdown < 1 || Diff.countdown < 1)
            {
                fire_rate_stop();
            }
            
            let level_1_pro_obj = {}, level_2_pro_obj = {};

            level_1_pro_obj = new Promise(function(resolve){
                    
                Gameplay_UI.display_level_popup();
                setTimeout(resolve,1000);
                //Gameplay_UI.reset_spaceships(null_reset_top);
            })

            level_2_pro_obj = new Promise(function(resolve){ //Main functions for gameplay after game load complete
                    
                Gameplay_UI.display_level_popup()
                Game_Rules.level_1 = false;
                Game_Rules.level_2 = true;
            
                alert("LEVEL 2 HAS LOADED SUCCESSFULLY");
                console.log(Game_Rules.level_1,Game_Rules.level_2,Game_Rules.easy_mode,Game_Rules.hard_mode + " LEVEL 2 DATA");

                //Gameplay_UI.player_name_display(Player_1.get_full_name());
                //Gameplay_UI.player_tag_display(Player_1.tag)
                Gameplay_UI.level_display();
                //Gameplay_UI.difficulty_display();
                Gameplay_UI.timer_display(Diff_Timer.countdown, Diff_Timer.limit)
                //Gameplay_UI.hit_display(Player_1.total_hits);
                //Gameplay_UI.miss_display(Player_1.total_misses);
                //Gameplay_UI.combo_display(Player_1.combo);
                //Gameplay_UI.current_score_display(Player_1.score);
                //Gameplay_UI.highest_score_display(Player_1.high_score);*/

                setTimeout(resolve,2000)
            })

            load_level_1(level_1_promise,load_time)
            
            
        })
    }
};

Main_Game.game_init();

export default Main_Game;