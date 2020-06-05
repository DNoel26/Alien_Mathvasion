
class Timer
{
    start = false;
    end = false;
    start_time = 0;
    elapsed = 0;
    limit;
    countdown = 0;

    constructor(lt)
    {
        this.limit = lt;
    };

    /*get_time_elapsed_date_now()
    {
        return this.elapsed = Date.now() - this.start_time;
    }*/

    restrict_countdown()
    {
        if(this.countdown <= 0 || this.countdown != true)
        {
            return this.countdown = 0;
        }
    };

    get_countdown()
    {
        return this.countdown = parseFloat(this.limit - this.elapsed);
    };

    get_time_elapsed(mtd_count_var)
    {
        return this.elapsed = parseFloat(mtd_count_var - this.start_time);
    };

    start_timer()
    {
        this.start = true;
        this.end = false;
    };

    end_timer()
    {
        if(this.elapsed === this.limit)
        {
            this.end = true;
            this.start = false;

            alert("TIMER END!!!");

            alert(`TIME ELAPSED ${this.elapsed}`);
        }

        /*else if(this.elapsed != this.limit && this.elapsed > 0)
        {
            this.start = true;
            this.end = false;

            return this.elapsed;
        }*/   
    };
}

export default Timer;