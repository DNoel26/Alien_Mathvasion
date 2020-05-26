import Question from "../Business Logic Objects/questions_super.js"
import Sum_Question from "../Business Logic Objects/sum_questions_sub.js"
import Diff_Question from "../Business Logic Objects/difference_questions_sub.js"
import Game_App from "../gameapp.js"

const Gameplay_UI =
{
    spaceships : document.querySelectorAll(".spaceship"),
    gun : document.querySelector("#gun"),
    gamescreen : document.querySelector("#gamescreen_section"),
    
    //rand_diff_block : document.createElement("h3")

    populate_spaceship() //must call populate correct and incorrect answers (Sum and Diff) before this method
    {
        const test = new Sum_Question();
        const test2 = new Game_App();
        
        test.populate_correct_ans();
        test.populate_incorrect_ans_arr();

        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            const rand_sum_block = document.createElement("h3");
            
            this.spaceships[i].style.backgroundColor = "green";
            this.spaceships[i].style.marginTop = 0;
            
            rand_sum_block.innerHTML = `${test.correct_ans.first_num} + ${test.correct_ans.second_num}`;

            this.spaceships[i].appendChild(rand_sum_block);
        }
    }
}

export default Gameplay_UI