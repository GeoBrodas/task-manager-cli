const fs = require('fs');

// returns location, cwd, etc
const args = process.argv;

// current working directory
const CWD = args[1].slice(0, -7);

// create file -> "task.txt" and "done.txt" if not present
if (fs.existsSync(CWD + 'task.txt') === false) {
  let createStream = fs.createWriteStream('task.txt');
  createStream.end();
}

if (fs.existsSync(CWD + 'completed.txt') === false) {
  let createStream = fs.createWriteStream('completed.txt');
  createStream.end();
}

// below are the following functions that will be executed when the user enters the command

// usage message -> ./task help
function showUsageDetails() {
  const UsageText = `
    Usage :-
    $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
    $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
    $ ./task del INDEX            # Delete the incomplete item with the given index
    $ ./task done INDEX           # Mark the incomplete item with the given index as complete
    $ ./task help                 # Show usage
    $ ./task report               # Statistics`;

  console.log(UsageText);
}

// add a task to task.txt file
function addTask() {
  const enteredTask = args[3];

  if (!!enteredTask) {
    //   grab previous contents of task.txt
    const fileContent = fs.readFileSync(CWD + 'task.txt').toString();

    // append new data into task.txt
    fs.writeFile(CWD + 'task.txt', enteredTask + '\n' + fileContent, (err) => {
      if (err) throw err;

      console.log(`Added Task: ${enteredTask} with priority - `);
    });
  } else {
    console.log('Missing task details, please try again!');
  }
}

// delete task by given *index*
function deleteTask() {
  const index = args[3];

  if (!!index) {
    let array = [];

    const fileContent = fs.readFileSync(CWD + 'task.txt').toString();

    array = fileContent.split('\n');

    // check if the array has any empty strings
    let filteredArray = array.filter((item) => {
      return item !== '';
    });

    // error handling to see if index is valid
    if (index > filteredArray.length || index < 0) {
      console.log(`Invalid index ${index}, please try again!`);
    } else {
      filteredArray.splice(index, 1);

      const updatedContent = filteredArray.join('\n');

      fs.writeFile(CWD + 'task.txt', updatedContent, (err) => {
        if (err) throw err;

        console.log(`Deleted Task of index ${index}`);
      });
    }
  } else {
    console.log('Missing index, please try again!');
  }
}

// mark task as completed by given *index*
function completeTask() {
  const index = args[3];

  if (!!index) {
    let array = [];

    // read contents of task.txt and completed.txt

    const fileContent = fs.readFileSync(CWD + 'task.txt').toString();

    const completedTask = fs.readFileSync(CWD + 'completed.txt').toString();

    array = fileContent.split('\n');

    // remove any elements if it conteins an empty string

    let filteredContent = array.filter((item) => {
      return item !== '';
    });

    // pass the filtered array to the function to check if the index is valid

    if (index > filteredContent.length || index < 0) {
      console.log(`Invalid index ${index}, does not exist`);
    } else {
      // extract the task to be shifted to completed.txt
      const removeTask = filteredContent.splice(index, 1);

      //   update the new task.txt file with the removed task
      const updatedTaskList = filteredContent.join('\n');

      //   update the completed.txt file with the removed task
      fs.writeFile(CWD + 'task.txt', updatedTaskList, (err) => {
        if (err) throw err;
      });

      // write to complted.txt file
      fs.writeFile(
        CWD + 'completed.txt',
        removeTask + '\n' + completedTask,
        (err) => {
          if (err) throw err;
          console.log(`Completed Task of index ${index}`);
        }
      );
    }
  } else {
    console.log('Missing index, please try again!');
  }
}

// controls all the commands via switch case
switch (args[2]) {
  case 'help':
    showUsageDetails();
    break;

  case 'add':
    addTask();
    break;

  case 'del':
    deleteTask();
    break;

  case 'done':
    completeTask();
    break;

  default:
    showUsageDetails();
    break;
}
