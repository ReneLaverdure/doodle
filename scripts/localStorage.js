class Storage {
  constructor() {

  }

  //init the local storage array
  initData() { 
    //if no local storage for todo or completed exist create them
    if(localStorage.getItem('todo') === null || localStorage.getItem('completed') === null) {
      // creating the two object
      let todo = {};
      let completed = {};  

      // set a stringifed object within the todo and completed array 
      localStorage.setItem('todo', JSON.stringify(todo));
      localStorage.setItem('completed', JSON.stringify(completed));
      //parse both local stroage array
      let todoList = JSON.parse(localStorage.getItem('todo'));
      let completedList = JSON.parse(localStorage.getItem('completed'))
      // return an object containing both objects
        return {
          "todoList": todoList,
          "completedList": completedList
      }
      //if local storage contains todo or completed
    } else {
       //parse both local stroage array
      let todoList = JSON.parse(localStorage.getItem('todo'));
      let completedList = JSON.parse(localStorage.getItem('completed'))
      // return an object containing both objects
        return {
          "todoList": todoList,
          "completedList": completedList
      }
    }

  }

  // set a new todo item to the local storage
  setNewItem() {
    //get the todo object
    let itemList = item.todoItems;
    // stringify object
    itemList = JSON.stringify(itemList);
    // set into the todo item in ls
    localStorage.setItem('todo', itemList)   
  }

  // set a new completed item to the local storage
  setCompletedItem() {
    //get the completed object
    let completedList = item.completed;
    // stringify object
    completedList = JSON.stringify(completedList);
    //set into the completed item in ls
    localStorage.setItem('completed', completedList);
  }

}