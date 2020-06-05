import Game_Rules from "../Business Logic Objects/game_rules.js";
import Player from "../Business Logic Objects/player.js";

const Gameplay_UI =
{
    spaceships : document.querySelectorAll(".spaceship"),
    gun : document.querySelector("#gun"),
    gamescreen : document.querySelector("#gamescreen_section"),
    gun_projectile : document.querySelector("#gun_projectile"),
    gamescreen_sides : document.querySelectorAll(".side_of_gamescreen"),
    settings : document.querySelector("#settings_button"),
    restart_button : document.querySelector("#restart_button"),
    end_button : document.querySelector("#end_button"),
    save_button : document.querySelector("#save_button"),
    //save_exit_report_button : document.querySelector("#save_exit_report_button"),
    player_name_disp : undefined,
    player_tag_disp : undefined,
    level_disp : undefined,
    level_disp_gamescreen : undefined,
    report_disp_gamescreen : undefined,
    report_disp_data : [],
    difficulty_disp : undefined,
    timer_disp : undefined,
    hit_disp : undefined,
    miss_disp : undefined,
    combo_disp : undefined,
    current_score_disp : undefined,
    highest_score_disp : undefined,

    display_spaceship_num(mtd_i, mtd_ship_color, mtd_ans_obj, ) //this is called within populate_spaceship method
    {
        const rand_num_display = document.createElement("h3");
        this.spaceships[mtd_i].style.backgroundColor = mtd_ship_color; //only for testing, comment out here and in argument otherwise 
        if(Game_Rules.level_1 === true)
        {
            rand_num_display.innerHTML = `${mtd_ans_obj.first_num}+${mtd_ans_obj.second_num}`;
        }

        else if(Game_Rules.level_2 === true)
        {
            rand_num_display.innerHTML = `${mtd_ans_obj.first_num}-${mtd_ans_obj.second_num}`;
        }

        this.spaceships[mtd_i].appendChild(rand_num_display);   
    },

    populate_spaceship(mtd_ques) //must call populate correct and incorrect answers (Sum and Diff) before this method
    {
        let i = 0;
        let rand_num_display = [];
        rand_num_display[i] = document.createElement("h3");
        this.spaceships[i].style.backgroundColor = mtd_ship_color;

        for(i=0; i < this.spaceships.length; i++)
        {
            rand_num_display[i] = document.createElement("h3");
            rand_num_display[i].innerHTML = `${mtd_ques.first_num}${mtd_ques.operator}${mtd_ques.second_num}`
            this.spaceships[i].appendChild(rand_num_display[i]);
        }

        /*if(i === mtd_ques.correct_ans.position)
            {
                this.spaceships[i]
                //this.display_spaceship_num(i, "red", mtd_ques.correct_ans); //color argument must be passed as string here
            }
            
            else
            {
                if(i === (this.spaceships.length - 1) && mtd_ques.correct_ans.position !== (this.spaceships.length - 1)) //if correct ans is not in last spaceship, one incorrect ans spaceship disappears, this fixes that issue
                {
                    
                    //this.display_spaceship_num(i, "blue", mtd_ques.incorrect_ans[mtd_ques.correct_ans.position]);
                }

                else 
                {
                    
                    //this.display_spaceship_num(i, "unset", mtd_ques.incorrect_ans[i]);
                }
            }    */

    },

    depopulate_spaceship()
    {
        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            //this.spaceships[i].removeChild(this.spaceships[i].childNodes[0])
            let display_val = this.spaceships[i].children[0];
            display_val.remove();
            this.spaceships[i].style.backgroundColor = "unset";
        };
    },

    move_spaceships(mtd_i,mtd_margin) //initialise mtd_margin as 0 in app module
    {
        let i = 0;
        
        //for(i=0; i<this.spaceships.length; i++)
        //{
            this.spaceships[mtd_i].style.marginTop = mtd_margin + "vh";  
        //}
    }, //RETURN LATER TO CONVERT THESE TO % OR VH UNITS !!!

    reset_spaceships(e)
    {
        let i = 0;
        
        if(e === null)
        {
            for(i=0; i<this.spaceships.length; i++)
            {
                this.spaceships[i].style.marginTop = `${0}vh`;      
            }   
        };

        for(i=0; i < this.spaceships.length; i++)
        {
            //this.spaceships[i].style.marginTop += 10 + "vh"; 
            this.spaceships[i].style.animationName = "spaceship, shake_2";
            this.spaceships[i].style.animationDuration = "1s, 4s";
            this.spaceships[i].style.animationDelay = "0s, 2.5s";
            this.spaceships[i].style.animationIterationCount = "1, infinite";
            this.spaceships[i].style.backgroundImage = 'url("../img/spaceship_art_2.png")';
            this.spaceships[i].children[0].style.visibility = "visible";
            
            
            /*this.spaceships[i].style.animationName = "spaceship";
            this.spaceships[i].style.animationDuration = "1s";
            this.spaceships[i].style.animationIterationCount = "1";*/
        }
    },

    populate_gun(mtd_ques)
    {
        const correct_ans_display = document.createElement("h3");
        correct_ans_display.innerHTML = mtd_ques.correct_ans.val;
        this.gun.appendChild(correct_ans_display);
    },

    depopulate_gun()
    {
        let display_val = this.gun.children[0];
        display_val.remove();
    },

    fire_projectile(mtd_margin)
    {
        this.gun_projectile.style.marginBottom = mtd_margin + "vh";
    },

    reset_projectile()
    {
        this.gun_projectile.style.marginBottom = 0;    
    },

    move_gun(mtd_margin) //to be used with keyboard events
    {
        this.gun.style.marginLeft = mtd_margin + "vw";
        this.gun_projectile.style.marginLeft = mtd_margin + "vw";
    },

    reset_gun()
    {
        this.gun.style.left = 0;
        this.gun_projectile.style.left = 0;
    },

    click_position_gun(mtd_margin) //to be used with click/touch events
    {
        this.gun.style.marginLeft = mtd_margin + "vw";
        this.gun_projectile.style.marginLeft = mtd_margin + "vw";
    },

    correct_ship_hit_animate()
    {
        let i = 0;
        
        for(i=0; i < this.spaceships.length; i++)
        {
            this.spaceships[i].style.animationName = "shake";
            this.spaceships[i].style.animationDuration = "0.1s";
            this.spaceships[i].style.backgroundImage = 'url("../img/spaceship-explosion-gif-edited-unscreen.gif")';
            this.spaceships[i].children[0].style.visibility = "hidden";
        }    
    },

    incorrect_ship_hit_animate()
    {
        let i = 0;
        
        for(i=0; i < this.spaceships.length; i++)
        {
            this.spaceships[i].style.animationName = "shake";
            this.spaceships[i].style.animationDuration = "0.8s";
            this.spaceships[i].children[0].style.visibility = "hidden";
        }     
    },

    player_name_display(name)
    {
        this.player_name_disp = this.gamescreen_sides[0].children[1].children[0].children[1];

        this.player_name_disp.innerHTML = name;
    },

    player_tag_display(tag)
    {
        this.player_tag_disp = this.gamescreen_sides[0].children[1].children[1].children[1];

        this.player_tag_disp.innerHTML = tag;
    },

    level_display()
    {
        this.level_disp = this.gamescreen_sides[0].children[1].children[2].children[1]

        if(Game_Rules.level_1 === true)
        {
            this.level_disp.innerHTML = "1 of 2";
        }

        else if(Game_Rules.level_2 === true)
        {
            this.level_disp.innerHTML = "2 of 2";
        }    
    },

    difficulty_display()
    {
        this.difficulty_disp = this.gamescreen_sides[0].children[1].children[3].children[1];

        if(Game_Rules.easy_mode === true)
        {
            this.difficulty_disp.innerHTML = "Easy";      
        }

        else if(Game_Rules.hard_mode === true)
        {
            this.difficulty_disp.innerHTML = "Hard"; 
        }
    },

    timer_display(mtd_countdown_interval, mtd_countdown_initial)
    {       
        this.timer_disp = this.gamescreen_sides[1].children[1].children[0].children[1]; //applying .children to this gives the array of divs holding h3 & h2 tags

        /*player_name_disp : gamescreen_sides[0].children[1].children[0].children[1],
        player_tag_disp : Gameplay_UI.gamescreen_sides[0].children[1].children[0].children[1],
        level_disp : Gameplay_UI.gamescreen_sides[0].children[1].children[0].children[1],
        difficulty_disp : Gameplay_UI.gamescreen_sides[0].children[1].children[0].children[1],
        timer_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[1],
        hit_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[2],
        miss_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[3],
        combo_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[4],
        current_score_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[5],
        highest_score_disp : Gameplay_UI.gamescreen_sides[1].children[1].children[0].children[6],*/

        if(mtd_countdown_interval === mtd_countdown_initial)
        {
            this.timer_disp.innerHTML = mtd_countdown_initial;    
        }
    
        else if(Game_Rules.loaded === true)
        { 
            this.timer_disp.innerHTML = mtd_countdown_interval;

            if(mtd_countdown_interval < 4)
            {
                this.timer_disp.style.fontSize = 1.4 + "rem";
                this.timer_disp.style.animationName = "none"
            }

            if(mtd_countdown_interval <= 0)
            {
                this.timer_disp.innerHTML = "Time's Up!";
  
            }
        }

        else
        {
            this.timer_disp.innerHTML = mtd_countdown_initial;
        }
    },

    hit_display(hit)
    {
        this.hit_disp = this.gamescreen_sides[1].children[1].children[1].children[1];
        this.hit_disp.innerHTML = hit;
    },

    miss_display(miss)
    {
        this.miss_disp = this.gamescreen_sides[1].children[1].children[2].children[1];
        this.miss_disp.innerHTML = miss;
    },

    combo_display(mtd_combo)
    {
        this.combo_disp = this.gamescreen_sides[1].children[1].children[3].children[1];
        this.combo_disp.innerHTML = mtd_combo + "x";
    },

    current_score_display(mtd_score)
    {
        this.current_score_disp = this.gamescreen_sides[1].children[1].children[4].children[1];
        this.current_score_disp.innerHTML = mtd_score;
    },

    highest_score_display(mtd_hiscore)
    {
        this.highest_score_disp = this.gamescreen_sides[1].children[1].children[5].children[1];
        this.highest_score_disp.innerHTML = mtd_hiscore;
    },

    display_level_popup(e)
    {
        this.level_disp_gamescreen = document.createElement("h1");
        this.level_disp_gamescreen.setAttribute("class","level_popup")
        //this.level_disp_gamescreen.setAttribute("id","level_display");
        this.gamescreen.appendChild(this.level_disp_gamescreen);

        if(Game_Rules.level_1 === true && e !== null)
        {
            this.level_disp_gamescreen.innerHTML = "Level 1 Start!!!"
        }

        else if(Game_Rules.level_1 === true && e === null)
        {
            this.level_disp_gamescreen.innerHTML = "Level 1 Complete!!!"   
        }

        else if(Game_Rules.level_2 == true && e !== null)
        {
            this.level_disp_gamescreen.innerHTML = "Level 2 Start!!!"
        }

        else if(Game_Rules.level_2 == true && e === null)
        {
            this.level_disp_gamescreen.innerHTML = "Level 2 Complete!!!"   
        };
        
        this.level_disp_gamescreen.style.position = "absolute";
        this.level_disp_gamescreen.style.maxWidth = 50 + "%";
        this.level_disp_gamescreen.style.marginLeft = "auto";
        this.level_disp_gamescreen.style.marginRight = "auto";
        this.level_disp_gamescreen.style.left = 0;
        this.level_disp_gamescreen.style.right = 0;
        this.level_disp_gamescreen.style.textAlign = "center";
        this.level_disp_gamescreen.style.top = 24 + "vh";
        this.level_disp_gamescreen.style.color = "gold";
        this.level_disp_gamescreen.style.fontSize = 1.6 + "rem";
        this.level_disp_gamescreen.style.userSelect = "none";
        this.level_disp_gamescreen.style.zIndex = 50;
    },

    remove_level_popup()
    {
        this.gamescreen.removeChild(this.level_disp_gamescreen);
        //this.level_disp_gamescreen.style.display = "none";
    },

    display_report_screen(mtd_msg_disp,mtd_name,mtd_tag,mtd_difficulty,mtd_lvl_1_hits,mtd_lvl_2_hits,mtd_lvl_1_misses,mtd_lvl_2_misses,mtd_combo,mtd_hi_score,mtd_score)
    {
        let i = 0;
        
        for(i = 0; i < this.gamescreen.children.length; i++)
        {
            this.gamescreen.children[i].style.display = "none";
        }

        this.gamescreen.style.display = "grid";
        this.gamescreen.style.padding = "12vh 0 34vh 0";
        this.gamescreen.style.gridTemplateRows = "auto";
        this.gamescreen.style.gridTemplateColumns = "1fr";
        this.gamescreen.style.alignItems = "center";

        this.report_disp_gamescreen = document.createElement("img");
        this.report_disp_gamescreen.setAttribute("src","../img/report_screen.jpg");
        this.gamescreen.appendChild(this.report_disp_gamescreen);
        
        this.report_disp_gamescreen.style.position = "absolute";
        this.report_disp_gamescreen.style.zIndex = 10;
        this.report_disp_gamescreen.style.top = 0;
        this.report_disp_gamescreen.style.left = 0;
        this.report_disp_gamescreen.style.width = "100%";
        this.report_disp_gamescreen.style.height = "100%";
        this.report_disp_gamescreen.style.animationName = "report_fade_in";
        this.report_disp_gamescreen.style.animationDuration = "3s";
        this.report_disp_gamescreen.style.animationIterationCount = "1";
        this.report_disp_gamescreen.style.userSelect = "none";
        this.report_disp_gamescreen.style.pointerEvents = "none";

        this.report_disp_data = []; 
        
        for(i = 0; i < 9; i++) //ASK KADEEM WHY WHILE LOOP DOESN'T WORK HERE
        {
            this.report_disp_data[i] = document.createElement("h3");
            this.gamescreen.appendChild(this.report_disp_data[i]);
            this.report_disp_data[i].style.color = "gold";  
            this.report_disp_data[i].style.justifySelf = "center"; 
            this.report_disp_data[i].style.userSelect = "none"; 
            this.report_disp_data[i].style.zIndex = 12;
            this.report_disp_data[i].style.animationName = "report_data";
            this.report_disp_data[i].style.animationDuration = "6s";
        }
  
        this.report_disp_data[0].innerHTML = mtd_msg_disp;
        this.report_disp_data[1].innerHTML = `Player Name: ${mtd_name}`;
        this.report_disp_data[2].innerHTML = `Player Tag: ${mtd_tag}`;
        this.report_disp_data[3].innerHTML = `Difficulty Completed: ${mtd_difficulty}`;
        this.report_disp_data[4].innerHTML = `Hits: ${mtd_lvl_1_hits} (Level 1) + ${mtd_lvl_2_hits} (Level 2) = ${mtd_lvl_1_hits + mtd_lvl_2_hits} (Total)`;
        this.report_disp_data[5].innerHTML = `Misses: ${mtd_lvl_1_misses} (Level 1) + ${mtd_lvl_2_misses} (Level 2) = ${mtd_lvl_1_misses + mtd_lvl_2_misses} (Total)`;
        this.report_disp_data[6].innerHTML = `Most Consecutive Hits: ${mtd_combo}`;
        this.report_disp_data[7].innerHTML = `Highest Score Achieved This Game: ${mtd_hi_score}`;
        this.report_disp_data[8].innerHTML = `Final Score: ${mtd_score}`;
        

        this.report_disp_data[9] = document.createElement("button");
        this.report_disp_data[9].setAttribute("class","buttons");
        this.report_disp_data[9].setAttribute("id","save_exit_report_button");
        this.gamescreen.appendChild(this.report_disp_data[9]);   
        this.report_disp_data[9].style.zIndex = 13; 
        this.report_disp_data[9].innerHTML = "Save and Exit Game"
        this.report_disp_data[9].style.justifySelf = "center"; 
        this.report_disp_data[9].style.animationName = "report_data";
        this.report_disp_data[9].style.animationDuration = "6s";
        this.report_disp_data[9].style.animationIterationCount = "1";
        this.report_disp_data[9].style.width = "30%";
        this.report_disp_data[9].style.height = "100%";
        //this.report_disp_data[9].style.userSelect = "";
        //this.save_exit_report_button = this.report_disp_data[9]; 
     },

    remove_report()
    {
        let i = 0;

        this.gamescreen.style.display = "";
        this.gamescreen.style.padding = "";
        this.gamescreen.style.gridTemplateRows = "";
        this.gamescreen.style.gridTemplateColumns = "";
        this.gamescreen.style.alignItems = "";

        for(i = 0; i < this.gamescreen.children.length; i++)
        {
            this.gamescreen.children[i].style.display = "";
        }

        this.gamescreen.removeChild(this.report_disp_gamescreen);

        for(i = 0; i < this.report_disp_data.length; i++)
        {
            this.gamescreen.removeChild(this.report_disp_data[i]);   
        }
    },

    /*player_name_disp : undefined,
    player_tag_disp : undefined,
    level_disp : undefined,
    difficulty_disp : undefined,
    timer_disp : undefined,
    hit_disp : undefined,
    miss_disp : undefined,
    combo_disp : undefined,
    current_score_disp : undefined,
    highest_score_disp : undefined,*/
}

// ----- ASK KADEEM ABOUT ABSOLUTELY POSITIONING THE GUN WITH RESPECT TO THE GAMESCREEN -----

export default Gameplay_UI

