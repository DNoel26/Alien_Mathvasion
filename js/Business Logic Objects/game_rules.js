
const Game_Rules = 
{
    easy_mode : false,
    hard_mode : true,
    level : [1,2],
    combo_set : false,
    combo_multiplier : 1.5,
    score_incr : 10,
    score_decr : 10, 

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

    set_score_bonus()
    {
        if(hits + 5 == true && miss + 1 == false)
        {

        }
    },
}

export default Game_Rules;