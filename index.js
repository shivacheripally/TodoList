let tasks = [];
let tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

//create new link and add it into the DOM
function addTaskToDom(task){
    const li = document.createElement('li');
    // console.log("add task to dom : ",task.text);

    li.innerHTML = 
    
    `<div><input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id} id = "text-data">${task.text}</label></div>
    <img src="trash-can-solid.svg" class="delete" data-id="${task.id}" />`;

    tasksList.append(li);
}
// presenets all our items into the box 
function renderList(){
    tasksList.innerHTML = '';
    for(let i = 0;i < tasks.length;++i){
        addTaskToDom(tasks[i]);
        // console.log("for loop",tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}
// it will toggle the particular task based on the given argument
function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId;
    });

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task Toggled Successfully!');
        return;
    }
    showNotification('Could not Toggle the Task');
}
// it will toggle all the tasks
function toggleAllTask(){
    for(let i = 0;i < tasks.length;++i){
        tasks[i].done = true;
        renderList();
    }
}
//delete particular task based on taskId
function deleteTask(taskId){
    const newTask = tasks.filter(function(task){
        return task.id !== taskId;
    });

    tasks = newTask;
    renderList();
    // showNotification('Task Deleted Successfully!');
}
//adding task into the tasks list
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        // showNotification('Task Added Successfully!');
        return;
    }
    showNotification('Task can not be added');
}
//this function used to make notifications using alter
function showNotification(text){
    return window.alert(text);
}
//this function is basically usefull to remove all with in the taskList which is helpfull for clear the list's with in the screen box
function removeAllTasks() {
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
    }
}

//this function will be make the list renderes with keypress enter
function handleInputKeyPress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        // console.log('text : ',text);
        if(!text){
            showNotification('Text should not be empty!');
            return;
        }

        const task = {
            text : text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
        showNotification('Task Added Successfully!');

    }
}
//this works for click events for the whole document and all subpart of those clicks are devided by if-else ladder
function handleClickListener(e){
    const target = e.target;
    // console.log(target);

    if(target.id === 'page-l-icon'){ //when we click on add/plus icon
        const text = addTaskInput.value;
        if(!text){
            showNotification('Text should not be empty!');
            return;
        }

        const task = {
            text : text,
            id: Date.now().toString(),
            done: false
        }

        addTaskInput.value = '';
        addTask(task);
        showNotification('Task Added Successfully!');

    }
    else if(target.className === 'delete'){ //for delete icon
        const taskId = target.dataset.id;
        deleteTask(taskId);
        showNotification('Task Deleted Successfully!');
        return;
    }
    else if(target.className === 'custom-checkbox'){  //for checkbox
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
    else if(target.className === 'Complete-All-Tasks'){  // to mark all tasks to be completed
        
        if(tasks.length == 0){
            showNotification('No Tasks Left To Toggle');
            return;
        }
        toggleAllTask();
        showNotification('Toggled All Tasks');
        return;
    }

    else if(target.className === 'clear-completed-tasks'){  // for deleting all cleared tasks
        let flag = false;
        for(let i = 0;i < tasks.length;++i){
            if(tasks[i].done === true){
                const taskId = tasks[i].id;
                // console.log(taskId);
                deleteTask(taskId);
                flag = true;
            }
        }
        if(flag) showNotification('Cleared All Compelted Tasks');
        else showNotification('No Completed Tasks To Clear');
        return;
    }
    
    else if(target.className === 'deleted-all-tasks'){  //To delete all tasks by one click
        if(tasks.length === 0){
            showNotification('No Tasks Left To Delete');
            return;
        }

        tasks.length = 0;
        tasksCounter.innerHTML = 0;
        showNotification('Deleted All Tasks');
        renderList();
        return;
    }

    else if(target.className === 'all'){  // to appers all the list items
        if(tasks.length == 0){
            showNotification('No Task Added Yet');
        }
        renderList();
        return;
    }

    else if(target.className === 'un-completed'){ // for only the un-completed list items
        if(tasks.length == 0){
            showNotification('No Task Added Yet');
        }
        removeAllTasks();
        for(let i = 0;i < tasks.length;++i){
            if(!tasks[i].done){
                addTaskToDom(tasks[i]);
            }
        }
    }

    else if(target.className === 'completed'){ //for only the completed list items
        if(tasks.length == 0){
            showNotification('No Task Added Yet');
        }
        removeAllTasks();
        for(let i = 0;i < tasks.length;++i){
            if(tasks[i].done){
                addTaskToDom(tasks[i]);
            }
        }
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeyPress); //handles key press events
    document.addEventListener('click',handleClickListener); //handles click events on window
}

initializeApp(); //starting out app 

