const random = require('random')

const config = require('./config.json')

const game_name = config["game"]["name"]
const game_version = config["game"]["version"]

const parameters = config["game"]["parameters"]

const min = parameters["number"]["range"]["min"]
const max = parameters["number"]["range"]["max"]

var secret_number

let attempt_left = parameters["attempt_permitted"]

function init_number(min, max) {
    return random.randint(min, max)
}

function game_loop() {
    secret_number = init_number(min, max)
    console.log("The game started.")
}

function greetings(game_name, game_version) {
    console.log(`Welcome in ${game_name}`)
    console.log(`v${game_version}\n`)
}

function launch_game(parameters) {
    greetings(game_name, game_version)
    game_loop()
}

launch_game()