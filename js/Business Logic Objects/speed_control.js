import Gameplay_UI from "../UI Logic Objects/gameplayUI.js"
import Game_Rules from "./game_rules.js"

const Speed_Controller = //to be used in Set Intervals timer arg
{
    spaceship_speed_ctrl(mtd_speed)
    {
        if(Game_Rules.hard_mode == true && mtd_speed == "")
        {
            return 1//default value is (Math.random()*5 + 10)*1 in ms  
        }

        else if(Game_Rules.easy_mode == true && mtd_speed == "")
        {
            return (Math.random()*5 + 10)*3 //default value is (Math.random()*5 + 10)*3 in ms      
        }
        
        else
        {
            return mtd_speed
        }
    },

    gun_projectile_speed_ctrl(mtd_speed)
    {
        if(mtd_speed == undefined)
        {
            return 1 //default value in ms  
        }

        else
        {
            return mtd_speed
        }
    },

    /*speed_tester(i)
    {
        for(i = 0; i < Gameplay_UI.spaceships.length; i++)
        {
            return (Math.random()*5)*10
        }
    }*/
}

export default Speed_Controller;