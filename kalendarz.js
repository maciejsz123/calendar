"use strict";
window.onload = function() {
  createCallendar(new Date().getMonth()+1, new Date().getFullYear());

  let callendar = document.getElementById("callendar");
  callendar.addEventListener("click", showCallendarEntries);

}

const getMonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createCallendar(month, year) {
  //creating Head of table
  let table = document.getElementById("callendar");
  table.innerHTML = "";

  let caption = document.createElement("caption");

  let leftArrow = document.createElement("span");
  leftArrow.setAttribute("id", "leftArrow");
  leftArrow.innerHTML = "◄";
  leftArrow.addEventListener("click", () => {
    if(month===1) {
      createCallendar(12,year-1);
    } else {
      createCallendar(month-1,year);
    }
  });
  let rightArrow = document.createElement("span");
  rightArrow.setAttribute("id", "rightArrow");
  rightArrow.innerHTML = "►";
  rightArrow.addEventListener("click", () => {
    if(month===12) {
      createCallendar(1, year + 1);
    } else {
      createCallendar(month+1,year);
    }
  });

  caption.innerHTML = getMonthName[month-1] + " " + year;
    caption.prepend(leftArrow);
    caption.append(rightArrow);
  table.append(caption);

  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  tr.innerHTML = "<th>pon</th><th>wt</th><th>śro</th><th>czw</th><th>pt</th><th>sob</th><th>nie</th>";
  thead.append(tr);
  table.append(thead);

  //getting dates
  let date = new Date();
  let actualYear = date.getFullYear();
  let actualMonth = date.getMonth()+1;
  let actualDay = date.getDate();

  let firstDayOfMonth = new Date(year,month-1,1).getDay();
  firstDayOfMonth += firstDayOfMonth===0 ? 7 : 0;
  let numberOfDays = new Date(year, month, -1).getDate()+1;
  let numberOfWeeks = 0;
  if((firstDayOfMonth === 7 && numberOfDays >= 30) || (firstDayOfMonth === 6 && numberOfDays === 31)) {
    numberOfWeeks = 6;
  } else if(firstDayOfMonth ===1 && numberOfDays === 28) {
    numberOfWeeks = 4;
  } else {
    numberOfWeeks = 5;
  }
  let daysNumberCounter = 1;

  //creating body of the table
  for(let i=0; i<numberOfWeeks;i++) {
    let tr = document.createElement('tr');
    if(i===0) {
      for(let j=0;j<7;j++) {
        let td = document.createElement('td');
        if(j>=firstDayOfMonth-1) {
          td.innerHTML = daysNumberCounter;
          td.setAttribute("class", "dayInCallendar");
          daysNumberCounter++;
        } else {
          td.innerHTML = "";
        }
        tr.append(td);
      }
    } else {
      for(let j=0;j<7;j++) {
        let td = document.createElement('td');

        if(daysNumberCounter>numberOfDays) {
          td.innerHTML = "";
        } else {
          td.innerHTML = daysNumberCounter;
          td.setAttribute("class", "dayInCallendar");
          daysNumberCounter++;
        }
        tr.append(td);
      }
    }
    table.append(tr);
  }

}

function showCallendarEntries(event) {
  if(event.target.tagName !== "TD" || event.target.innerHTML ==="") return;
  let div = document.querySelector(".callendarEntries");
  div.innerHTML = "";
  let date = document.querySelector("table > caption").childNodes[1].nodeValue;

  let checkedDay = document.getElementById("callendarInputDay").value = event.target.innerHTML;
  let checkedYear = document.getElementById("callendarInputYear").value = date.substring(date.length-4, date.length);
  let checkedMonth = document.getElementById("callendarInputMonth").value = getMonthName.indexOf(date.substring(0, date.length-5))+1;
  let p = document.createElement("p");
  p.innerHTML = checkedDay + "." + checkedMonth + "." + checkedYear;
  div.append(p);

  let arrayOfdates=[];
  for(let i in localStorage) {
    if(i==="key") break;

    arrayOfdates.push([i, localStorage[i]]);
  }
  let deleteButton = document.createElement("span");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.innerHTML = "&#10006";
  deleteButton.addEventListener("click", removeItem);

  function removeItem(event) {
    event.target.closest("p").style="display:none";
    localStorage.removeItem(checkedYear+","+checkedMonth+","+checkedDay+","+event.target.closest('p').innerText.substring(0,5));
  }

  arrayOfdates.forEach( (callendarEntry) => {
    let date = callendarEntry[0].split(",");
    let year = date[0];
    let month = date[1];
    let day = date[2];
    let hour = date[3];
    if(year===checkedYear && Number(month)===checkedMonth && day===checkedDay) {
      let paragraph = document.createElement("p");
      paragraph.innerHTML = hour + " " + callendarEntry[1];
      paragraph.append(deleteButton);
      div.append(paragraph);

    }
  });
}

function makeCallendarEntry(event) {
  let description = event.children[0].value;
  let year = event.children[1].value;
  let month = event.children[2].value;
  let day = event.children[3].value;
  let hour = event.children[4].value;
  localStorage.setItem(year+","+month+","+day+","+hour, description);
}

function clearCallendar() {
  localStorage.clear();
}
