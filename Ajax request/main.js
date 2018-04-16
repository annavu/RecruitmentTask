// There are employee’s personal data in data.json file. The task is to:
// ● present them in a table and to implement filtering according to each attribute (it is
// recommended to use any datepicker for attribute date type),
// ● do sorting and pagination (5 results for one page),
// It is allowed to use any library, but every functionality (filtering, sorting, pagination) should be
// implemented independently.


   let table = document.querySelector("table");
   let list = document.querySelector(".employees-list");
   let heads = document.querySelectorAll(".table-head");
   let headsArray = [].slice.call(document.querySelectorAll(".table-head"));
   let rows = [];
   
  
  
   function loadEmployees() {
   const xhr = new XMLHttpRequest();

   xhr.open("GET", "data.json");

  
  
   xhr.onload = function load () {
     if(this.status === 200) {
       let employees = JSON.parse(this.response);
      
       employees.forEach(function(employer) {
         const row = document.createElement("tr");
         row.innerHTML = `
         <td class="row">${employer.id}</td>
         <td class="row">${employer.firstName}</td>
         <td class="row">${employer.lastName}</td>
         <td class="row">${employer.dateOfBirth}</td>
         <td class="row">${employer.company}</td>
         <td class="row">${employer.note}</td>
         `
          list.appendChild(row);
          rows.push(row);
       })
     }
   };
   
   xhr.send();
 }



 loadEmployees();
