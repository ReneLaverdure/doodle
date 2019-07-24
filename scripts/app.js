//init all classes
const ui = new UI,
      item = new Items,
      dateCtrl = new Calendar,
      months = new Dates,
      storageCtrl = new Storage;

//on window load rum fuction to make sure all the data that has been localy stored is displayed
window.onload = function() {
  // display the current month on the calendar display
  ui.changeMonth(dateCtrl.displayMonth());

  // set the ui mode
  const mode = ui.switch.checked;
  ui.changeTheme(mode)

  //change display date
  ui.changeDate(dateCtrl.currentDate());
  // change current displayed date to the current day
  item.currentDate(dateCtrl.currentDate());
  // update calendar dates to show the correct colour repeating the number of list items 
  ui.numberOfItems();
  //display the items of the current date in the display panel 
  ui.displayItem();
  //display the completed items of the current date in the display panel
  ui.completedTask();
}


// ====================== Calendar logic ======================
// event on the calendar dates, swithces the selected dates
ui.monthDisplay.addEventListener('click', (e) => {
  //get selected date
  const date = e.target.id;
//if date is none (the dulled out dates) it wont select
  if(date != "") {
    //else change the display panel date
    ui.changeDate(date);
    //change current in the item class 
    item.currentDate(date);
    //display todo list items of selected date in display panel
    ui.displayItem();
    //display competed todo list items of selected dates
    ui.completedTask();
    // add selected class to clicked item
    ui.selectedItem(date);
    // make sure the next month item display the correct theme mode
    const mode = ui.switch.checked;
    ui.changeTheme(mode);
  }


})

//right month arrow will change display next month
ui.monthRight.addEventListener('click', () => {
  dateCtrl.arrowClick("right");
  const mode = ui.switch.checked;
  // make sure the next month item display the correct theme mode
  ui.changeTheme(mode)
})

//left month arrow will change display previous month
ui.monthLeft.addEventListener('click', () => {
  dateCtrl.arrowClick("left");
  const mode = ui.switch.checked;
  // make sure the next month item display the correct theme mode
  ui.changeTheme(mode)
})

//change the view mode
ui.switch.addEventListener('click', () => {
  const mode = ui.switch.checked;
  //changes the theme
  ui.changeTheme(mode)
})


// =============== MODAL DISPLAY LOGIC ===============
// when the add plus icon is clicked display modal
ui.add.addEventListener('click', () => {
  ui.modal.style.display = "block";
})

// if click is outside of the modal change modal display to none 
window.addEventListener("click", (e) => {
  if (e.target === ui.modal) {
    ui.modal.style.display = "none";
  }
})

//if cross is clicked within modal display none
ui.close.addEventListener('click', () => {
  ui.modal.style.display = "none";
})

// ================= ADDING A NEW LIST ITEM =================
// Event when add new item button is clicked
ui.new_item.addEventListener('click', () => {
// if item name input is empty display alert
  if(this.item_name.value === ""){
    ui.displayAlert(ui.modelTitle,"New todo item must include text");
//if item radio importance isnt checked display alert
  } else if (item.radioCheck() === true) {
    ui.displayAlert(ui.modelRadio,"Please select a value");
  } else {
    //else add new list item
    item.newItem();
    // reset all inputs within the modal
    ui.resetInputs();
    //update display panel to show new itemm
    ui.displayItem();
    //turn off modal
    ui.modal.style.display = "none";
    //update selected date in the calendar to display the approiate colour
    ui.numberOfItems() 
    //set item in the local storage object
    storageCtrl.setNewItem();

  }
})

//event for the created todo list items
ui.todoList.addEventListener('click', (e) => {
 //if the delete icon clicked 
  if(e.target.id === "delete") {
    //get the item id
    const id = e.target.parentElement.parentElement.parentElement.id;
    // get the todo item id and delete
    item.getTask(id, 'delete', item.todoItems);
    //update display panel to showing todo items
    ui.displayItem();
    //update the number of items shown by the calendar colour if needed
    ui.numberOfItems();
    // update the local storage object for the todo list
    storageCtrl.setNewItem();
    //if the done icon is clicked
  } else if(e.target.id === "done") {
    //get the item id
    const id = e.target.parentElement.parentElement.parentElement.id;
    // get the todo item id in and set to completed
    item.getTask(id, 'done', item.todoItems);
    //update display panel to showing todo items
    ui.displayItem();
    //update the completed items display
    ui.completedTask();
    //update the number of items shown by the calendar colour if needed
    ui.numberOfItems();
    // update the local storage object for the todo list
    storageCtrl.setNewItem();
    // update the local storage object for completed list
    storageCtrl.setCompletedItem();
  }
})

// event for the completed list items
ui.doneList.addEventListener('click', (e) => {
  //if the deleted icon is clicked
    if(e.target.id === "delete") {
      //get item id
      const id = e.target.parentElement.parentElement.parentElement.id;
      // pass id to function that will remove the completed item form list
      item.getTask(id, 'delete task', item.completed)
      //update the completed items display
      ui.completedTask();
       // update the local storage object for completed list
      storageCtrl.setCompletedItem();
    }
})

