import Game_Rules from "../Business Logic Objects/game_rules.js";

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
    player_name_disp : undefined,
    player_tag_disp : undefined,
    level_disp : undefined,
    difficulty_disp : undefined,
    timer_disp : undefined,
    hit_disp : undefined,
    miss_disp : undefined,
    combo_disp : undefined,
    current_score_disp : undefined,
    highest_score_disp : undefined,

    //rand_diff_block : document.createElement("h3")

    display_spaceship_num(mtd_i, mtd_ship_color, mtd_ans_obj) //this is called within populate_spaceship method
    {
        const rand_sum_display = document.createElement("h3");
        this.spaceships[mtd_i].style.backgroundColor = mtd_ship_color; //only for testing, comment out here and in argument otherwise 
        rand_sum_display.innerHTML = `${mtd_ans_obj.first_num}+${mtd_ans_obj.second_num}`;
        this.spaceships[mtd_i].appendChild(rand_sum_display);    
    },

    populate_spaceship(mtd_ques) //must call populate correct and incorrect answers (Sum and Diff) before this method
    {
        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            if(i == mtd_ques.correct_ans.position)
            {
                this.display_spaceship_num(i, "unset", mtd_ques.correct_ans); //color argument must be passed as string here
            }
            
            else
            {
                if(i == (this.spaceships.length - 1) && mtd_ques.correct_ans.position != (this.spaceships.length - 1)) //if correct ans is not in last spaceship, one incorrect ans spaceship disappears, this fixes that issue
                {
                    this.display_spaceship_num(i, "unset", mtd_ques.incorrect_ans[mtd_ques.correct_ans.position]);
                }

                else 
                {
                    this.display_spaceship_num(i, "unset", mtd_ques.incorrect_ans[i]);
                }
            }    
        }
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

    move_spaceships(mtd_i, mtd_margin) //initialise mtd_margin as 0 in app module
    {
        /*let i = 0;
        
        for(i=0; i<this.spaceships.length; i++)
        {*/
        this.spaceships[mtd_i].style.marginTop = mtd_margin[mtd_i] + "vh";  
        //}
    }, //RETURN LATER TO CONVERT THESE TO % OR VH UNITS !!!

    reset_spaceships(e)
    {
        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            if(e == undefined)
            {
                this.spaceships[i].style.marginTop = 0;
            } 

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
        this.gun.style.marginLeft = mtd_margin + "%";
        this.gun_projectile.style.marginLeft = mtd_margin + "%";
    },

    reset_gun()
    {
        this.gun.style.left = 0;
        this.gun_projectile.style.left = 0;
    },

    click_position_gun(mtd_margin) //to be used with click/touch events
    {
        this.gun.style.marginLeft = mtd_margin + "%";
        this.gun_projectile.style.marginLeft = mtd_margin + "%";
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

        if(Game_Rules.level_1 == true)
        {
            this.level_disp.innerHTML = "1 of 2";
        }

        else if(Game_Rules.level_2 == true)
        {
            this.level_disp.innerHTML = "2 of 2";
        }    
    },

    difficulty_display()
    {
        this.difficulty_disp = this.gamescreen_sides[0].children[1].children[3].children[1];

        if(Game_Rules.easy_mode == true)
        {
            this.difficulty_disp.innerHTML = "Easy";      
        }

        else if(Game_Rules.hard_mode == true)
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

        if(mtd_countdown_interval == mtd_countdown_initial)
        {
            this.timer_disp.innerHTML = mtd_countdown_initial;    
        }
    
        else if(Game_Rules.loaded == true)
        { 
            this.timer_disp.innerHTML = mtd_countdown_interval;

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

    hit_display()
    {
        this.hit_disp = this.gamescreen_sides[1].children[1].children[1].children[1];
        this.hit_disp.innerHTML = "TEST"
    },

    miss_display()
    {
        this.miss_disp = this.gamescreen_sides[1].children[1].children[2].children[1];
        this.miss_disp.innerHTML = "TEST"
    },

    combo_display()
    {
        this.combo_disp = this.gamescreen_sides[1].children[1].children[3].children[1];
        this.combo_disp.innerHTML = "TEST"
    },

    current_score_display()
    {
        this.current_score_disp = this.gamescreen_sides[1].children[1].children[4].children[1];
        this.current_score_disp.innerHTML = "TEST"
    },

    highest_score_display()
    {
        this.highest_score_disp = this.gamescreen_sides[1].children[1].children[5].children[1];
        this.highest_score_disp.innerHTML = "TEST"
    },

    display_level_popup()
    {
        this.level_disp_gamescreen = document.createElement("h1");
        this.level_disp_gamescreen.setAttribute("id","level_display");
        this.gamescreen.appendChild(this.level_disp_gamescreen);

        if(Game_Rules.level_1 == true)
        {
            this.level_disp_gamescreen.innerHTML = "Level 1 Start!!!"
        }

        else
        {
            this.level_disp_gamescreen.innerHTML = "Level 2 Start!!!"
        };
        
        this.level_disp_gamescreen.style.position = "absolute";
        this.level_disp_gamescreen.style.left = 34.5 + "vw";
        this.level_disp_gamescreen.style.top = 24 + "vh";
        this.level_disp_gamescreen.style.color = "gold";
        this.level_disp_gamescreen.style.fontSize = 2 + "rem";
    },

    remove_level_popup()
    {
        this.level_disp_gamescreen.style.display = "none";
    }
}

// ----- ASK KADEEM ABOUT ABSOLUTELY POSITIONING THE GUN WITH RESPECT TO THE GAMESCREEN -----

export default Gameplay_UI

