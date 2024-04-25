fetch("http://localhost:8081/listProducts")
  .then((response) => response.json())
  .then((products) => loadProducts(products));
  
function loadProducts(products) {
//   var CardRobot = document.getElementById("col");

//   var checkboxes = [];
//   var cards = [];

//   for (var i = 0; i < myRobots.length; i++) {
//     let id = myRobots[i].id;
//     let name = myRobots[i].name;
//     let price = myRobots[i].price;
//     let description = myRobots[i].description;
//     let imageUrl = myRobots[i].imageUrl;

//     let checkbox = "checkbox" + i.toString();
//     let card = "card" + i.toString();

//     let AddCardRobot = document.createElement("div");
//     // add class = “col” to new division for Bootstrap
//     AddCardRobot.classList.add("col");
//     // create Bootstrap card
//     AddCardRobot.innerHTML = `
//         <input type="checkbox" id=${checkbox} class="form-check-input" checked>
//         <label for=${checkbox} class="form-check-label">Show Image ${i}</label>
//         <div id=${card} class="card shadow-sm">
//         <div class="card shadow-sm">
//         <img src=${imageUrl} class="card-img-top" alt="..."></img>
//         <div class="card-body">
//         <p class="card-text"> <strong>${id}</strong>, ${name} ${price}</p>
//         <p>${description}</p>
//         <div class="d-flex justify-content-between align-items-center">
//         </div>
//         </div>
//         </div>
//         `;
//     // append new division
//     CardRobot.appendChild(AddCardRobot);

//     let cbox = document.getElementById(checkbox);
//     checkboxes.push(cbox);
//     let ccard = document.getElementById(card);
//     cards.push(ccard);

//     console.log(checkbox);
//     console.log(card);
//   }

//   console.log(checkboxes);
//   console.log(cards);

//   // Add event listeners to checkboxes to toggle card visibility
//   checkboxes.forEach((checkboxParam, index) => {
//     console.log(index);
//     checkboxParam.addEventListener("change", () => {
//       if (checkboxParam.checked) {
//         cards[index].style.display = "block"; // Show the card
//       } else {
//         cards[index].style.display = "none"; // Hide the card
//       }
//     });
//   });
}

function newProduct() {
//   fetch(`http://localhost:8081/addRobot`, {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       id: 4,
//       name: "Robot Abraham ALDACO-GASTELUM",
//       price: 100.9,
//       description: "I robot is one example of an image for my exercise",
//       imageUrl: "https://robohash.org/Abraham",
//     }),
//   })
//     .then((response) => response.json())
//     .then((addThisRobot) => {
//       addOneRobot(addThisRobot);
//     });
}

function deleteProduct() {
//   // Fetch the value from the input field
//   let id = document.getElementById("deleteRobotById").value;
//   console.log(id);
//   fetch(`http://localhost:8081/deleteRobot/${id}`, {
//     method: "DELETE",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({ id: id })
//   })
//     .then((response) => response.json())
//     .then((deleteThisRobot) => {
//       deleteOneRobotById(deleteThisRobot);
//     });
}

function updateProduct() {
//   // Fetch the value from the input field
//   let id = document.getElementById("updateRobotById").value;
//   console.log(id);
//   fetch(`http://localhost:8081/updateRobot/${id}`, {
//     method: "PUT",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       name: "Robot Abraham ALDACO-GASTELUM",
//       price: 100.9,
//       description: "I robot is one example of an image for my exercise",
//       imageUrl: "https://robohash.org/Abraham",
//     }),
//   })
//     .then((response) => response.json())
//     .then((updateThisRobot) => {
//       updateOneRobotById(updateThisRobot);
//     });
}

function getData() {
  var a = document.getElementById("input_id").value;
  var message = "user entered this value: " + a;

  document.getElementById("alert").innerHTML = a;
}
