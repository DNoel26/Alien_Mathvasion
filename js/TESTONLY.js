
// ONLY FOR STORING TEST FUNCTIONS!!!

// ONE
function bleh() 
{
    setTimeout(function(){

        console.log(Sum_Timer.get_time_elapsed())

        },5000) 

    return new Promise(function(resolve){

        setTimeout(resolve,5000)

    }).then(function(){
       
        setTimeout(function(){

            console.log(Sum_Timer.get_time_elapsed())

            },2000)    
    }).catch(function(){

        setTimeout(function(){

            console.log(Sum_Timer.get_time_elapsed())

            },2000)   
    })
    
}

bleh()

//TWO