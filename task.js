const fs = require('fs');

// returns location, cwd, etc
const args = process.argv;

// current working directory
const CWD = args[1].slice(0, -7);

// create file -> "task.txt" and "done.txt" if not present
if (fs.existsSync(CWD + 'todo.txt') === false) {
  let createStream = fs.createWriteStream('todo.txt');
  createStream.end();
}

if (fs.existsSync(CWD + 'done.txt') === false) {
  let createStream = fs.createWriteStream('done.txt');
  createStream.end();
}

// below are the following functions that will be executed when the user enters the command

// usage message -> ./task help
const showUsageDetails = () => {
  const UsageText = `
    Usage :-
    $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
    $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
    $ ./task del INDEX            # Delete the incomplete item with the given index
    $ ./task done INDEX           # Mark the incomplete item with the given index as complete
    $ ./task help                 # Show usage
    $ ./task report               # Statistics`;

  console.log(UsageText);
};

// controls all the commands via switch case
switch (args[2]) {
  case 'help':
    showUsageDetails();
    break;

  default:
    showUsageDetails();
    break;
}
