import { useState, useEffect } from "react";
function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [oneCategory, setCategory] = useState([]);
  const [delProd, deleteProduct] = useState([]);

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });

  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [viewer3, setViewer3] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://localhost:8081/listProducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
    </div>
  ));

  // function getOneProduct(id) {
  //   console.log(id);
  //   if (id >= 1 && id <= 20) {
  //     fetch("http://127.0.0.1:4000/catalog/" + id)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Show one product :", id);
  //         console.log(data);
  //         setOneProduct(data);
  //       });
  //     if (false === viewer2) setViewer2(true);
  //   } else {
  //     console.log("Wrong number of Product id.");
  //   }
  // }

  // const showOneItem = oneProduct.map((el) => (
  //   <div key={el.id}>
  //     <img src={el.image} width={30} alt="images" /> <br />
  //     Title: {el.title} <br />
  //     Category: {el.category} <br />
  //     Price: {el.price} <br />
  //     Rating: {el.rating} <br />
  //   </div>
  // ));

  // function getCategory(category) {
  //   console.log(category);
  //   fetch("http://127.0.0.1:4000/catalog/" + category)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Show category :", category);
  //       console.log(data);
  //       setCategory(data);
  //     });
  //   if (false === viewer3) setViewer3(true);
  // }

  // const showCategory = oneCategory.map((el) => (
  //   <div key={el.category}>
  //     <img src={el.image} width={30} alt="images" /> <br />
  //     Title: {el.title} <br />
  //     Category: {el.category} <br />
  //     Price: {el.price} <br />
  //     Rating: {el.rating} <br />
  //   </div>
  // ));

  
  function newProduct() {
    fetch("http://localhost:8081/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 99,
            title: "Robot Abraham ALDACO-GASTELUM",
            price: 100.9,
            description: "I robot is one example of an image for my exercise",
            category: "hello",
            image: "https://robohash.org/Abraham",
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((addNewProduct) => {
        setAddNewProduct(addNewProduct);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function deleteProd() {
  // Fetch the value from the input field
  let id = document.getElementById("deleteProductbyId").value;
  console.log(id);
  fetch(`http://localhost:8081/deleteProduct/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: id })
  })
    .then((response) => response.json())
    .then((delProd) => {
      deleteProduct(delProd);
    });
}


  return (
    <div>
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show all available Products.</h3>
        <button onClick={() => getAllProducts()}>Show All ...</button>
        {viewer1 && showAllItems}
      </div>

      <div>
        <h3>Add New Product</h3>
        <button onClick={() => newProduct()}>New Product</button>
      </div>

      <div>
        <h3>Delete Product</h3>
        <input type="number" id="deleteProductbyId" placeholder="Enter Product ID" />
        <button onClick={() => deleteProd()}>Delete Product</button>
      </div>
    </div>
  ); // return end
} // App end
export default App;


// fetch("http://localhost:8081/listProducts")
//   .then((response) => response.json())
//   .then((products) => loadProducts(products));
  
// function loadProducts(products) {
//   var CardProduct = document.getElementById("col");

//   var checkboxes = [];
//   var cards = [];

//   for (var i = 0; i < products.length; i++) {
//     let id = products[i].id;
//     let title = products[i].title;
//     let price = products[i].price;
//     let description = products[i].description;
//     let category = products[i].category
//     let image = products[i].image;

//     let checkbox = "checkbox" + i.toString();
//     let card = "card" + i.toString();

//     let AddCardProduct = document.createElement("div");
//     // add class = “col” to new division for Bootstrap
//     AddCardProduct.classList.add("col");
//     // create Bootstrap card
//     AddCardProduct.innerHTML = `
//         <input type="checkbox" id=${checkbox} class="form-check-input" checked>
//         <label for=${checkbox} class="form-check-label">Show Image ${i}</label>
//         <div id=${card} class="card shadow-sm">
//         <div class="card shadow-sm">
//         <img src=${image} class="card-img-top" alt="..."></img>
//         <div class="card-body">
//         <p class="card-text"> <strong>${id}</strong>, ${title} ${price}</p>
//         <p>${description}</p>
//         <p>${category}</p>
//         <div class="d-flex justify-content-between align-items-center">
//         </div>
//         </div>
//         </div>
//         `;
//     // append new division
//     CardProduct.appendChild(AddCardProduct);

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
// }

// function newProduct() {
// //   fetch(`http://localhost:8081/addRobot`, {
// //     method: "POST",
// //     headers: { "content-type": "application/json" },
// //     body: JSON.stringify({
// //       id: 4,
// //       name: "Robot Abraham ALDACO-GASTELUM",
// //       price: 100.9,
// //       description: "I robot is one example of an image for my exercise",
// //       imageUrl: "https://robohash.org/Abraham",
// //     }),
// //   })
// //     .then((response) => response.json())
// //     .then((addThisRobot) => {
// //       addOneRobot(addThisRobot);
// //     });
// }

// function deleteProduct() {
// //   // Fetch the value from the input field
// //   let id = document.getElementById("deleteRobotById").value;
// //   console.log(id);
// //   fetch(`http://localhost:8081/deleteRobot/${id}`, {
// //     method: "DELETE",
// //     headers: { "content-type": "application/json" },
// //     body: JSON.stringify({ id: id })
// //   })
// //     .then((response) => response.json())
// //     .then((deleteThisRobot) => {
// //       deleteOneRobotById(deleteThisRobot);
// //     });
// }

// function updateProduct() {
// //   // Fetch the value from the input field
// //   let id = document.getElementById("updateRobotById").value;
// //   console.log(id);
// //   fetch(`http://localhost:8081/updateRobot/${id}`, {
// //     method: "PUT",
// //     headers: { "content-type": "application/json" },
// //     body: JSON.stringify({
// //       name: "Robot Abraham ALDACO-GASTELUM",
// //       price: 100.9,
// //       description: "I robot is one example of an image for my exercise",
// //       imageUrl: "https://robohash.org/Abraham",
// //     }),
// //   })
// //     .then((response) => response.json())
// //     .then((updateThisRobot) => {
// //       updateOneRobotById(updateThisRobot);
// //     });
// }

// function getData() {
//   var a = document.getElementById("input_id").value;
//   var message = "user entered this value: " + a;

//   document.getElementById("alert").innerHTML = a;
// }
