var inquirer = require('inquirer');
var axios = require('axios');
var input; 

const start = function(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a service',
            name: 'choice',
            choices: ['Spotify', 'Bands in Town', 'OMDb']
        },
        {
            type: 'input',
            message: 'enter what you want to search',
            name: 'input'
        }

    ]).then(function(res){
        input = res.input;
        var Spot = require('node-spotify-api')
        var spot = new Spot({
            id: 'e7549348c444435caa849784a6479c25',
            secret: 'bb06e546669c4a4ebe48f3e17b93f945',
        })
        console.log(input);

        if (res.choice === 'Spotify'){
            
            spot.search({
                type: 'track',
                query: input,
                limit: 1,
            
            },function(err, songData){
                if (err){
                    console.log(err);
                }
                console.log(JSON.stringify(songData, null, 2));
                again();
            })
        }
        else if(res.choice === 'OMDb'){
            axios.get(`http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=a983636a`).then(
                function(err, movieData){
                    if (err){
                        console.log(err)
                    }
                    console.log(JSON.stringify(movieData, null, 2));
                    again();
                }
            )

        }
        else if(res.choice === 'Bands in Town'){
            axios.get(`https://rest.bandsintown.com/artists/${input}?app_id=codingbootcamp`).then(
                function(err, concertData){
                    if (err){
                        console.log(err)
                    }
                    console.log(JSON.stringify(concertData, null, 2));
                    again();
                }
            )
        }

       
        

    })

}


const again = function(){
    const question = inquirer.prompt([
        {
            type: 'confirm',
            name: 'searchAgain',
            messge: "Would you like to seach again?"
        }
    ])

    if(question.searchAgain === true){
        start();
    }
}

start();