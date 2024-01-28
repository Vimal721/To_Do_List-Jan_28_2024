let editItem = null;

function addBtn() {
    let inputValue = document.getElementById('input-value').value.trim();
    let showValue = document.querySelector('.show-value');

    if (inputValue !== '') {
        if (editItem) {
            let listItem = editItem.parentElement.parentElement;
            let taskTextElement = listItem.querySelector('.item-text');
            taskTextElement.textContent = inputValue;

            editItem = null;
        } else {
            let newElement = document.createElement('li');
            newElement.className = 'list-item';

            let itemText = document.createElement('span');
            itemText.className = 'item-text';
            itemText.textContent = inputValue;
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
                showValue.removeChild(newElement);
            };

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(delBtn);
            newElement.appendChild(btnContainer);
            showValue.appendChild(newElement);

            showValue.insertBefore(newElement, showValue.firstChild);
        }

        taskAdded.style.display = 'block';
        setTimeout(function() {
            taskAdded.style.display = 'none';
        }, 2000); 
        
        document.getElementById('input-value').value = '';
    } else {
        taskAlert.style.display = 'block';
        setTimeout(function() {
            taskAlert.style.display = 'none';
        }, 2000);
    }
}
