import Gameplay_UI from "../UI Logic Objects/gameplayUI.js";

const Boundaries =
{
    check_collision(first_bound, second_bound)
    {      
        if(first_bound >= second_bound)
        {
            return true;
        }

        else
        {
            return false;
        }
    },

    check_remaining_distance_left()
    {
        return Gameplay_UI.gamescreen.getBoundingClientRect().left + Gameplay_UI.gun.clientWidth; 
    },

    check_remaining_distance_right()
    {
        return Gameplay_UI.gamescreen.getBoundingClientRect().right - Gameplay_UI.gun.clientWidth; 
    },
}

export default Boundaries;