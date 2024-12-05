import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedProdects,
  productQuantityDecrement,
  productQuantityIncrement,
  selectedProductDelete,
  selectedProductQuantityDecrement,
  selectedProductQuantityIncrement,
} from "./../app/ProductSlice";
import Swal from "sweetalert2";

const Home = () => {
  const productsList = useSelector((state) => state.product.products);
  console.log(productsList);

  const selectedProducts = useSelector(
    (state) => state.product.selectedProducts
  );
  console.log(selectedProducts);

  const dispatch = useDispatch();
  // add selected oroduct
  const handleSelectProductClick = (receivedItem) => {
    dispatch(addSelectedProdects(receivedItem));
  };
  // delete selected poroduct
  const handleSelectedProductCancelClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(selectedProductDelete(id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The product is safe :)", "error");
      }
    });
  };

  // increase quantity of poroduct
  const handleQuantityIncrementClick = (id) => {
    dispatch(productQuantityIncrement(id));
  };
  // decrease quantity of poroduct
  const handleQuantityDecrementClick = (id) => {
    dispatch(productQuantityDecrement(id));
  };
  // increase quantity of selected poroduct
  const handleSelectedProductQuantityIncrementClick = (id) => {
    dispatch(selectedProductQuantityIncrement(id));
  };
  // decrease quantity of selected poroduct
  const handleSelectedProductQuantityDecrement = (id) => {
    dispatch(selectedProductQuantityDecrement(id));
  };

  const totalPrice = (selectedProducts || []).reduce((total, item) => {
    if (
      item &&
      typeof item === "object" &&
      item.quantity >= 0 &&
      item.price >= 0
    ) {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return total + quantity * price;
    }
    return total;
  }, 0);

  const numberOfProduct = (selectedProducts || []).reduce((number, item) => {
    if (item && typeof item === "object" && item.quantity >= 0) {
      const quantity = item.quantity || 0;
      return number + quantity;
    }
    return number;
  }, 0);

  return (
    <div className="container">
      <div className="sticky-top bg-primary-subtle p-2 ">
        <h1 className="fw-bolder">Total Products: {productsList.length}</h1>
      </div>
      <div className="row">
        <div className="col-md-9 col-lg-9">
          {productsList && (
            <div className="row">
              {productsList.map((item) => (
                <div key={item.id} className="col-md-3 col-lg-3">
                  {" "}
                  <div
                    className="card p-2 my-3 shadow-lg border-0"
                    style={{ background: "#f8f9fa", minHeight: "370px" }}
                  >
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h4 className="card-title text-primary-emphasis fw-bold">
                        {item.model}
                      </h4>
                      <h4 className="card-subtitle">
                        $${" "}
                        <span className="text-black fw-bold">{item.price}</span>
                      </h4>
                    </div>
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-2 ms-2 fw-bold"
                        onClick={() => handleQuantityIncrementClick(item.id)}
                        disabled={
                          item.quantity >= item.copies || item.status === false
                        }
                      >
                        ++
                      </button>
                      <input
                        className="form-control w-25 text-center"
                        id="quantityInput"
                        value={item.quantity}
                      />
                      <button
                        type="button"
                        className="btn btn-warning btn-sm ms-2 fw-bold"
                        onClick={() => handleQuantityDecrementClick(item.id)}
                        disabled={item.quantity === 1 || item.status === false}
                      >
                        --
                      </button>
                    </div>
                    <p className="fw-bold mt-2 ms-1 text-muted">
                      Only {item.copies - item.quantity}{" "}
                      {item.copies - item.quantity === 0
                        ? "copy is available (stockout)"
                        : item.copies - item.quantity === 1
                        ? "copy is available"
                        : "copies are available"}
                    </p>
                    <button
                      type="button"
                      className="btn m-2 btn-success btn-sm fw-bold"
                      onClick={() => handleSelectProductClick(item)}
                      disabled={item.status === false}
                    >
                      <i className="fa-solid fa-cart-shopping me-2"></i>
                      {item.status === true ? "Add to cart" : "Added to cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-3 col-lg-3 mt-3">
          {selectedProducts.length > 0 ? (
            <div>
              <div>
                <h5 className="fw-bold text-success-emphasis">
                  You have selected total {numberOfProduct} products
                </h5>
                <h3 className="fw-bold text-danger-emphasis">
                  Your total price: ${totalPrice}
                </h3>
              </div>
              {selectedProducts.map((item) => (
                <div
                  className="card border-0 shadow-sm rounded p-2 mb-2"
                  key={item.id}
                >
                  <div className="card-body">
                    <h5 className="fw-bold mb-3 text-warning-emphasis">
                      {item.model}
                    </h5>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex">
                        <span className="fw-semibold me-2">Price:</span>
                        <span className="fw-bold">${item.price}</span>
                      </div>
                      <div className="d-flex">
                        <span className="fw-bold me-2">Quantity</span>
                        <span className="fw-bold">{item.quantity}</span>
                      </div>
                      <div className="d-flex">
                        <span className="fw-bold text-success">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        onClick={() => {
                          handleSelectedProductQuantityIncrementClick(item.id);
                        }}
                        type="button"
                        className="btn btn-info fw-bold"
                        disabled={item.quantity >= item.copies}
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          handleSelectedProductCancelClick(item.id)
                        }
                        type="button"
                        className="btn btn-danger fw-bold"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        onClick={() =>
                          handleSelectedProductQuantityDecrement(item.id)
                        }
                        disabled={item.quantity === 1}
                        type="button"
                        className="btn btn-success fw-bold"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* modal button */}
              <button
                type="button"
                className="btn btn-outline-danger fw-bold mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                See Your Order
              </button>
              {/* modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-4 fw-bold"
                        id="exampleModalLabel"
                      >
                        {selectedProducts.length}{" "}
                        {selectedProducts.length > 1 ? "Items" : "Item"}{" "}
                        <span>
                          ({numberOfProduct}{" "}
                          {numberOfProduct <= 1 ? "Product" : "Products"}){" "}
                        </span>
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.model}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-between me-4">
                        <h6 className="fw-bold text-black">Payable Total</h6>{" "}
                        <h5 className="text-danger fw-bold ">${totalPrice}</h5>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="fw-bold fs-5 text-danger-emphasis">
              You haven't selected any single product.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
