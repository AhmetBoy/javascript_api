async function getTodos(){

 const response = await fetch("http://localhost:3000/todos")

 const todos = await response.json()

 console.log(todos)

}

