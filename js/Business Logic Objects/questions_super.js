
class Question 
{
    correct_ans = {first_num : 0, second_num : 0, val : 0, position : 0}; //first and second num values to be used as references for spaceship innerHTML
    incorrect_ans = []; //get_incorrect_ques to populate this as object array with similar properties to correct_ans
    //easy_mode = false;
    //hard_mode = true;
    min_incorrect_ans; //varies for easy/hard mode
    max_incorrect_ans; // same as above
    max_first_num = 25;
    max_second_num = 9;

    //random first and second numbers to be stored in objects for later reference
    get_rand_first_num()
    {
        return Math.floor(Math.random()*this.max_first_num + 1);
    }

    get_rand_second_num()
    {
        return Math.floor(Math.random()*this.max_second_num + 1);
    }

    check_repeat_incorrect_val(num) //for use within this class
    {
        let repeat_val = false;

        if(this.incorrect_ans.some(function(ans){
            return ans.val === num
        }))
            {
                console.log(`value of ${num} already exists`);

                repeat_val = true;
            }

        if(repeat_val == true)
        {
            return true;
        }

        else
        {
            return false;
        }
    }

    position_meth(fn_val) //for use within this class
    {
        return this.correct_ans.position = fn_val;
    }

    select_correct_ans_position()
    {
        let num = Math.floor(Math.random()*5);
        
        if(num == 0)
        {
            this.position_meth(0); //reference to 1st spaceship (from left) i.e. spaceship[0]
        }

        else if(num == 1)
        {
            this.position_meth(1);
        }

        else if(num == 2)
        {
            this.position_meth(2);
        }

        else if(num == 3)
        {
            this.position_meth(3);
        }

        else
        {
            this.position_meth(4); //reference to 5th spaceship (from left) i.e. spaceship[4]
        }
    }
}

export default Question;