// radio buttons
//1
let categoryButton=null;
//2
[...categoryRadioButtons].forEach(item=>{
    item.addEventListener("change",(e)=>{
       categoryButton=e.target.value
    })
});
//3
axios.post("http://localhost:3000/todos",{id:Date.now(),title:inputValue,smile:"redSmile",category:categoryButton})