
const Input_Device = 
{
    gamekey : {spacebar : false, left_click : false},

    is_pressed()
    {
        this.gamekey.spacebar = true;
        this.gamekey.left_click = true;
    }
}

export default Input_Device;