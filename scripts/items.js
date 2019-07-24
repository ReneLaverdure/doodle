class Items {
  constructor() {
    this.ui = new UI;
    this.storageCtrl = new Storage;
    this.current = "";
    this.id = 0;
    this.todoItems = this.storageCtrl.initData()["todoList"];

    this.completed = this.storageCtrl.initData()["completedList"];
  }
// increase the id count for unique
  idAdd(){
    this.id++
  }

  //get the task 
  getTask(id, action, array) {
    //make id into key
    const key = Number(id);
    let i;
    // go through array if item equal id index = i
    array[this.current].forEach(function(item, index) {
      if(item.id === key) {
        i = index;
      }
    })
    
    //depending on what action that get past in parameter will determine the funtion run 
    if(action === "delete") {
      this.deleteItem(i, this.todoItems);
    } else if(action === "done") {
      this.completedTask(i);
    } else if (action === "delete task") {
      this.deleteItem(i, this.completed);
    }
  } 

  //delete item from a selected array 
  deleteItem(index, array) {
    if(index > -1) {
      array[this.current].splice(index, 1);
    }
  }

//push done todo item to completed array
  completedTask(index) {
    //if array for date doesnt exist create one
    this.setCompletedKey();
    //then push item to the completed array and deleted item in todoItems list
    if(index > -1) {
      this.completed[this.current].push(this.todoItems[this.current][index]);
      this.deleteItem(index, this.todoItems);
    }
  }

  //change current date value
  currentDate(date) {
    this.current = date;
    return this.current;
  }

    //if array for date doesnt exist create one
  setKey(date) {
    if(this.todoItems[date] === undefined) {
      this.todoItems[date] = new Array(); 
    }
  }

    //if array for date doesnt exist create one
  setCompletedKey(){
    const date = this.current;
    if(this.completed[date] === undefined) {
      this.completed[date] = new Array(); 
    }
  }

  //return the items for the current date 
  currentItems() {
    return this.todoItems[this.current];
  }

  //return items of competed items of a date
  currentCompletedItems(){
    return this.completed[this.current];
  }

  //create a new todo item
  newItem() {
    //get modal text input value
    let name = this.itemName();
    //get modal radio input value
    let level = this.radioCheck();
    //get current date
    let date = this.current;
    //set array for the current date
    this.setKey(date);
    //increase id num to ensure all todo item gets unique values
    this.idAdd()
    //create the todo object and push into array
    this.todoItems[date].push({
      "name": name,
      "level": level,
      "id": this.id
    });
   
  }
//get new todo item name from modal text input
  itemName() {
    let newItem = ui.item_name.value
    return newItem;
  }

  // get new todo item importance level value
  radioCheck() {
// loop through all the radio buttons and return the checked radio value
    for(var i = 0, length = ui.radios.length; i < length; i++) {
      if(this.ui.radios[i].checked) {
         return ui.radios[i].value;
      }
    }
    return true;
  }
}