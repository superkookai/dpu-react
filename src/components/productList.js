import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductList() {
  const location = useLocation();
  const receivedData = location.state.data;
  const navigate = useNavigate();
  const endpoint = "http://localhost:8080/product/list";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch products");
      })
      .then((jsonResponse) => {
        setProducts(jsonResponse.products);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleDelete = (id) => {
    setProducts(
      products.filter((product) => {
        return product.id !== id;
      })
    );

    const productId = id;
    const url = `http://localhost:8080/product/${productId}`;

    const token = receivedData;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Product deleted successfully");
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      })
      .catch((error) => {
        console.error("There was a problem deleting the product:", error);
      });
  };

  const handleUpdate = (id) => {
    const product = products.find((product) => product.id === id);
    navigate("/updateproduct", {
      state: { data: [receivedData, id, product] },
    });
  };

  const handleCreateProduct = () => {
    navigate("/createproduct", { state: { data: receivedData } });
  };

  return (
    <div className="container text-center">
      <h3 className="mt-5">Product List</h3>
      <button className="btn btn-primary mt-3" onClick={handleCreateProduct}>
        Create New Product
      </button>
      <div className="row mt-5">
        {products.length > 0 &&
          products.map((product) => {
            return (
            <div class="col-sm-3">
              <div
                className="card"
                style={{ width: "15rem" }}
                key={product.id}
              >
                <img
                  src={`http://localhost:8080/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Type: {product.type}</p>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleUpdate(product.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
