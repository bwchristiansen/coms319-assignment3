//
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
function App() {
  //
  // GET all items
  //
  const Getcatalog = () => {
    // Define hooks
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // useEffect to load products when load page
    useEffect(() => {
      fetch("http://localhost:8081/listProducts")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Products :", data);
          setProducts(data);
        });
    }, []);
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        {/* Show all products using map */}
        {products.map((el) => (
          <div key={el.id}>
            <img src={el.image} alt="product" width={30} />
            <div>ID: {el.id}</div>
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
            {/* <div>Rating: {el.rating}</div> */}
          </div>
        ))}
      </div>
    );
  };

  //
  // POST a new item
  //
  const Postcatalog = () => {
    // Define HOOKS
    const navigate = useNavigate();
    const [addNewProduct, setAddNewProduct] = useState({
      id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: "",
    });

    // Handles new Products
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      fetch("http://localhost:8081/listProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewProduct),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Item added successfully!");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding Product:" + error.message); // Display alert if there's an error
        });
    }; // end handleOnSubmit
    //return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        {/* Form to input data */}
        <form onSubmit={handleSubmit}>
          <h1>Post a New Product</h1>
          <input
            type="text"
            name="id"
            value={addNewProduct.id}
            onChange={handleChange}
            placeholder="ID"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="title"
            value={addNewProduct.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="category"
            value={addNewProduct.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />{" "}
          <br />
          <input
            type="text"
            name="image"
            value={addNewProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />{" "}
          <br />
          {/* <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
          />{" "}
          <br /> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  //
  // PUT item
  //
  const Putcatalog = () => {
    // Define hooks
    const [id, setId] = useState("");
    const [updatedData, setUpdatedData] = useState({});
    const navigate = useNavigate();

    // Function to handle PUT request
    const handleUpdate = () => {
      fetch(`http://localhost:8081/listProducts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log("Updated data:", data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("Error updating product:" + error.message);
        });
    };

    // Return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        {/* Input fields to update data */}
        <input
          type="text"
          placeholder="Update Title"
          onChange={(e) =>
            setUpdatedData({ ...updatedData, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Update Category"
          onChange={(e) =>
            setUpdatedData({ ...updatedData, category: e.target.value })
          }
        />
        <br />
        <input
          type="text"
          placeholder="Update Price"
          onChange={(e) =>
            setUpdatedData({ ...updatedData, price: e.target.value })
          }
        />
        {/* <input
          type="text"
          placeholder="Update Rating"
          onChange={(e) =>
            setUpdatedData({ ...updatedData, rating: e.target.value })
          }
        />
        <br /> */}
        <button onClick={handleUpdate}>Update Item</button>
      </div>
    );
  };
  //
  // DELETE - Delete an item
  //

  const Deletecatalog = () => {
    const [delProd, setDeleteProduct] = useState([]);
    const navigate = useNavigate();

    function deleteProduct() {
      // Fetch the value from the input field
      let id = document.getElementById("deleteProductbyId").value;
      console.log(id);
      fetch(`http://localhost:8081/deleteProduct/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => response.json())
        .then((delProd) => {
          setDeleteProduct(delProd);
        });
    }
    // return
    return (
      <div>
        {/* Buttons to show CRUD */}
        <button onClick={() => navigate("/getcatalog")}>GET Catalog</button>
        <button onClick={() => navigate("/postcatalog")}>
          POST a new Item
        </button>
        <button onClick={() => navigate("/putcatalog")}>
          PUT (modify) an Item
        </button>
        <button onClick={() => navigate("/deletecatalog")}>
          DELETE an Item
        </button>
        {/* Buttons to simulate carousel */}
        {/* <h3>Delete one product:</h3>
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(products[index].id)}>
          Delete
        </button> */}
        {/* Show product properties, one by one */}
        <div>
          <h3>Delete Product</h3>
          <input
            type="number"
            id="deleteProductbyId"
            placeholder="Enter Product ID"
          />
          <button onClick={() => deleteProduct()}>Delete Product</button>
        </div>
      </div>
    );
  };
  return (
    <Router>
      <Routes>
        <Route path="/getcatalog" element={<Getcatalog />} />
        <Route path="/postcatalog" element={<Postcatalog />} />
        <Route path="/putcatalog" element={<Putcatalog />} />
        <Route path="/deletecatalog" element={<Deletecatalog />} />
        <Route path="/" element={<Getcatalog />} /> {/* Default view */}
      </Routes>
    </Router>
  );
} // App end
export default App;
