import React from "react";

const ThermalInvoice = React.forwardRef((props, ref) => {
  const {
    selectedProducts,
    initialSubtotal,
    discount,
    selectedProductsQty,
    unit,
    totalTax,
  } = props;

  const getProductQuantity = (product, index) => {
    if (selectedProductsQty && selectedProductsQty.length > index) {
      return selectedProductsQty[index];
    }
    return product.qty;
  };

  const showDiscountUnit = discount !== null && discount > 0;

  return (
    <div ref={ref} className="text-center">
      <img src={"images/logo-malpos.png"} className="img-fluid" alt="Logo" />
      <h2>Your Restaurant Name</h2>
      <p>Address Line 1</p>
      <p>Address Line 2</p>
      <p>Phone: 1234567890</p>

      <div className="d-flex justify-content-center">
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => (
              <tr key={index} style={{ border: "1px solid black" }}>
                <td className="p-2">{product.product_name}</td>
                <td className="p-2">{getProductQuantity(product, index)}</td>
                <td className="p-2">{product.product_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p>Total: {initialSubtotal + parseInt(totalTax)} ریال</p>
        <p>Discount:ss {showDiscountUnit ? `${discount} ${unit}` : "0.00"}</p>
        <p>
          <strong>
            Sub Total: {initialSubtotal + parseInt(totalTax) - discount} ریال
          </strong>
        </p>
      </div>

      <p>Thank you for dining with us!</p>
    </div>
  );
});

export default ThermalInvoice;
