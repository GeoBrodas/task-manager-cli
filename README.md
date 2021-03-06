### Message from Author (Georgey V B)

Here's how to start using `Task - the Todo app for CLI`!

- Go ahead and make sure you have Node.js installed in your machine first.
- Extract the zip file
- `cd` into the project folder
- Install all dependencies

```bash
npm install
```

- Next enter the following command to make the package available globally in your machine

```bash
npm link
```

- Run `task report` to initialise the package (for the first time).
- After this you can start using the CLI tool from anywhere in the command line. ( try `cd ~`)
- Go ahead and start using the CLI tool by adding `task` before every command.

## Usage/Examples

```bash
$ task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ task del INDEX            # Delete the incomplete item with the given index
$ task done INDEX           # Mark the incomplete item with the given index as complete
$ task help                 # Show usage
$ task report               # Statistics
```

That's pretty much it!

## Feedback

If you have any feedback, please reach out to us at

- https://georgey.codes/feedback
- geobro2310@gmail.com

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://georgey.codes/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/georgeyvb/)

#### Note to evaluator:

One of the tests were on adding multiple tasks, and there was nothing provided in the readme file nor in the video about this, so I was not able to come up with the fix for this! And I was not able to pass 4 tests, because the double quotes were getting entered into the next line, which is not getting matched with the expected results from the tests.
Thankyou!
