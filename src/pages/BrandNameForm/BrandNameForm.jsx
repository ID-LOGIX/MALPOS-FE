import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Box, Button, FormGeneric } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import { HandleNotification } from "../../components/elements/Alert";
import data from "../../data/formData/brandNameForm.json";
import api from "../../api/baseUrl";

const BrandNameForm = () => {
  const [brands, setBrands] = useState([]);
  const useFormReturn = useForm();
  const navigate = useNavigate();

  const fetchBrands = async () => {
    const response = await api.get("/cdbrand");
    // Map the response to get only the names of the brands
    const brandNames = response.data.map((brand) => brand.name);
    setBrands(brandNames);
  };

  const handleLogin = async (data) => {
    // try {
    //   const response = await api.post("brands/login", data);

    //   console.log(response);
    //   if (response.data) {
    //     navigate("/pin-pad");
    //   }
    // } catch (error) {
    //   HandleNotification("Incorrect Password or Brand Name", false);
    // }
    console.log(data);
    Cookies.set("brandData", data);
    navigate("/pin-pad");
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Box className="mc-auth text-center">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" />
        <FormGeneric
          className="custom-form-css mc-auth-form"
          useFormReturn={useFormReturn}
          onSubmit={handleLogin}
        >
          {data?.input.map((item, index) => {
            if (item.name === "brand Name") {
              return (
                <IconField
                  key={index}
                  icon={item.icon}
                  // type={item.type}
                  name={item.name}
                  option={brands} // Pass the brands data as options to your select input
                  classes={item.fieldSize}
                  activeOption={"Select Brand Name"}
                />
              );
            } else {
              return (
                <IconField
                  key={index}
                  icon={item.icon}
                  type={item.type}
                  name={item.name}
                  option={item.option}
                  classes={item.fieldSize}
                  placeholder={item.placeholder}
                />
              );
            }
          })}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
          >
            {data?.button.text}
          </Button>
        </FormGeneric>
      </Box>
    </Box>
  );
};

export default BrandNameForm;
