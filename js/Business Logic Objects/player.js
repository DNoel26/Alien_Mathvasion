import Game_Rules from "./game_rules.js";

class Player
{
    first_name;
    last_name;
    full_name;
    tag;
    score = 0;
    hit_count = [0,0];
    total_hits = 0;
    miss_count = [0,0];
    total_misses = 0;
    accuracy = 0;
    combo = 0;
    high_score = 0;
    difficulty_completed;
    report = {};

    constructor(fn,ln,pt)
    {
        this.first_name = fn;
        this.last_name = ln;
        this.tag = pt;
    }

    get_full_name()
    {
        return this.full_name = `${this.first_name} ${this.last_name}`;
    }

    set_difficulty()
    {
        if(Game_Rules.easy_mode == true)
        {
            return this.difficulty_completed = "Easy";  
        }

        else if(Game_Rules.hard_mode == true)
        {
            return this.difficulty_completed = "Hard";  
        }
    }

    get_hit_count()
    {
        if(Game_Rules.level_1 == true)
        {
            return this.hit_count[0]++;    
        }

        else if(Game_Rules.level_2 == true)
        {
            return this.hit_count[1]++;
        }   
    }

    get_miss_count()
    {
        if(Game_Rules.level_1 == true)
        {
            return this.miss_count[0]++;    
        }

        else if(Game_Rules.level_2 == true)
        {
            return this.miss_count[1]++;
        }
    }

    get_total_hit_miss()
    {
        this.total_hits = this.hit_count[0] + this.hit_count[1];
        this.total_misses = this.miss_count[0] + this.miss_count[1]
    }

    get_total_hit_percent()
    {
        this.accuracy = `${(this.total_hits / (this.total_hits + this.total_misses))}%`
    }

    get_score()
    {
        if(Game_Rules.hit == true && Game_Rules.miss == false)
        {
            this.combo += 1;

            if(this.combo > Game_Rules.combo_bonus_start)
            {
                this.score += Game_Rules.score_incr * Game_Rules.combo_multiplier;   
            }
            
            else
            {
                this.score += Game_Rules.score_incr;   
            }  
        }

        else if(Game_Rules.hit == false && Game_Rules.miss == true)
        {
            this.score -= Game_Rules.score_decr;
            this.combo = 0;

            if(this.score <= 0)
            {
                this.score = 0;
            }
        }
    }

    get_high_score()
    {
        if(this.score > this.high_score)
        {
            return this.high_score = this.score;    
        }  
    }

    /*get_combo()
    {
        if(this.combo >= Game_Rules.combo_bonus_start)
        {
            this.score += Game_Rules.score_incr * Game_Rules.combo_multiplier;   
        }
    }*/
}

export default Player;