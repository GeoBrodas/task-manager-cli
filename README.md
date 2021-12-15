### Message from Author (Georgey V B)

Here's how to start using `Task - the Todo app for CLI`!

- Go ahead and make sure you have Node.js installed in your machine first.
- Extract the zip file
- Install all dependencies

```bash
npm install
```

- Next enter the following command to make the package available globally in your machine

```bash
npm link
```

- Next `cd` into the root folder of the project ( which contains all the files - readme.md, task.js, etc)
- Run `task report` to initialise the package.
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
