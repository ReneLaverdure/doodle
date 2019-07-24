class UI {
  constructor() {
    //get for theme switching
    this.theming = document.getElementsByClassName('theme');
    this.mainBody = document.querySelector('.bodyTheme');
    //header element
    this.switch = document.querySelector('#mode_switch');
    this.header = document.querySelector("#header");

    this.monthDisplay = document.querySelector(".calendar__dates");
    this.heading = document.querySelector("#display_date");
    this.add = document.querySelector("#add_item");

    //modal elements
    this.modelTitle = document.querySelector('.modal__title');
    this.modelRadio = document.querySelector(".modal__radio");

    this.modal = document.querySelector(".modal");
    this.close = document.querySelector(".modal__close");
    this.radios = document.getElementsByName("level");
    this.new_item = document.querySelector("#new_item");
    this.item_name = document.querySelector("#item_name");

    //display elements
    this.todoList = document.querySelector("#todo_list");
    this.doneList = document.querySelector("#completed_list");

    this.delete = document.querySelector('#delete');

    //calendar elements
    this.currentDates = document.getElementsByClassName('calendar__dates--item');

    this.monthRight = document.querySelector("#cal_right");
    this.monthLeft = document.querySelector("#cal_left");
    this.monthDate = document.querySelector("#month");
    this.monthName = document.querySelector('#month_name');


    this.day = {
      sun: "Sunday",
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday"
    };

    this.month = {
      jan: "January",
      feb: "Febuary",
      mar: "March",
      apr: "April",
      may: "May",
      jun: "June",
      jul: "July",
      aug: "August",
      sep: "September",
      oct: "October",
      nov: "November",
      dec: "December"
    };
  }

//count the number of item each date has to determine giving the date a green yellow or red depending on the number of items logged to the date
  numberOfItems() {
    let elements = Array.from(this.currentDates);

    elements.forEach((ele) => {
      //if ele can be found within the todoitens object
      if(item.todoItems[ele.children[0].id] != undefined){
        // get the ele length
        const todoLength = item.todoItems[ele.children[0].id].length;
        // get ele classlist
        const elementItem = ele.classList;

        //if items is between 1-3 add low class remove medium
        if(todoLength >= 1 && todoLength <= 3) {
          elementItem.add("low");
          elementItem.remove("medium");

        //if items is between 4-6 add medium remove low and high
        } else if(todoLength >= 3 && todoLength <= 6) {
          elementItem.remove("low");
          elementItem.add("medium");
          elementItem.remove("high");
          //if items is greater than 7 remove medium add high
        } else if(todoLength >= 7) {
          elementItem.remove("medium");
          elementItem.add("high");

          //if no items remove the low class
        } else if(todoLength === 0) {
          elementItem.remove("low");
        }
      } 
    })
  }

  // add selected class to clicked item
  selectedItem(date) {
    //get all currently displayed date and covert to array
    let elements = Array.from(this.currentDates);
    //remove the class selected from all items
    elements.forEach((ele) => {
      ele.classList.remove('selected');
      //if item id === date add the selected class
      if(ele.children[0].id == date) {
        ele.classList.add('selected');
      } 
    })
  }

  //changing the theme from light to dark and back
  changeTheme(mode){
    // convert the node elements with the theme class to an array
    let theme = Array.from(this.theming);
    //get the body tag
    const body = this.mainBody;

    //if mode true remove the light mode and add dark mode on all items 
    if(mode === true) {
      theme.forEach((item) => { 
        item.classList.remove("light-mode");
        item.classList.add('dark-mode');
      })
      //make the switch on the body tag 
        body.classList.remove("light-mode-body");
        body.classList.add("dark-mode-body");
      //else remove dark mode and add light mode class to items
    } else if(mode === false) {

      theme.forEach((item) => { 
        item.classList.remove("dark-mode");
        item.classList.add('light-mode');
      })
      //make the switch on the body tag 
      body.classList.remove("dark-mode-body");
      body.classList.add("light-mode-body");
    }
   
  }

  //change month display on the calendar
  changeMonth(month) {
    this.monthName.innerHTML = `${month.monthName}, 2019`
    this.monthDate.innerHTML = month.monthDate;
  }


// update the display with the list items 
  displayItem() {
    //get the item
    let list = item.currentItems();

    let output = ``;
   
    if(list === undefined) {
      output = ``
    } else {
      // for each item create the todo item element and add to the output variable
      list.forEach(item => {
        output += `
          <div class="todo__item ${item.level} theme light-mode" id="${item.id}">
            <h4>${item.name}</h4>
            <div class="todo__icon">
            <p><i id="done" class="fas fa-calendar-check completed"></i></p>
            <p><i id="delete" class="fas fa-times delete"></i></p>
            </div>
  
          </div>
        `
      });
    }
    //add the output variable to todolist element
    this.todoList.innerHTML = output;
  }

// update the display with the list items 
  completedTask() {
        //get the items of completed todos
    let list = item.currentCompletedItems();

    let output = ``;
   
    if(list === undefined) {
      output = ``
    } else {
       // for each item create the completed item element and add to the output variable
      list.forEach(item => {
        output += `
          <div class="todo__item done theme light-mode" id="${item.id}">
            <h4>${item.name}</h4>
            <div class="todo__icon">
            <p><i id="delete" class="fas fa-times delete"></i></p>
            </div>
  
          </div>
        `
      });
      
    }
    //add the output variable to doneList element
    this.doneList.innerHTML = output;
  }

//change the written displayed at the top of display panel, date is gotten from the date element ids
  changeDate(date) {
    // parse out the string to get the need substring for the date num, day, month
    let num = date.substr(3, 2);
    const day = this.day[date.substr(0,3)];
    const month = this.month[date.substr(5, 3)];
    const year = date.substr(8, 4);
    const char = this.dateNum(num);

    if(month === undefined) {
      return;
    }
// if date lower than 09 remove the 0
    if(num <= '09') {
      num = this.cutDate(num);
    }
  // if date "" return
    if(date === ""){
      return 
    } else {
       // else change heading with the updated string
      this.heading.innerHTML = `${num}${char} of ${month}, ${day} `
    }
  }

//reset the modal text inputs
  resetInputs() {
    this.item_name.value = "";
    this.resetRadio();
  }
// reset the modal radio button inputs
  resetRadio() {
    for(var i = 0; i < this.radios.length; i++) {
      this.radios[i].checked = false;
    }
  }

// determine what letter prefix is required for the date number
  dateNum(num){
    if(num == '01'){
      return "st";
    } else if(num == '02') {
      return "nd";
    } else if (num == '03') {
      return "rd";
    } else {
      return "th";
    }
  }

// cut the 0 from a date such as 05
  cutDate(num) {
      return num.substr(1,1);
  }


  displayAlert(afterElement, text){

    this.clearAlert();
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert alert__danger`;
    //add text
    div.appendChild(document.createTextNode(text));
    
    //insert div after everthing tab title
    afterElement.insertAdjacentElement('afterend', div);

    //timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }

    //clear alert message
    clearAlert(){
      const currentAlert = document.querySelector('.alert');
      if(currentAlert){
        currentAlert.remove();
      }
    }

}


  // displayUpdate(display) {
  //   if(display === "todoList") {
  //     ui.createElementItem(item.currentItems(), "todoList")
  //   } else if (display === "done") {
  //     ui.createElementItem(item.currentCompletedItems(), "doneList")
  //     ui.createElementItem(item.currentItems(), "todoList")
  //   }
  // }

  // createElementItem(arr, type) {
  //   let list = arr;
    
  //   let output = ``;

  //   if(list === undefined) {
  //     output = ``
  //   } else if(type === "doneList") {
  //     list.forEach(item => {
  //       output += `
  //         <div class="todo__item done" id="${item.id}">
  //           <h4>${item.name}</h4>
  //           <div class="todo__icon">
  //           <p><i id="delete" class="fas fa-times delete"></i></p>
  //           </div>
  
  //         </div>
  //       `
  //     });

  //     this.doneList.innerHTML = output;

  //   } else if (type === "todoList") {
  //     list.forEach(item => {
  //       output += `
  //         <div class="todo__item ${item.level}" id="${item.id}">
  //           <h4>${item.name}</h4>
  //           <div class="todo__icon">
  //           <p><i id="delete" class="fas fa-times delete"></i></p>
  //           </div>
  
  //         </div>
  //       `
  //     });

  //     this.todoList.innerHTML = output;

  //   }
  // }