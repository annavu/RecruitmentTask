// There are employee’s personal data in data.json file. The task is to:
// ● present them in a table and to implement filtering according to each attribute (it is
// recommended to use any datepicker for attribute date type),
// ● do sorting and pagination (5 results for one page),
// It is allowed to use any library, but every functionality (filtering, sorting, pagination) should be
// implemented independently.




//Sorting

//because i didn't know exactly how to manipulate data and have access to them outside the function,
// when they are loaded to HTML from JSON (like in Ajax request folder) I did it like that
// - which I know isn't the best way and exactly correct. In this solution I had access 
//to array with employees personal data and I could do sorting and filtering



let data = [
  {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "dateOfBirth": "1.7.1990 11:35",
    "company": "XSolve",
    "note": 90
  },
  {
    "id": 4,
    "firstName": "Justyna",
    "lastName": "Kowalska",
    "dateOfBirth": "4.02.1976 14:37",
    "company": "XSolve",
    "note": 91
  },
  {
    "id": 2,
    "firstName": "Krzysztof",
    "lastName": "Krawczyk",
    "dateOfBirth": "28.10.1950 2:15",
    "company": "Chilid",
    "note": 27
  },
  {
    "id": 3,
    "firstName": "Bogusław",
    "lastName": "Linda",
    "dateOfBirth": "03.01.1963 23:10",
    "company": "XSolve",
    "note": 50
  },
  {
    "id": 5,
    "firstName": "Krzysztof",
    "lastName": "Kononowicz",
    "dateOfBirth": "10.10.1910 18:00",
    "company": "Chilid",
    "note": 77
  },
  {
    "id": 6,
    "firstName": "Maryla",
    "lastName": "Rodowicz",
    "dateOfBirth": "29.02.1936 11:35",
    "company": "XSolve",
    "note": 8
  }
];


const table = document.querySelector("table");
const list = document.querySelector(".employees-list");
const heads = document.querySelectorAll("thead th");

//convert nodeList into array
const headsArray = [].slice.call(document.querySelectorAll("thead th"));
const rows = [];
  


//creat row for each employer
data.forEach(function(employer) {
  const row = document.createElement("tr");
  row.classList.add("row");
  row.innerHTML = `
  <td class="item">${employer.id}</td>
  <td class="item">${employer.firstName}</td>
  <td class="item">${employer.lastName}</td>
  <td class="item">${employer.dateOfBirth}</td>
  <td class="item">${employer.company}</td>
  <td class="item">${employer.note}</td>
  `;

  list.appendChild(row);
  rows.push(row);
  
})

console.log(rows);


//reset class from headers in table - remove class(arrow) from one header after click on another header
function clear(arr) {
 arr.forEach(function(a) {
  a.className = "";
 })
}



//sorting
function sorted(e) {
 //get index of each clicked header
  let index = headsArray.indexOf(e.target);
  console.log(index);
  const docfr = document.createDocumentFragment();
  //give header class ascending or descending(arrow) depend on what class is already there/if it has any class
  let order = (e.target.className === "" || e.target.className === "desc") ? "asc" : "desc";
  //remove class(arrow) from one header after click on another header
  clear(headsArray);

//compare values in column and sort them ascending and descending with whole row
  rows.sort(function(a,b) {
    let aEmployer = a.children[index].textContent;
    let bEmployer = b.children[index].textContent;
    if(index === 5 || index === 0) {
      return ( order == "asc"? (aEmployer-bEmployer) : (bEmployer-aEmployer));
    } else if(index === 3) {
      return ( order == "asc"? ((aEmployer.match(/\d+/g))[2] - (bEmployer.match(/\d+/g))[2]) : ((bEmployer.match(/\d+/g))[2] - (aEmployer.match(/\d+/g))[2]));
    } else if(aEmployer>bEmployer) {
      return  order === "asc" ? 1 : -1;
    } else {
      return order === "asc" ? -1 : 1;
    }
 
    
 });

//put sorted rows into documentfragment 
  rows.forEach(function(r) {
    docfr.appendChild(r);
  })


  e.target.className = order;

//put sorted rows in tbody
  list.appendChild(docfr);

}


//headers in table - listen for click
headsArray.forEach(function(head) {
     head.addEventListener("click", sorted);
    })




////////////////////////////////////////////////////////


//Filter

const filterInput = document.getElementsByTagName("input");
const filterInputArr = Array.from(document.getElementsByTagName("input"));
console.log(filterInputArr);


//filtering rows depend on values from column
function filterAll(e) {
  //get index of input from input-array
  let index = filterInputArr.indexOf(e.target);
  let tr = table.getElementsByTagName("tr");
  let trArr = Array.from(table.getElementsByTagName("tr"));

  switch(index) {
    case 0:
    let filterValue0 = document.querySelector(".input-id").value.toUpperCase();
    for (i = 1; i < trArr.length; i++) {     
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filterValue0) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
      } 
    };
    break;
    case 1:  
    let filterValue1 = document.querySelector(".input-firstName").value.toUpperCase();
    for (i = 1; i < trArr.length; i++) {     
    let td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filterValue1) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
      } 
    };
    break;
    case 2:
    let filterValue2 = document.querySelector(".input-lastName").value.toUpperCase();
    for (i = 1; i < trArr.length; i++) {     
    let td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filterValue2) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
      } 
    };
    break;
    case 3:
    let filterValue3 = document.querySelector(".input-company").value.toUpperCase();
    for (i = 1; i < trArr.length; i++) {     
    let td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filterValue3) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
      } 
    };
    break;
    default:
    let filterValue4 = document.querySelector(".input-note").value.toUpperCase();
    for (i = 1; i < trArr.length; i++) {     
    let td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filterValue4) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
      } 
    };
  
}
  };

//inputs - listen for keyup
filterInputArr.forEach(function(input) {
 input.addEventListener("keyup", filterAll);
});




