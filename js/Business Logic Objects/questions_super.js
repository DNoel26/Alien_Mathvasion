
class Question 
{
    correct_ans = {first_num : 0, second_num : 0, val : 0}; //first and second num values to be referenced to spaceship innerHTML
    incorrect_ans = []; //get_incorrect_ques to populate this as object array with similar properties to correct_ans
    //nincorrect_ans_rand_num_arr = [];
    easy_mode = false;
    hard_mode = true;
    min_incorrect_ans; //varies for easy/hard mode
    max_incorrect_ans; // same as above

    //random first and second numbers to be stored in objects for later reference
    get_rand_first_num()
    {
        return Math.floor(Math.random()*25 + 1);
    }

    get_rand_second_num()
    {
        return Math.floor(Math.random()*9 + 1);
    }
}

export default Question;