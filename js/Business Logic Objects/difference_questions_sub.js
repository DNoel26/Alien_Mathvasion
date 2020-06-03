import Question from "./questions_super.js";
import Gameplay_UI from "../UI Logic Objects/gameplayUI.js";
import Game_Rules from "./game_rules.js";

class Diff_Question extends Question
{
    populate_correct_ans_diff() //need to call this method separately
    {
        this.correct_ans.first_num = this.get_rand_first_num();
        this.correct_ans.second_num = this.get_rand_second_num();
        //console.log(`first num ${this.correct_ans.first_num} + second num ${this.correct_ans.second_num}`)
        //console.log(this.incorrect_ans[0].val)
        return this.correct_ans.val = parseInt(this.correct_ans.first_num - this.correct_ans.second_num);
    };

    get_incorrect_ques_diff(mtd_i) //called in populate_incorrect_ans_arr_sum method
    {
        let num;
        this.incorrect_ans[mtd_i] = {first_num : 0, second_num : 0, val : 54321};
        
        //console.log(this.incorrect_ans[mtd_i].val)
        //console.log(this.incorrect_ans.includes(num));
        //console.log(this.incorrect_ans);
        //console.log(this.min_incorrect_ans, this.max_incorrect_ans);
        
        this.incorrect_ans[mtd_i].first_num = this.get_rand_first_num();
        this.incorrect_ans[mtd_i].second_num = this.get_rand_second_num();
        num = parseInt(this.incorrect_ans[mtd_i].first_num - this.incorrect_ans[mtd_i].second_num);

        console.log(this.check_repeat_incorrect_val(num));

        while(num == this.correct_ans.val || this.incorrect_ans[mtd_i].first_num <= this.incorrect_ans[mtd_i].second_num || this.check_repeat_incorrect_val(num) == true || this.correct_ans.val >= this.incorrect_ans[mtd_i].first_num || num < this.min_incorrect_ans || num > this.max_incorrect_ans)
        {
            this.incorrect_ans[mtd_i].first_num = this.get_rand_first_num();
            this.incorrect_ans[mtd_i].second_num = this.get_rand_second_num();
            num = parseInt(this.incorrect_ans[mtd_i].first_num - this.incorrect_ans[mtd_i].second_num);
        }

        this.incorrect_ans[mtd_i].val = num;

        return `${this.incorrect_ans[mtd_i].first_num} - ${this.incorrect_ans[mtd_i].second_num}`;
    };

    populate_incorrect_ans_arr_diff(mtd_i) //need to call this method separately
    {
        let i = 0;
                
        if(Game_Rules.easy_mode == true && Game_Rules.hard_mode == false)
        {   
            if(this.correct_ans.val < 4)
            {
                this.min_incorrect_ans = this.correct_ans.val - 3;
                this.max_incorrect_ans = this.correct_ans.val + 9; 
            }

            else if(this.correct_ans.val >= 4 && this.correct_ans.val <= 20)
            {
                this.min_incorrect_ans = this.correct_ans.val - 6;
                this.max_incorrect_ans = this.correct_ans.val + 6;
            }

            else
            {
                this.min_incorrect_ans = this.correct_ans.val - 9;
                this.max_incorrect_ans = this.correct_ans.val + 3;
            }

            for(i=0; i<Gameplay_UI.spaceships.length-1; i++)
            {
                this.get_incorrect_ques_diff(i);
            }       
        }
                
        else if(Game_Rules.easy_mode == false && Game_Rules.hard_mode == true)
        {
            if(this.correct_ans.val < 4) //IMPORTANT - this prevents crashing if diff values are too low or too high
            {
                this.min_incorrect_ans = this.correct_ans.val - 2;
                this.max_incorrect_ans = this.correct_ans.val + 4; 
            }

            else if(this.correct_ans.val >= 4 && this.correct_ans.val <= 20)
            {
                this.min_incorrect_ans = this.correct_ans.val - 3;
                this.max_incorrect_ans = this.correct_ans.val + 3;
            }

            else
            {
                this.min_incorrect_ans = this.correct_ans.val - 4;
                this.max_incorrect_ans = this.correct_ans.val + 2;
            }

            for(i=0; i<Gameplay_UI.spaceships.length-1; i++)
            {
                this.get_incorrect_ques_diff(i);
            }       
        };
    };
}

export default Diff_Question;