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
        {/* Bootstrap CSS link */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />

        {/* Your navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            {/* Navbar brand */}
            <h1 className="navbar-brand">FakeStore Catalog</h1>

            {/* Navbar toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar items */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/getcatalog")}
                  >
                    GET Catalog
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/postcatalog")}
                  >
                    POST a new Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/putcatalog")}
                  >
                    PUT (modify) an Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/deletecatalog")}
                  >
                    DELETE an Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Delete Product section */}
        <div className="form-inline">
          <h3 className="mr-2">All Products</h3>
        </div>
        {products.map((el) => (
          <div key={el.id}>
            <img src={el.image} alt="product" width={30} />
            <div>ID: {el.id}</div>
            <div>Title: {el.title}</div>
            <div>Category: {el.category}</div>
            <div>Price: {el.price}</div>
          </div>
        ))}

        {/* Bootstrap JS link */}
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
          integrity="sha384-b28gs2QG7Nq7uSl5/gK/cIa6nc6FgaQ8+9z1bWp2fGtlj1kWCc9/NdC3Jz1VaZXp"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shC1N+3Ehx6jB8EhFQh6KvALe6usOJqdmBk4W"
          crossOrigin="anonymous"
        ></script>
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
        {/* Bootstrap CSS link */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />

        {/* Your navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            {/* Navbar brand */}
            <h1 className="navbar-brand">FakeStore Catalog</h1>

            {/* Navbar toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar items */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/getcatalog")}
                  >
                    GET Catalog
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/postcatalog")}
                  >
                    POST a new Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/putcatalog")}
                  >
                    PUT (modify) an Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/deletecatalog")}
                  >
                    DELETE an Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Delete Product section */}
        <div className="form-inline">
          <h3 className="mr-2">Post New Product</h3>
        </div>
        <form onSubmit={handleSubmit} className="form-inline">
          <input
            type="number"
            className="form-control mr-2"
            name="id"
            value={addNewProduct.id}
            onChange={handleChange}
            placeholder="ID"
            required
          />{" "}
          <br />
          <input
            type="text"
            className="form-control mr-2"
            name="title"
            value={addNewProduct.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />{" "}
          <br />
          <input
            type="number"
            className="form-control mr-2"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />{" "}
          <br />
          <input
            type="text"
            className="form-control mr-2"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />{" "}
          <br />
          <input
            type="text"
            className="form-control mr-2"
            name="category"
            value={addNewProduct.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />{" "}
          <br />
          <input
            type="text"
            className="form-control mr-2"
            name="image"
            value={addNewProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />{" "}
          <br />
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
        </form>

        {/* Bootstrap JS link */}
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
          integrity="sha384-b28gs2QG7Nq7uSl5/gK/cIa6nc6FgaQ8+9z1bWp2fGtlj1kWCc9/NdC3Jz1VaZXp"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shC1N+3Ehx6jB8EhFQh6KvALe6usOJqdmBk4W"
          crossOrigin="anonymous"
        ></script>
      </div>
    );
  };

  //
  // PUT item
  //
  const Putcatalog = () => {
    // Define hooks
    // const [id, setId] = useState("");
    const [updatedData, setUpdatedData] = useState({});
    const navigate = useNavigate();

    // Function to handle PUT request
    function handleUpdate() {
      let id = document.getElementById("updateProductbyId").value;
      console.log(id);
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
    }

    // Return
    return (
      <div>
        {/* Bootstrap CSS link */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />

        {/* Your navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            {/* Navbar brand */}
            <h1 className="navbar-brand">FakeStore Catalog</h1>

            {/* Navbar toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar items */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/getcatalog")}
                  >
                    GET Catalog
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/postcatalog")}
                  >
                    POST a new Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/putcatalog")}
                  >
                    PUT (modify) an Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/deletecatalog")}
                  >
                    DELETE an Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Update Product section */}
        <div className="form-inline">
          <h3 className="mr-2">Update Product</h3>
        </div>
        <div className="form-inline">
          <br />
          <input
            type="number"
            className="form-control mr-2"
            id="updateProductbyId"
            placeholder="Enter ID"
          />
          <br />
          <input
            type="text"
            placeholder="Update Title"
            className="form-control mr-2"
            onChange={(e) =>
              setUpdatedData({ ...updatedData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Update Category"
            className="form-control mr-2"
            onChange={(e) =>
              setUpdatedData({ ...updatedData, category: e.target.value })
            }
          />
          <br />
          <input
            type="text"
            placeholder="Update Price"
            className="form-control mr-2"
            onChange={(e) =>
              setUpdatedData({ ...updatedData, price: e.target.value })
            }
          />
          <button className="btn btn-danger" onClick={handleUpdate}>
            Update Item
          </button>
        </div>
        {/* Bootstrap JS link */}
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
          integrity="sha384-b28gs2QG7Nq7uSl5/gK/cIa6nc6FgaQ8+9z1bWp2fGtlj1kWCc9/NdC3Jz1VaZXp"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shC1N+3Ehx6jB8EhFQh6KvALe6usOJqdmBk4W"
          crossOrigin="anonymous"
        ></script>
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
      fetch(`http://localhost:8081/listProducts/${id}`, {
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
        {/* Bootstrap CSS link */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />

        {/* Your navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            {/* Navbar brand */}
            <h1 className="navbar-brand">FakeStore Catalog</h1>

            {/* Navbar toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar items */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/getcatalog")}
                  >
                    GET Catalog
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/postcatalog")}
                  >
                    POST a new Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/putcatalog")}
                  >
                    PUT (modify) an Item
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/deletecatalog")}
                  >
                    DELETE an Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Delete Product section */}
        <div className="form-inline">
          <h3 className="mr-2">Delete Product</h3>
        </div>
        <div className="form-inline">
          <input
            type="number"
            className="form-control mr-2"
            id="deleteProductbyId"
            placeholder="Enter Product ID"
          />
          <button className="btn btn-danger" onClick={() => deleteProduct()}>
            Delete Product
          </button>
        </div>
        {/* Bootstrap JS link */}
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
          integrity="sha384-b28gs2QG7Nq7uSl5/gK/cIa6nc6FgaQ8+9z1bWp2fGtlj1kWCc9/NdC3Jz1VaZXp"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shC1N+3Ehx6jB8EhFQh6KvALe6usOJqdmBk4W"
          crossOrigin="anonymous"
        ></script>
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
