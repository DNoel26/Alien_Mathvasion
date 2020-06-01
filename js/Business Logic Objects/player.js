import Game_Rules from "./game_rules.js";

class Player
{
    first_name;
    last_name;
    full_name;
    tag;
    score = 0;
    hit_count = 0;
    miss_count = 0;
    combo = 0;
    highscore;
    difficulty_completed;
    report = {};

    constructor(fn,ln,pt)
    {
        this.first_name = fn;
        this.last_name = ln;
        this.player_tag = pt;
    }

    get_full_name()
    {
        return this.full_name = `${this.first_name} ${this.last_name}`;
    }

    get_hit_count()
    {
        return this.hit_count++;
    }

    get_miss_count()
    {
        return this.miss_count++;
    }

    get_score()
    {   
        this.player_score = Game_Rules.score_incr
    }
}

export default Player;