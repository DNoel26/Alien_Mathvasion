import Question from "./questions_super.js";

class Diff_Question extends Question
{
    constructor(first_num, second_num, correct_ans, incorrect_ans)
    {
        super(first_num, second_num, correct_ans, incorrect_ans);
    }
}

export default Diff_Question;