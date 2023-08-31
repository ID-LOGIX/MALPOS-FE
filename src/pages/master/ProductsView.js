import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Label } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsUnderCategory from "../../components/ProductsUnderCategory";

import {
  faArrowLeft,
  faB,
  faHandHoldingDollar,
  faHome,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ImageCards from "../../components/cards/ImageCards";
import ProductViewReceipt from "./ProductViewReceipt";
import { Link, useLocation } from "react-router-dom";
import LayoutWithoutSidebar from "../../layouts/LayoutWithoutSidebar";
import Sidebar from "../../components/SideBar";

import api from "../../api/baseUrl";
import DiscountModel from "../../components/popupsModel/DiscountModel";
import AssociateModal from "../../components/AssociateModal";
import "./customModal.css";

export default function ProductsView() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [unit, setUnit] = useState("%");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSeatsModalOpen, setIsSeatsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(1); // Default value can be 1
  const [selectedProductsPerSeat, setSelectedProductsPerSeat] = useState([]);
  const [isAssociateModalOpen, setAssociateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productComments, setProductComments] = useState({});

  const location = useLocation();
  const orderType = location.state?.service;
  const tableName = location.state?.tableName;

  const getAllCategories = async () => {
    try {
      const response = await api.get("/product_category");
      // Initialize all the products with a qty of 1
      const categoriesWithQty = response.data.product_category.map(
        (category) => ({
          ...category,
          qty: 1,
        })
      );

      setCategories(categoriesWithQty);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  const toggleSidebar = () => {
    // If the sidebar is currently closed (thus you're going to open it)
    if (!isSidebarOpen) {
      setIsSeatsModalOpen(true);
    }
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar
  };

  const handleSingleCategory = async (id) => {
    setSelectedCategory(id);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  // Function to handle modal open/close
  const toggleDiscountModal = () => {
    setIsDiscountModalOpen(!isDiscountModalOpen);
  };

  const handleProductSelected = (product) => {
    if (isSidebarOpen) {
      setAssociateModalOpen(true);

      // Temporarily store the currently selected product
      setCurrentProduct(product);
    } else {
      setSelectedProduct((prevProducts) => {
        const existingProduct = prevProducts.find(
          (p) => p.md_product_id === product.md_product_id
        );

        if (existingProduct) {
          // Create a new array for immutability
          return prevProducts.map((p) =>
            p.md_product_id === product.md_product_id
              ? { ...p, qty: p.qty + 1 }
              : p
          );
        } else {
          return [...prevProducts, { ...product, qty: 1 }];
        }
      });
    }
  };

  const handleDiscountChange = (newDiscount) => {
    setDiscount(newDiscount);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };
  const increaseQty = (id) => {
    setSelectedProduct((prevProducts) =>
      prevProducts.map((product) =>
        product.md_product_id === id
          ? { ...product, qty: product.qty + 1 }
          : product
      )
    );
  };

  const decreaseQty = (id) => {
    setSelectedProduct((prevProducts) =>
      prevProducts
        .map((product) =>
          product.md_product_id === id
            ? { ...product, qty: product.qty - 1 }
            : product
        )
        .filter((product) => product.qty > 0)
    );
  };

  const deleteProduct = (id) => {
    setSelectedProduct((prevProducts) => {
      const product = prevProducts.find((p) => p.md_product_id === id);

      if (product.qty > 1) {
        // Create a new array for immutability
        return prevProducts.map((p) =>
          p.md_product_id === id ? { ...p, qty: p.qty - 1 } : p
        );
      } else {
        return prevProducts.filter((p) => p.md_product_id !== id);
      }
    });
  };

  const handleSeatChange = (e) => {
    setSelectedSeats(e.target.value);
  };

  const handleComment = (productId, comment) => {
    setProductComments((prevComments) => ({
      ...prevComments,
      [productId]: comment,
    }));
  };

  const confirmSeats = () => {
    const emptySeats = Array.from({ length: selectedSeats }, () => []);
    setSelectedProductsPerSeat(emptySeats);
    setIsSeatsModalOpen(false);
  };

  const handleAssociateProductWithSeat = (
    product,
    selectedSeats,
    comment,
    qty
  ) => {
    if (product && selectedSeats.length > 0) {
      setSelectedProductsPerSeat((prev) => {
        const updated = [...prev];
        const distributedQty = qty / selectedSeats.length;
        const distributedPrice = product.product_price * distributedQty;

        selectedSeats.forEach((seatNumber) => {
          if (!updated[seatNumber - 1]) {
            updated[seatNumber - 1] = [];
          }

          const existingProduct = updated[seatNumber - 1].find(
            (p) => p.md_product_id === product.md_product_id
          );

          if (existingProduct) {
            updated[seatNumber - 1] = updated[seatNumber - 1].map((p) =>
              p.md_product_id === product.md_product_id
                ? {
                    ...p,
                    qty: p.qty + distributedQty,
                    product_price: p.product_price + distributedPrice,
                    comment: comment, // Associate the comment with the existing product
                  }
                : p
            );
          } else {
            updated[seatNumber - 1].push({
              ...product,
              qty: distributedQty,
              product_price: distributedPrice,
              comment: comment, // Associate the comment with the new product
            });
          }
        });

        return updated;
      });

      setCurrentProduct(null);
      setAssociateModalOpen(false);
    }
  };

  const clearCart = () => {
    setSelectedProduct([]);
  };

  const clearReceipts = () => {
    setSelectedProductsPerSeat([]);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <LayoutWithoutSidebar>
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={6} md={6} lg={4}>
              <Row>
                {!isSidebarOpen && (
                  <button onClick={toggleSidebar} className="btn btn-primary">
                    UpFront Split
                  </button>
                )}

                <Sidebar
                  isOpen={isSidebarOpen}
                  toggle={toggleSidebar}
                  receipts={selectedProductsPerSeat}
                  clearReceipts={clearReceipts}
                  onCommentChange={handleComment}
                  productComments={productComments}
                  orderType={orderType}
                  tableName={tableName}
                />
                {!isSidebarOpen && selectedProduct ? (
                  <ProductViewReceipt
                    products={selectedProduct}
                    deleteProduct={deleteProduct}
                    clearCart={clearCart}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    discount={discount}
                    unit={unit}
                    tableName={tableName}
                  />
                ) : (
                  !isSidebarOpen && <h2>Empty Cart</h2>
                )}
              </Row>
            </Col>
            <Col sm={6} md={6} lg={8}>
              <CardLayout className={"item-listing-card-height"}>
                <Row>
                  <Col sm={2}>
                    <Link to="/orders-line">
                      <FontAwesomeIcon
                        icon={faHome}
                        color="#F07632"
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                  </Col>
                  <Col sm={10}>
                    <Box className={"search-btn-box"} color="#F07632">
                      <Button
                        onClick={handleShow}
                        className={"logo-btn-p"}
                        color="#F07632"
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                      <Modal
                        className="search-model"
                        show={show}
                        onHide={handleClose}
                      >
                        <Modal.Body>
                          <LabelField
                            type={"search"}
                            placeholder={"Search here"}
                            label={"Search"}
                            fieldSize={" w-100 h-45"}
                          />
                        </Modal.Body>
                      </Modal>
                      <Button
                        className={"logo-btn-p"}
                        style={{ cursor: "pointer" }}
                        onClick={handleBackToCategories}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </Button>
                      <Button
                        className={"logo-btn-p"}
                        style={{ cursor: "pointer" }}
                        onClick={toggleDiscountModal}
                      >
                        <FontAwesomeIcon icon={faHandHoldingDollar} />
                      </Button>
                      <Button className={"logo-btn-p"}>
                        <FontAwesomeIcon icon={faStar} />
                      </Button>
                      <Button className={"logo-btn-p"}>
                        <FontAwesomeIcon icon={faB} />
                      </Button>
                    </Box>
                  </Col>
                  {/* 3. Create the Modal component in the render method with the title "Discount" */}
                  <Modal
                    show={isDiscountModalOpen}
                    onHide={toggleDiscountModal}
                    contentClassName="custom-modal-size"
                  >
                    <div>
                      <Modal.Header closeButton>
                        <Modal.Title>Discount</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <DiscountModel
                          discount={discount}
                          unit={unit}
                          onDiscountChange={handleDiscountChange}
                          onUnitChange={handleUnitChange}
                        />
                      </Modal.Body>
                    </div>
                    <Modal.Footer className="pt-0">
                      <Button
                        className="btn btn-danger"
                        style={{ backgroundColor: "salmon" }}
                        onClick={toggleDiscountModal}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={toggleDiscountModal}>
                        Apply Discount
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Col sm={12}>
                    {!selectedCategory && (
                      <Row
                        className={"product-img-card justify-content-center"}
                      >
                        {categories &&
                          categories.length > 0 &&
                          categories.map((category, index) => (
                            <div
                              to="/products-under-category"
                              className={"imgCard"}
                              key={category.md_product_category_id}
                              onClick={() =>
                                handleSingleCategory(
                                  category.md_product_category_id
                                )
                              }
                            >
                              <ImageCards
                                Imgsrc={category.product_category_image}
                                alt={category.product_category_name}
                                productTitle={category.product_category_name}
                              />
                            </div>
                          ))}
                      </Row>
                    )}

                    {selectedCategory && (
                      <ProductsUnderCategory
                        categoryId={selectedCategory}
                        onProductSelected={handleProductSelected}
                      />
                    )}
                    {/* <Pagination /> */}
                  </Col>
                </Row>
              </CardLayout>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal show={isSeatsModalOpen} onHide={() => setIsSeatsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Number of Seats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Label>Seats</Label>
          <select value={selectedSeats} onChange={handleSeatChange}>
            {[...Array(20)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsSeatsModalOpen(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={confirmSeats}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <AssociateModal
        isOpen={isAssociateModalOpen}
        onClose={() => setAssociateModalOpen(false)}
        onAssociate={handleAssociateProductWithSeat}
        seatCount={selectedSeats}
        selectedProduct={currentProduct}
      />
    </LayoutWithoutSidebar>
  );
}
