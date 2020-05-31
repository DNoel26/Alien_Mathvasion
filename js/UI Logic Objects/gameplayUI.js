
const Gameplay_UI =
{
    spaceships : document.querySelectorAll(".spaceship"),
    gun : document.querySelector("#gun"),
    gamescreen : document.querySelector("#gamescreen_section"),
    gun_projectile : document.querySelector("#gun_projectile"),
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
        this.spaceships[mtd_i].style.marginTop = mtd_margin[mtd_i] + "%";  
        //}
    }, //RETURN LATER TO CONVERT THESE TO % OR VH UNITS !!!

    reset_spaceships(e)
    {
        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            if(e == null)
            {
                this.spaceships[i].style.marginTop = 0;
            } 
            
            this.spaceships[i].children[0].style.visibility = "visible";
            this.spaceships[i].style.backgroundImage = 'url("../img/spaceship_art_2.png")';
            
            this.spaceships[i].style.animationName = "shake_2";
            this.spaceships[i].style.animationDuration = "4s";
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
        this.gun_projectile.style.marginBottom = mtd_margin + "px";
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

    correct_ship_hit()
    {
        let i = 0;
        
        for(i=0; i < this.spaceships.length; i++)
        {
            this.spaceships[i].style.backgroundImage = 'url("../img/spaceship-explosion-gif-edited-unscreen.gif")';
            
            this.spaceships[i].children[0].style.visibility = "hidden";
        }    
    },

    incorrect_ship_hit()
    {
        let i = 0;
        
        for(i=0; i < this.spaceships.length; i++)
        {
            this.spaceships[i].style.animationName = "shake";
            this.spaceships[i].style.animationDuration = "0.8s";
        }     
    }
}

// ----- ASK KADEEM ABOUT ABSOLUTELY POSITIONING THE GUN WITH RESPECT TO THE GAMESCREEN -----

export default Gameplay_UI

