let editItem = null;
let showValue = document.querySelector('.show-value');
let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }
});

function addBtn() {
    let inputValue = document.getElementById('input-value').value.trim();

    if (inputValue !== '') {
        if (editItem) {
            let index = editItem.parentElement.parentElement.dataset.id;
            tasks.splice(index, 1);
            tasks.unshift(inputValue);
            let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];

            checkboxStates.splice(index, 1);
            checkboxStates.unshift(false);

            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
            localStorage.setItem('tasks', JSON.stringify(tasks));

            renderTasks();
            editItem = null;
        } else {
            tasks.unshift(inputValue);
            let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
            checkboxStates.unshift(false); 
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();

        document.getElementById('input-value').value = '';

        taskAdded.style.display = 'block';
        setTimeout(function() {
            taskAdded.style.display = 'none';
        }, 2000); 
    } else {
        taskAlert.style.display = 'block';
        setTimeout(function() {
            taskAlert.style.display = 'none';
        }, 2000);
    }
}

function renderTasks() {
    showValue.innerHTML = '';

    tasks.forEach((task, index) => {
        let newElement = document.createElement('div');
        newElement.className = 'list-item';
        newElement.dataset.id = index;
        showValue.prepend(newElement);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        newElement.appendChild(checkbox);

        let itemText = document.createElement('span');
        itemText.className = 'item-text';
        itemText.textContent = task;
        newElement.appendChild(itemText);

        let btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';

        let editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        
        editBtn.addEventListener('click', function (event) {
            event.stopPropagation(); 

            let listItem = this.parentElement.parentElement;
            let taskTextElement = listItem.querySelector('.item-text');
            let taskText = taskTextElement.textContent.trim();
            document.getElementById('input-value').value = taskText;
    
            editItem = event.target;
        });

        let delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';

        delBtn.onclick = function () {
            let index = this.parentElement.parentElement.dataset.id;
            tasks.splice(index, 1);
            let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];

            checkboxStates.splice(index, 1); 
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates)); 
            renderTasks();

        };

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(delBtn);
        newElement.appendChild(btnContainer);
        showValue.appendChild(newElement);

        let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
        if (checkboxStates && checkboxStates[index]) {
            checkbox.checked = true;
            itemText.style.textDecoration = 'line-through';
            itemText.style.opacity = '0.5';
            editBtn.style.opacity = '0.6';
            disableButtonsInContainer(editBtn, true); 
        }

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                itemText.style.textDecoration = 'line-through';
                itemText.style.opacity = '0.5';
                editBtn.style.opacity = '0.6';
                newElement.style.backgroundColor = '#f9f6f6e9'; 
                disableButtonsInContainer(editBtn, true); 
            } else {
                itemText.style.textDecoration = 'none';
                itemText.style.opacity = '1';
                editBtn.style.opacity = '1';
                newElement.style.backgroundColor = '#fff'; 
                disableButtonsInContainer(editBtn, false); 
            }

            let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
            checkboxStates[index] = this.checked;
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
        });
    });
}

function disableButtonsInContainer(container, disable) {
    let editBtn = container.querySelector('.edit-btn');
    if (editBtn) { 
        editBtn.disabled = disable; 
    }
}
