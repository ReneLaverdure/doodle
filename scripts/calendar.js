class Calendar {
  constructor() {
    this.currentMonth = this.currentMonth();

    this.day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    this.month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  }

  // get current month
  currentMonth(){
    let d = new Date()
    let month = d.getMonth();

    return month;
  }

  // get current date and format it into a string
  currentDate() {
    let d = new Date();
    let str = '';
    let date = d.getDate();
    //this is to ensure all num dates has 2 digits
    if(date < 10 ) {
      date = "0" + date
    }

    // get the day string from array
    let day = this.day[d.getDay()];
    //get month string from array
    let month = this.month[d.getMonth()];
    //concat the dates
    str = day + date + month + "2019";

    return str;
  }

  //ensure the dates changes in the object var when the arrow are clicked
  arrowClick(arrow) {
    // when left arrow is clicked decrease value and change month display
    if(arrow === "left" && this.currentMonth > 0) {
      this.currentMonth--
      ui.changeMonth(this.displayMonth());

     // when right arrow is clicked increase value and change month display
    } else if (arrow === "right" && this.currentMonth < months.monthName.length - 1){
      this.currentMonth++
      ui.changeMonth(this.displayMonth());
    }
  }

  //return current month date and month name
  displayMonth() {  
    return {
      monthDate: months.monthDate[this.currentMonth],
      monthName: months.monthName[this.currentMonth]
    }
  }


}