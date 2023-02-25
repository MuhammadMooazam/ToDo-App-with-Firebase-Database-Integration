var list = document.getElementById("list");

function addTodo() {
    var todo = document.getElementById("todo");

    //Saving the value in Firebase Database
    var key = firebase.database().ref("todo").push().key;
    var todo = {
        value: todo.value,
        key: key
    };
    firebase.database().ref('todo/' + key).set(todo);
}

function getDataOnMethod() {
    firebase.database().ref('todo').on('child_added', function (data) {

        //Create ID tag with text node
        var li = document.createElement("li");
        var liText = document.createTextNode(data.val().value);
        li.appendChild(liText);

        //Create Delete Button
        var delBtn = document.createElement("button");
        var delText = document.createTextNode("Delete");
        delBtn.setAttribute("class", "delBtn");
        delBtn.setAttribute("id", data.val().key);
        delBtn.setAttribute("onclick", "deleteItem(this)");
        delBtn.appendChild(delText);

        //Create Edit Button
        var editBtn = document.createElement("button");
        var editText = document.createTextNode("Edit");
        editBtn.setAttribute("class", "editBtn");
        editBtn.setAttribute("id", data.val().key);
        editBtn.setAttribute("onclick", "editItem(this)");
        editBtn.appendChild(editText);

        //Showing it on screen
        li.appendChild(delBtn);
        li.appendChild(editBtn);
        list.appendChild(li);

        //Clearing the box for next value
        todo.value = "";
        console.log(li);
    })
}

getDataOnMethod();


function deleteAll() {
    list.innerHTML = "";
    firebase.database().ref('todo').remove();
}

function deleteItem(e) {
    e.parentNode.remove();
    firebase.database().ref('todo/' + e.id).remove();
}

function editItem(e) {
    var value = e.parentNode.firstChild.nodeValue;
    var editValue = prompt("Enter Value", value);
    e.parentNode.firstChild.nodeValue = editValue;
    var editTodo = {
        value: editValue,
        key: e.id
    };
    firebase.database().ref('todo/' + e.id).set(editTodo);
}