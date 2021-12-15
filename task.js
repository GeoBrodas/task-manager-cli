#!/usr/bin/env node

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
  const UsageText = `Usage :-
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

    // sort array according to priority
    let sortedArray = filteredContent.sort((a, b) => {
      return a.split(' ')[0] - b.split(' ')[0];
    });

    const updatedContent = sortedArray.join('\n');

    // append new data into task.txt
    fs.writeFile(CWD + 'task.txt', updatedContent, (err) => {
      if (err) throw err;
      console.log(`Added Task: "${enteredTask}" with priority ${priority}`);
    });
  } else {
    console.log('Error: Missing tasks string. Nothing added!');
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
      console.log(
        `Error: task with index #${index} does not exist. Nothing deleted.`
      );
    } else {
      filteredArray.splice(index - 1, 1);

      const updatedContent = filteredArray.join('\n');

      fs.writeFile(CWD + 'task.txt', updatedContent, (err) => {
        if (err) throw err;

        console.log(`Deleted task #${index}`);
      });
    }
  } else {
    console.log('Error: Missing NUMBER for deleting tasks.');
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

    if (index > filteredContent.length || index <= 0) {
      console.log(`Error: no incomplete item with index #${index} exists.`);
    } else {
      // extract the task to be shifted to completed.txt
      const removeTask = filteredContent.splice(index - 1, 1);
      const [priority, ...task] = removeTask[0].split(' ');
      const doneTask = task.join(' ');

      // update the new task.txt file with the removed task
      const updatedTaskList = filteredContent.join('\n');

      //   update the task.txt file with the removed task
      fs.writeFile(CWD + 'task.txt', updatedTaskList, (err) => {
        if (err) throw err;
      });

      // write to complted.txt file
      fs.writeFile(
        CWD + 'completed.txt',
        completedTask + '\n' + doneTask,
        (err) => {
          if (err) throw err;
          console.log(`Marked item as done.`);
        }
      );
    }
  } else {
    console.log('Error: Missing NUMBER for marking tasks as done."');
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
    console.log('There are no pending tasks!');
  }

  // map throught all tasks and display
  filteredArray.map((item, index) => {
    const [priority, ...task] = item.split(' ');
    const taskDescription = task.join(' ');
    console.log(`${index + 1}. ${taskDescription} [${priority}]`);
  });
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
  console.log('Pending : ' + filteredIncompleteTasks.length);
  filteredIncompleteTasks.map((task, index) => {
    const [priority, ...taskDescription] = task.split(' ');
    const description = taskDescription.join(' ');
    console.log(`${index + 1}. ${description} [${priority}]`);
  });

  console.log('\n' + 'Completed : ' + filteredCompletedTasks.length);
  filteredCompletedTasks.map((task, index) => {
    console.log(`${index + 1}. ${task}`);
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
