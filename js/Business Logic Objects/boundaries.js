
const Boundaries =
{
    check_collision(first_bound, second_bound)
    {      
        let collision = false;

        if(first_bound > second_bound)
        {
            return collision = true;
        }

        else
        {
            return collision = false;
        }
    },
}

export default Boundaries;