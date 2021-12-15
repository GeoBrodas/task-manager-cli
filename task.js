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
  const priority = args[3];
  const enteredTask = args[4];

  let array = [];

  // console.log(priority, enteredTask);

  if (!!enteredTask && !!priority) {
    //   grab previous contents of task.txt
    const fileContent = fs.readFileSync(CWD + 'task.txt').toString();

    array = fileContent.split('\n');

    array.push(`${priority} ${enteredTask}`);

    let filteredContent = array.filter((item) => {
      return item !== '';
    });

    let sortedArray = filteredContent.sort((a, b) => {
      return a.split(' ')[0] - b.split(' ')[0];
    });

    const updatedContent = sortedArray.join('\n');

    // append new data into task.txt
    fs.writeFile(CWD + 'task.txt', updatedContent, (err) => {
      if (err) throw err;
      console.log(`Added Task: ${enteredTask} with priority - ${priority}`);
    });
  } else {
    console.log('Missing task details, please try again!');
    console.log(
      "Make sure you have entered both the priority and task in the format- './task add 2 hello world'"
    );
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
    if (index > filteredArray.length || index <= 0) {
      console.log(`Invalid index ${index}, please try again!`);
    } else {
      filteredArray.splice(index - 1, 1);

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

// list out tasks to do
function listTasks() {
  let array = [];

  const fileContent = fs.readFileSync(CWD + 'task.txt').toString();

  array = fileContent.split('\n');

  // check for empty strings and filter out
  let filteredArray = array.filter((item) => {
    return item !== '';
  });

  // check if filteredArray is empty
  if (filteredArray.length === 0) {
    console.log('No tasks to do');
  }

  // map throught all tasks and display
  console.log('Tasks to complete' + '\n');
  filteredArray.map((item, index) => {
    console.log(`${index} - ${item}`);
  });
  console.log('\n' + 'End');
}

// reports the numbers of completed tasks and todo tasks
function report() {
  let incompleteTasks = [];
  let completedTasks = [];

  // read contents of task.txt and completed.txt
  const tasks = fs.readFileSync(CWD + 'task.txt').toString();
  const completed = fs.readFileSync(CWD + 'completed.txt').toString();

  incompleteTasks = tasks.split('\n');
  completedTasks = completed.split('\n');

  let filteredIncompleteTasks = incompleteTasks.filter((item) => {
    return item !== '';
  });

  let filteredCompletedTasks = completedTasks.filter((item) => {
    return item !== '';
  });

  // start report
  console.log('Tasks to complete: ' + filteredIncompleteTasks.length);
  filteredIncompleteTasks.map((task, index) => {
    console.log(`${index + 1} - ${task}`);
  });

  console.log('\n' + 'Completed Tasks: ' + filteredCompletedTasks.length);
  filteredCompletedTasks.map((task, index) => {
    console.log(`${index + 1} - ${task}`);
  });
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

  case 'ls':
    listTasks();
    break;

  case 'report':
    report();
    break;

  default:
    showUsageDetails();
    break;
}
