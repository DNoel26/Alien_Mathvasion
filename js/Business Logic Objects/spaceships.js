import Gameplay_UI from "../UI Logic Objects/gameplayUI.js";

const Spaceships = 
{
    spaceship = [],

    get_spaceship()
    {
        let i = 0;

        for(i=0; i<Gameplay_UI.spaceships.length; i++)
        {
            this.spaceship[i] = Gameplay_UI.spaceship[i]
        }
    }

}

export default Spaceships;