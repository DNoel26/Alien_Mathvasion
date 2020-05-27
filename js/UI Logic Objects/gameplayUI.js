import Question from "../Business Logic Objects/questions_super.js"
import Sum_Question from "../Business Logic Objects/sum_questions_sub.js"
import Diff_Question from "../Business Logic Objects/difference_questions_sub.js"
//import Main_Game from "../gameapp.js"

const Gameplay_UI =
{
    spaceships : document.querySelectorAll(".spaceship"),
    gun : document.querySelector("#gun"),
    gamescreen : document.querySelector("#gamescreen_section"),
    //rand_diff_block : document.createElement("h3")

    display_spaceship_num(mtd_i, mtd_ship_color, mtd_ans_obj) //this is called within populate_spaceship method
    {
        const rand_sum_block = document.createElement("h3");
            
        this.spaceships[mtd_i].style.backgroundColor = mtd_ship_color;
        this.spaceships[mtd_i].style.marginTop = 0;
            
        rand_sum_block.innerHTML = `${mtd_ans_obj.first_num} + ${mtd_ans_obj.second_num}`;

        this.spaceships[mtd_i].appendChild(rand_sum_block);    
    },

    populate_spaceship(mtd_ques) //must call populate correct and incorrect answers (Sum and Diff) before this method
    {
        let i = 0;

        for(i=0; i < this.spaceships.length; i++)
        {
            if(i == mtd_ques.correct_ans.position)
            {
                this.display_spaceship_num(i, "red", mtd_ques.correct_ans); //color argument must be passed as string here
            }
            
            else
            {
                if(i == (this.spaceships.length - 1) && mtd_ques.correct_ans.position != (this.spaceships.length - 1)) //if correct ans is not in last spaceship, one incorrect ans spaceship disappears, this fixes that issue
                {
                    this.display_spaceship_num(i, "green", mtd_ques.incorrect_ans[mtd_ques.correct_ans.position]);
                }

                else
                {
                    this.display_spaceship_num(i, "green", mtd_ques.incorrect_ans[i]);
                }
            }
            
        }
    }
}

export default Gameplay_UI