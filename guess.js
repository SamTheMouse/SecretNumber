const prompt = require('prompt')

const random = require('random')

const config = require('./config.json')

const game_name = config["game"]["name"]
const game_version = config["game"]["version"]

const parameters = config["game"]["parameters"]

const min = parameters["number"]["range"]["min"]
const max = parameters["number"]["range"]["max"]

var secret_number

const n_attempts = parameters["attempt_permitted"]

prompt.start()

launch_game(parameters)

function launch_game(parameters) {
    greetings(game_name, game_version)
    game_loop()
}

function greetings(game_name, game_version) {
    console.log(`Welcome in ${game_name}`)
    console.log(`This is the version v${game_version}\n`)
}

function game_loop() {
    console.log("New round..")
    secret_number = init_number(min, max)
    console.log(`secret_number: ${secret_number}`) // for debug purpose only
    let attempts_left = n_attempts
    next_attempt(secret_number, attempts_left)
}

function init_number(min, max) {
    return random.randint(min, max)
}

function next_attempt(secret_number, attempts_left) {
    user_entry(secret_number, attempts_left)
}

function user_entry(secret_number, attempts_left) {
    prompt.get(['number'], function (err, result) {
        if (err) {
            return onPromptError(err)
        }
        proposition = result.number
        console.log(`proposition: ${proposition}`)
        check_proposition(secret_number, proposition, attempts_left);
    })
}

function check_proposition(secret_number, proposed_value, attempts_left) {
    if (proposed_value == secret_number) {
        user_win()
    } else {
        if (attempts_left > 0) {
            attempts_left--
            next_attempt(secret_number, attempts_left)
        } else {
            user_failed()
        }
    }
}

function user_win() {
    console.log("You win !");
}

function user_failed() {
    console.log("You failed !");
}

function onPromptError(err) {
    console.log(err);
    return 1;
}