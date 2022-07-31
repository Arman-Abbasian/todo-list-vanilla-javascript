const todosContainer=document.querySelector("#todosContainer");
const addButton=document.querySelector("#Add");
const addInput=document.querySelector("#addInput")
const searchInput=document.querySelector("#serchInput");
const categoryRadioButtons=document.querySelectorAll(".categoryRadioButton");


let allTodos=null;
let filteredTodos=null;
let inputValue="";
let categoryButton=null;
let changedTodo="";
const filters={input:"",radioButton:"All"};
const choosedcategoty=null;

document.addEventListener("DOMContentLoaded",showTodos);
addInput.addEventListener("change",addInputValueHandler)
addButton.addEventListener("click",addButtonHandler);
searchInput.addEventListener("input",updateFiltersObject);
searchInput.addEventListener("input",updateFiltersObject);


function makeCategoryButtons(){
  const filterButtons=  allTodos.map(item=>item.category);
}

function changeHandler(e,id){
    changedTodo=e.target.value;
    console.log(changedTodo)
}
function addInputValueHandler(e){
    inputValue=e.target.value;
}
    [...categoryRadioButtons].forEach(item=>{
        item.addEventListener("change",(e)=>{
           categoryButton=e.target.value
        })
    });

function changeHandlerr(e){
    e.preventDefault();
    console.log (e,"d")
}
function editTodo(id){
   const choosedTodo= document.querySelector(`#edit${id}`);
   choosedTodo.classList.remove("hidden");
   choosedTodo.classList.add("flex")
}

function submitHandler(e,id){
    let temporary=null;
    e.preventDefault();
    let editedValue=e.target.children[0].children[0].value;
    axios.get(`http://localhost:3000/todos/${id}`).then(res=>{
        axios.put(`http://localhost:3000/todos/${id}`,{...res.data,title:editedValue});
        editedValue=null;
    }).catch(err=>console.log(err));
    
}

function showTodos(){
    axios.get("http://localhost:3000/todos")
    .then(res=>{
        allTodos=res.data;
        makeCategoryButtons();
        searchInputHandler();
        todosContainer.innerHTML="";
        filteredTodos.forEach(todo => {
           todosContainer.innerHTML+=`
           <div class="flex justify-between items-center rounded-md p-3 ${todo.smile==="greenSmile" ? 'bg-green-400' : 'bg-yellow-400'}" id=smile${todo.id}>
                <div><p>${todo.title}</p></div>
                <div id='edit${todo.id}' class='hidden fixed z-10 bg-slate-400 top-0 left-0 opacity-90 w-screen h-screen  items-center justify-center'>
                    <div class='bg-white w-2/3 h-20 rounded-sm flex justify-center items-center'>
                    <form class='flex justify-center items-center gap-2 editForm' id="${todo.id}">
                        <div><input class="editedInput ring-2 ring-themeColor1 rounded-sm px-2 focus:outline-none"  type="text" value=${todo.title}"/></div>
                        <div><input class='bg-themeColor4 px-1 text-white rounded-sm cursor-pointer' type="submit" value="edit"/></div>
                    </form>
                    </div>
                </div>
                <div class="flex justify-between items-center gap-1 w-2/12">
                    <svg xmlns="http://www.w3.org/2000/svg" id="greenSmile${todo.id}" onclick="green(${todo.id})" class="h-10 w-10 cursor-pointer text-green-800 smile ${todo.id} ${todo.smile==="redSmile" ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="redSmile${todo.id}" onclick="red(${todo.id})" class="h-10 w-10 cursor-pointer text-red-800 smile${todo.id} ${todo.smile==="greenSmile" ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="editTodo(${todo.id})" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>  
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="delteTodo(${todo.id})" class="h-10 w-10 cursor-pointer text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                </div>
            </div>
           `
        });
        const [...editTitles]=document.querySelectorAll(".editedInput");
        editTitles.forEach(editTitle=>{
            editTitle.addEventListener("change",(e)=>changeHandler(e,editTitle.id))
        });
        const [...editForms]=document.querySelectorAll(".editForm");
        editForms.forEach(editForm=>{
            editForm.addEventListener("submit",(e)=>submitHandler(e,editForm.id))
        });

    })
    .catch(err=>console.log(err))
};

function updateFiltersObject(e){
filters.input=e.target.value;
showTodos();
}
function searchInputHandler(){
  let searchFilter= allTodos.filter(todo=>todo.title.toLowerCase().includes(filters.input.toLowerCase()));
   let radioButton=searchFilter.filter(todo=>todo.title.toLowerCase().includes(filters.input.toLowerCase()));
   filteredTodos=radioButton;
}

function addButtonHandler(e){
    console.log(e);
    e.preventDefault();
 axios.post("http://localhost:3000/todos",{id:Date.now(),title:inputValue,smile:"redSmile",category:categoryButton})
 .then(res=>{
    e.preventDefault();
    inputValue=""}
    )
 .catch(err=>console.log(err))
};

function red(id){
    const red=document.querySelector(`#redSmile${id}`);
    axios.get(`http://localhost:3000/todos/${id}`).then(res=>{
    axios.put(`http://localhost:3000/todos/${id}`,{...res.data,smile:"greenSmile"})
    })
    // 
    //    const greenSmile=document.querySelector(`#greenSmile${id}`);
    //    const redSmile=document.querySelector(`#redSmile${id}`);
    //    const smile=document.querySelector(`#smile${id}`)
    //    console.log(smile)
    //    greenSmile.classList.remove("hidden");
    //    redSmile.classList.add("hidden");
    //    smile.classList.remove('bg-yellow-400');
    //    smile.classList.add('bg-green-400');
}

function green(id){
    const green=document.querySelector(`#greenSmile${id}`);
    axios.get(`http://localhost:3000/todos/${id}`).then(res=>{
    axios.put(`http://localhost:3000/todos/${id}`,{...res.data,smile:"redSmile"})
    })
    //    const greenSmile=document.querySelector(`#greenSmile${id}`);
    //    const redSmile=document.querySelector(`#redSmile${id}`);
    //    const smile=document.querySelector(`#smile${id}`)
    //    console.log(smile)
    //    redSmile.classList.remove("hidden");
    //    greenSmile.classList.add("hidden");
    //    smile.classList.add('bg-yellow-400');
    //    smile.classList.remove('bg-green-400');
}
function delteTodo(id){
    axios.delete("http://localhost:3000/todos/"+id)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
};

