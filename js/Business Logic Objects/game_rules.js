
const Game_Rules = 
{
    SPECIAL : {}, //Stores post game load promise value
    SPECIAL_2 : {},
    loaded : false,
    easy_mode : false,
    hard_mode : false,
    endless_mode : false,
    level_1 : false,
    level_2 : false,
    hit : false,
    miss : false,
    combo_set : false,
    combo_multiplier : 1.5,
    score_incr : 0,
    score_decr : 0, 

    set_game_loaded()
    {
        this.loaded = true;
    },

    set_level()
    {
        if(this.level_1 == false && this.level_2 == false)
        {
            this.level_1 = true;
        }

        else if(this.level_1 == true)
        {
            this.level_2 = false;
        }

        else if(this.level_2 == true)
        {
            this.level_1 = false;
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

    track_hit()
    {
        if(this.hit == true)
        {
            this.score_incr++;
        }

        if(this.miss == true)
        {
            this.score_decr--;
        }
    },

    set_score_bonus()
    {
        if(hits + 5 == true && miss + 1 == false)
        {

        }
    },
}

export default Game_Rules;