//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listners
loadEventListners();

//load all event listners
function loadEventListners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded' , getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click' , removeTask);
    //clear all task
    clearBtn.addEventListener('click' , clearTask);
    //filter task event
    filter.addEventListener('keyup' , filterTask);
}

//get tasks from LS
function getTasks(){
    let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node add append to li
    li.appendChild(document.createTextNode(task));
    //create link
    const link =document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

  });

}

//add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('add a task');
    }

    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node add append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create link
    const link =document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
     
// Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
  

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains
        ('delete-item')){
    
            // if(confirm('are u sure')){
        e.target.parentElement.parentElement.remove();

        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task , index){
      if(taskItem.textContent === task) {
          tasks.splice(index, 1);
      }
  });
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

//clear all task
function clearTask(){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // clear all from LS
    clearTaskFromLocalStorage();

}

// clear all from LS
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

//filter search
function filterTask(e) { 
const text = e.target.value.toLowerCase();

document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';

        }

    });

}