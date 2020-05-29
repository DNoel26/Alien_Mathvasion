
class Player
{
    first_name;
    last_name;
    gamer_tag;
    player_score = 0;
    player_hits = 0;
    player_misses = 0;
    player_combo = 0;
    player_highscore;
    player_difficulty;
    player_report = {};

    constructor(fn,ln,gt,pd)
    {
        this.first_name = fn;
        this.last_name = ln;
        this.gamer_tag = gt;
        this.player_difficulty = pd;
    }

    get_full_name()
    {
        return this.first_name + this.last_name + (this.gamer_tag);
    }
}

export default Player;