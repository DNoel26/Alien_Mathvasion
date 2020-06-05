import Gameplay_UI from "../UI Logic Objects/gameplayUI.js";

const Game_Rules = 
{
    SPECIAL : {}, //Stores post game load promise value
    SPECIAL_TWO : {},
    loaded : false,
    easy_mode : false,
    hard_mode : false,
    endless_mode : false,
    level_1 : false,
    level_2 : false,
    hit : false,
    miss : false,
    combo_bonus_start : 3,
    combo_multiplier : 1.5,
    score_incr : 0,
    score_decr : 0, 
    ship_margin_incr : [0,0,0,0,0],
    rand_sel : 1,

    set_game_loaded()
    {
        this.loaded = true;
    },

    set_level()
    {
        if(this.level_1 === false && this.level_2 === false)
        {
            return this.level_1 = true;
        }

        else if(this.level_1 === true)
        {
            return this.level_2 = false;
        }

        else if(this.level_2 === true)
        {
            return this.level_1 = false;
        }
    },

    set_easy_mode()
    {
        this.easy_mode = true;
        this.hard_mode = false;
        this.score_incr = 10;
        this.score_decr = 10;
    },
    
    set_hard_mode()
    {
        this.hard_mode = true;
        this.easy_mode = false;
        this.score_incr = 20;
        this.score_decr = 20;
    },

    set_ext_randomizer()
    {
        return this.rand_sel = Math.floor(Math.random()*1);
    },

    set_int_randomizer(min, max)
    {
        return Math.random() * (max - min) + min;
    },

    increase_ship_margin()
    {
        /*for(let i = 0; i < Gameplay_UI.spaceships.length; i++)
        {
            this.ship_margin_incr[i] += 0.05;   
        }*/
        
        if(this.rand_sel === 0)
        {
            this.ship_margin_incr[0] += 0.040;
            this.ship_margin_incr[1] += 0.050;
            this.ship_margin_incr[2] += 0.060;
            this.ship_margin_incr[3] += 0.050;
            this.ship_margin_incr[4] += 0.040;
        }

        else if(this.rand_sel === 1)
        {
            this.ship_margin_incr[0] += this.set_int_randomizer(0.025,0.030);
            this.ship_margin_incr[1] += this.set_int_randomizer(0.015,0.020);
            this.ship_margin_incr[2] += this.set_int_randomizer(0.020,0.025);
            this.ship_margin_incr[3] += this.set_int_randomizer(0.015,0.020);
            this.ship_margin_incr[4] += this.set_int_randomizer(0.025,0.030);
        }

        else if(this.rand_sel === 2)
        {
            this.ship_margin_incr[0] += this.set_int_randomizer(0.020,0.025);
            this.ship_margin_incr[1] += this.set_int_randomizer(0.025,0.030);
            this.ship_margin_incr[2] += this.set_int_randomizer(0.015,0.020);
            this.ship_margin_incr[3] += this.set_int_randomizer(0.025,0.030);
            this.ship_margin_incr[4] += this.set_int_randomizer(0.020,0.025);
        }    

        else if(this.rand_sel === 3)
        {
            this.ship_margin_incr[0] += this.set_int_randomizer(0.015,0.030);
            this.ship_margin_incr[1] += this.set_int_randomizer(0.015,0.030);
            this.ship_margin_incr[2] += this.set_int_randomizer(0.015,0.030);
            this.ship_margin_incr[3] += this.set_int_randomizer(0.015,0.030);
            this.ship_margin_incr[4] += this.set_int_randomizer(0.015,0.030);
        }
    },

    reset_ship_margin_incr()
    {
        let i = 0;

        for(i = 0; i < Gameplay_UI.spaceships.length; i++)
        {
            this.ship_margin_incr[i] = 0;   
        }     
    },

    /*track_hit()
    {
        if(this.hit == true)
        {
            this.score_incr++;
        }

        if(this.miss == true)
        {
            this.score_decr--;
        }
    },*/

    /*set_score_bonus()
    {
        if(hits + 5 == true && miss + 1 == false)
        {

        }
    },*/
}

export default Game_Rules;