import Question from "./questions_super.js";

class Sum_Question extends Question
{
    populate_correct_ans()
    {
        this.correct_ans.first_num = this.get_rand_first_num();
        this.correct_ans.second_num = this.get_rand_second_num();
        console.log(`${this.correct_ans.first_num} + ${this.correct_ans.second_num}`)
        //console.log(this.incorrect_ans[0].val)
        return this.correct_ans.val = parseInt(this.correct_ans.first_num + this.correct_ans.second_num);
    };

    get_incorrect_ques(mtd_i)
    {
        let num;
        this.incorrect_ans[mtd_i] = {first_num : 0, second_num : 0, val : 12345};
        
        console.log(this.incorrect_ans[mtd_i].val)
        console.log(this.incorrect_ans.includes(num));
        console.log(this.incorrect_ans);
        console.log(this.min_incorrect_ans, this.max_incorrect_ans);
        
        this.incorrect_ans[mtd_i].first_num = this.get_rand_first_num();
        this.incorrect_ans[mtd_i].second_num = this.get_rand_second_num();
        num = parseInt(this.incorrect_ans[mtd_i].first_num + this.incorrect_ans[mtd_i].second_num);

        while(num == this.correct_ans.val || this.incorrect_ans.includes(num) == true || num < this.min_incorrect_ans || num > this.max_incorrect_ans)
        {
            num = parseInt(this.get_rand_first_num() + this.get_rand_second_num());
        } 
        
        this.incorrect_ans[mtd_i].val = num;

        return `${this.get_rand_first_num()} + ${this.get_rand_second_num()}`;
    };

    populate_incorrect_ans_arr()
    {
        let i = 0;
                
        if(this.easy_mode == true && this.hard_mode == false)
        {
            this.min_incorrect_ans = this.correct_ans.val - 10;
            this.max_incorrect_ans = this.correct_ans.val + 10; 

            for(i=0; i<4; i++)
            {
                console.log(this.get_incorrect_ques(i));
                
                console.log(`sum for incorrect array [${i}] = ${sum}`)
            }  
        }
                
        else if(this.easy_mode == false && this.hard_mode == true)
        {
            this.min_incorrect_ans = this.correct_ans.val - 3;
            this.max_incorrect_ans = this.correct_ans.val + 3;

            for(i=0; i<4; i++)
            {
                console.log(this.get_incorrect_ques(i));

                //console.log(`sum for incorrect array [${i}] = ${sum}`)
            }       
        };
    };
        
}

export default Sum_Question;