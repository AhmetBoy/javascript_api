async function getTodos(){

 const response = await fetch("http://localhost:3000/todos")

 const todos = await response.json()

 const list = document.getElementById("todoList")

 list.innerHTML=""

 todos.forEach(todo=>{

  const li=document.createElement("li")

  li.textContent=todo.task

  const deleteBtn=document.createElement("button")
  deleteBtn.textContent="Sil"
  deleteBtn.onclick=()=> deleteTodo(todo.id)

  const updateBtn=document.createElement("button")
  updateBtn.textContent="Düzenle"
  updateBtn.onclick=()=> updateTodo(todo.id)

  li.appendChild(deleteBtn)
  li.appendChild(updateBtn)

  list.appendChild(li)

 })

}



async function addTodo(){
    const input = document.getElementById("todoInput")
    const task = input.value

    await fetch("http://localhost:3000/todos", {
        method:"POST",
        headers:{
            "Content-Type":"application/json" // Backend’e gönderdiğimiz verinin JSON olduğunu söyler.
        },
        body: JSON.stringify({ // JavaScript objesini JSON string'e çevirir.
            task: task
        })
    })
    input.value = ""
    getTodos()
}

async function deleteTodo(id){
    await fetch(`http://localhost:3000/todos/${id}`, {
        method:"DELETE"
    })
    getTodos()
}
async function updateTodo(id){
    const newTask = prompt("Yeni görev gir")

    if(!newTask) return
    await fetch(`http://localhost:3000/todos/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            task: newTask})
    })
    getTodos()
    
}