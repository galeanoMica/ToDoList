import { uniqueDate } from "../services/date.js";
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";
import { displayTasks } from "./readTask.js";



export const addTask = (evento) => {

    evento.preventDefault();

    const list = document.querySelector("[data-list]");
    const input = document.querySelector("[data-form-input]");
    const calendar = document.querySelector("[data-form-date]");

    const value = input.value;
    const date = calendar.value;
    
    const dateformat = moment(date).format("DD/MM/YYYY");
    
    if(value == "" || date == "") {
       return;
    };
    
    input.value = '';
    calendar.value = '';

    const complete = false;

    const taskObj = {
        value,
        dateformat,
        complete,
        id: uuid.v4()
    };

    list.innerHTML = "";
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.push(taskObj);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    displayTasks();
}




export const createTask = ({value, dateformat, complete, id}) => {
    
    
    
    const task = document.createElement("li");
    task.classList.add("card");
    

    const taskContent = document.createElement("div");
    
    

    const check = checkComplete(id);

    console.log(complete);
    if(complete) {
        console.log("completar");
        check.classList.toggle("fas");
        check.classList.toggle("completeIcon");
        check.classList.toggle("far");
    }

    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = value;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);
    

    
    //task.innerHTML = content;
    const dateElement = document.createElement("span");
    dateElement.innerHTML = dateformat;
    
    task.appendChild(taskContent);
    task.appendChild(dateElement);
    task.appendChild(deleteIcon());
    
    return task;

    
};