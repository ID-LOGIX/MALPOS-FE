import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import ImageCards from "../components/cards/ImageCards";
import "./product.css";

import api from "../api/baseUrl";

export default function ProductsUnderCategory({
  categoryId,
  onProductSelected,
}) {
  const [products, setProducts] = useState([]);

  const getCategoryProducts = async () => {
    const id = categoryId;
    try {
      const response = await api.get(`/product/${id}`);
      setProducts(response.data.products.data);
      console.log(response);
    } catch (error) {}
  };

  const getPrice = (id) => {
    const selectedNewProduct = products.find(
      (product) => product.md_product_id === id
    );
    onProductSelected(selectedNewProduct);
  };

  useEffect(() => {
    getCategoryProducts();
  }, []);

  return (
    <Row>
      <Col sm={12}>
        <Row className="justify-content-center">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Col md="auto" className="mb-3" key={product.md_product_id}>
                <Card
                  className="imgCard custom-card"
                  onClick={() => getPrice(product.md_product_id)}
                >
                  <Card.Img
                    variant="top"
                    src={product.product_image}
                    alt={product.product_name}
                    className="custom-img" // Adding the custom class
                  />

                  <Card.Body className="">
                    <Card.Text className="mb-0 price-tab">
                      $ {product.product_price}
                    </Card.Text>
                    <Card.Title className="mb-0 font-weight-bold product-name">
                      {product.product_name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
}
