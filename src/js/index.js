const todosContainer=document.querySelector("#todosContainer");
console.log(todosContainer);
let allTodos=null;
document.addEventListener("DOMContentLoaded",showTodos);
function showTodos(){
    axios.get("http://localhost:3000/todos")
    .then(res=>{
        allTodos=res.data;
        allTodos.forEach(todo => {
           todosContainer.innerHTML+=`
           <div class="flex justify-between items-center bg-yellow-400 rounded-md p-3" id=smile${todo.id}>
                <div><p>${todo.title}</p></div>
                <div class="flex justify-between items-center w-1/12">
                    <svg xmlns="http://www.w3.org/2000/svg" id="greenSmile${todo.id}" onclick="green(${todo.id})" class="h-6 w-6 text-green-800 hidden smile${todo.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="redSmile${todo.id}" onclick="red(${todo.id})" class="h-6 w-6 text-red-800 smile${todo.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="delteTodo(${todo.id})" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                </div>
            </div>
           `

        });
    })
    .catch(err=>console.log(err))
};
function red(id){
    const red=document.querySelector(`#redSmile${id}`);
       const greenSmile=document.querySelector(`#greenSmile${id}`);
       const redSmile=document.querySelector(`#redSmile${id}`);
       const smile=document.querySelector(`#smile${id}`)
       console.log(smile)
       greenSmile.classList.remove("hidden");
       redSmile.classList.add("hidden");
       smile.classList.remove('bg-yellow-400');
       smile.classList.add('bg-green-400');


        // const greenSmile=document.querySelector(`#greenSmile${id}`);
        // const redSmile=document.querySelector(`#redSmile${id}`);
        // redSmile.style.dispaly="block";
        // greenSmile.style.dispaly="none";
}

function green(id){
    const red=document.querySelector(`#redSmile${id}`);
       const greenSmile=document.querySelector(`#greenSmile${id}`);
       const redSmile=document.querySelector(`#redSmile${id}`);
       const smile=document.querySelector(`#smile${id}`)
       console.log(smile)
       redSmile.classList.remove("hidden");
       greenSmile.classList.add("hidden");
       smile.classList.add('bg-yellow-400');
       smile.classList.remove('bg-green-400');
}
function delteTodo(id){
    axios.delete("http://localhost:3000/todos/"+id)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}
