const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const taskFilePath = path.join(__dirname, 'tasks.txt');

function addTask(task){
    fs.appendFile(taskFilePath, `${task}\n` , err => {
        if (err) {
            console.log(`Error: ${err}`);
        }else {
        console.log("The new task was added successfully!");
        }
    });
}


function viewTask (){
    fs.readFile(taskFilePath, 'utf-8' , (err,data) => {
        if(err){
            console.log(`Error : $(err)`)
        }else {
            console.log('Task: ');
            console.log(data);
        }
    })
}

function markTaskComplete(taskNumber) {
    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
        } else {
            let tasks = data.split('\n');
            if (taskNumber <= tasks.length && taskNumber > 0) {
                tasks[taskNumber - 1] += ' - Completed';
                fs.writeFile(taskFilePath, tasks.join('\n'), err => {
                    if (err) {
                        console.error('Error marking task as complete:', err);
                    } else {
                        console.log('Task marked as complete.');
                    }
                });
            } else {
                console.log('Invalid task number.');
            }
        }
    });
}


function removeTask(taskNumber) {
    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
        } else {
            let tasks = data.split('\n');
            if (taskNumber <= tasks.length && taskNumber > 0) {
                tasks.splice(taskNumber - 1, 1);
                fs.writeFile(taskFilePath, tasks.join('\n'), err => {
                    if (err) {
                        console.error('Error removing task:', err);
                    } else {
                        console.log('Task removed successfully.');
                    }
                });
            } else {
                console.log('Invalid task number.');
            }
        }
    });
}


function main() {
    const operation = readline.question('Enter operation (add/view/mark/remove): ');

    switch (operation) {
        case 'add':
            const taskToAdd = readline.question('Enter task to add: ');
            addTask(taskToAdd);
            break;
        case 'view':
            viewTasks();
            break;
        case 'mark':
            const taskToMark = readline.question('Enter task number to mark as complete: ');
            markTaskComplete(parseInt(taskToMark));
            break;
        case 'remove':
            const taskToRemove = readline.question('Enter task number to remove: ');
            removeTask(parseInt(taskToRemove));
            break;
        default:
            console.log('Invalid operation.');
    }
}

// Run the main function
main();