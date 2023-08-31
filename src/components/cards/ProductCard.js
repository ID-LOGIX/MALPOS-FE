import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Box } from "../elements";
export default function ProductCard({
  buttonTitle,
  cardTitle,
  Imgsrc,
  className,
}) {
  return (
    <div>
      <Box className={"product-card"}>
        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src={Imgsrc} />
          {/* <Card.Body>
    <Button className={`product-card-btn ${className}`} variant="primary">{buttonTitle}</Button>
      <Card.Title>{cardTitle}</Card.Title>
    </Card.Body> */}
        </Card>
      </Box>
    </div>
  );
}
