import Gameplay_UI from "../UI Logic Objects/gameplayUI.js"

const Speed_Controller = //to be used in Set Intervals timer arg
{
    spaceship_speed_ctrl(mtd_speed)
    {
        if(mtd_speed == undefined)
        {
            return (Math.random()*5 + 10)*2 //default value is (Math.random()*5 + 10)*5 in ms  
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