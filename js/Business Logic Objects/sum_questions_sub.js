import Question from "./questions_super.js";
import Gameplay_UI from "../UI Logic Objects/gameplayUI.js";
import Game_Rules from "./game_rules.js";

class Sum_Question extends Question
{
    populate_correct_ans_sum() //need to call this method separately
    {
        this.correct_ans.first_num = this.get_rand_first_num();
        this.correct_ans.second_num = this.get_rand_second_num();
        //console.log(`first num ${this.correct_ans.first_num} + second num ${this.correct_ans.second_num}`)
        //console.log(this.incorrect_ans[0].val)
        return this.correct_ans.val = parseInt(this.correct_ans.first_num + this.correct_ans.second_num);
    };

    get_incorrect_ques_sum(mtd_i) //called in populate_incorrect_ans_arr_sum method
    {
        let num;
        this.incorrect_ans[mtd_i] = {first_num : 0, second_num : 0, val : 12345};
        
        //console.log(this.incorrect_ans[mtd_i].val)
        //console.log(this.incorrect_ans.includes(num));
        //console.log(this.incorrect_ans);
        //console.log(this.min_incorrect_ans, this.max_incorrect_ans);
        
        this.incorrect_ans[mtd_i].first_num = this.get_rand_first_num();
        this.incorrect_ans[mtd_i].second_num = this.get_rand_second_num();
        num = parseInt(this.incorrect_ans[mtd_i].first_num + this.incorrect_ans[mtd_i].second_num);

        console.log(this.check_repeat_incorrect_val(num));

        while(num == this.correct_ans.val || this.check_repeat_incorrect_val(num) == true || this.correct_ans.val <= this.incorrect_ans[mtd_i].first_num || num < this.min_incorrect_ans || num > this.max_incorrect_ans)
        {
            this.incorrect_ans[mtd_i].first_num = this.get_rand_first_num();
            this.incorrect_ans[mtd_i].second_num = this.get_rand_second_num();
            num = parseInt(this.incorrect_ans[mtd_i].first_num + this.incorrect_ans[mtd_i].second_num);
        }

        this.incorrect_ans[mtd_i].val = num;

        return `${this.incorrect_ans[mtd_i].first_num} + ${this.incorrect_ans[mtd_i].second_num}`;
    };

    populate_incorrect_ans_arr_sum(mtd_i) //need to call this method separately
    {
        let i = 0;
        //this.populate_correct_ans();
                
        if(Game_Rules.easy_mode == true && Game_Rules.hard_mode == false)
        {   
            if(this.correct_ans.val > 8 && this.correct_ans.val < 28)
            {
                this.min_incorrect_ans = this.correct_ans.val - 6;
                this.max_incorrect_ans = this.correct_ans.val + 6; 
            }

            else if(this.correct_ans.val <= 8)
            {
                this.min_incorrect_ans = this.correct_ans.val - 6;
                this.max_incorrect_ans = this.correct_ans.val + 9;
            }

            else
            {
                this.min_incorrect_ans = this.correct_ans.val - 9;
                this.max_incorrect_ans = this.correct_ans.val + 6;
            }

            for(i=0; i<Gameplay_UI.spaceships.length-1; i++)
            {
                this.get_incorrect_ques_sum(i);
                //const sum = this.incorrect_ans[i].val;
                //console.log(`sum for incorrect array [${i}] = ${sum}`)
            }       
        }
                
        else if(Game_Rules.easy_mode == false && Game_Rules.hard_mode == true)
        {
            if(this.correct_ans.val > 5 && this.correct_ans.val < 31) //IMPORTANT - this prevents crashing if sum values are too low or too high
            {
                this.min_incorrect_ans = this.correct_ans.val - 3;
                this.max_incorrect_ans = this.correct_ans.val + 3;
            }

            else if(this.correct_ans.val <= 5)
            {
                this.min_incorrect_ans = this.correct_ans.val - 3;
                this.max_incorrect_ans = this.correct_ans.val + 6;
            }

            else
            {
                this.min_incorrect_ans = this.correct_ans.val - 6;
                this.max_incorrect_ans = this.correct_ans.val + 3;
            }

            for(i=0; i<Gameplay_UI.spaceships.length-1; i++)
            {
                this.get_incorrect_ques_sum(i);
                //const sum = this.incorrect_ans[i].val;
                //console.log(`sum for incorrect array [${i}] = ${sum}`)
            }       
        };
        //console.log(this.incorrect_ans)
    };
        
}

export default Sum_Question;