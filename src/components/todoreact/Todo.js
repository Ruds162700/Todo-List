import React, { useState, useEffect } from 'react';
import "./style.css";
import image from './image.png';


//get the local storage back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolis");

  console.log("Data retrieved from local storage:", lists);

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};



const Todo = () => {
  // THIS WILL BE USED FOR HANDLING INPUT DATA
  const [inputData, setInputData] = useState("");
  // This will maintain a list of all todo items
  const [items, setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem] = useState("");
  const [toggleButton,setToggleButton] = useState(false);

  // This will add items to the list
  const addItem = () => {
    if (!inputData) {
      alert("Please Enter Some Data");
    }else if(inputData && toggleButton){
      setItems(
        items.map((element)=>{
           if(element.id===isEditItem){
            return{...element,name:inputData};
           }
           return element;
        })
      )
      setInputData("");
      setIsEditItem("");
      setToggleButton(false);
    } 
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      // Use spread operator to add new object to the list
      setItems([...items, myNewInputData]);
      setInputData(""); // Clear the input field after adding an item
    }
  };
  //this will help in deleting items
  const deleteItem = (index) => {
    const updatedItem = items.filter((element) => {
      return element.id !== index;
    });
    //this will update our list state
    setItems(updatedItem);
  }


  //this will help in deleting all the items from the list
  const removeAll = () => {
    setItems([]);
  };


  //this will help us in editing the selected data
  const editItem = (index) =>{
   const item_todo_edited = items.find((element)=>{
     return index === element.id;
   });
  setInputData(item_todo_edited.name); 
  //this will contain the index of data which we want to change
  setIsEditItem(index);
  //this will show us option to edit
  setToggleButton(true);
  };

  useEffect(() => {
    localStorage.setItem("mytodolis", JSON.stringify(items));
    console.log("Data stored in local storage:", items);
  }, [items]);
  


  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src={image} alt='todo-icon' />
            <figcaption>Add Your List</figcaption>
          </figure>

          <div className="addItems">
            <input
              type='text'
              placeholder='📝 Add Items'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className='form-control'
            />
            
            {
              toggleButton ?(<i className='fa fa-edit add-btn' onClick={addItem}></i>
             ):(<i className='fa fa-plus add-btn' onClick={addItem}></i>)
            }
            
           
          </div>

          {/* Show our data here */}
          <div className='showItems'>
            {items.map((element, index) => {
              return (
                <div className='eachItem' key={element.id}>
                  <h3>{element.name}</h3>
                  <div className='todo-btn'>
                    <i className='far fa-edit add-btn' onClick={()=>editItem(element.id)}></i>
                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(element.id)}></i>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;