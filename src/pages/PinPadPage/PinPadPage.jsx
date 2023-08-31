import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Button, FormGeneric } from "../../components/elements";
import { HandleNotification } from "../../components/elements/Alert";
import IconField from "../../components/fields/IconField";
import data from "../../data/formData/pinPadPage.json";
import api from "../../api/baseUrl";

const PinPadPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    // try {
    //   const response = api.post("terminal/login", data);
    //   if (response.data) {
    //     navigate("/orders-line");
    //   }
    // } catch {
    //   HandleNotification("Incorrect Password or Brand Name", false);
    // }
    navigate("/orders-line");
  };
  const useFormReturn = useForm();
  return (
    <Box className="mc-auth text-center">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" alt="Logo" />
        <FormGeneric
          className="custom-form-css mc-auth-form"
          useFormReturn={useFormReturn}
          //   onSubmit={handleSubmit(handleSignup)}
          onSubmit={handleLogin}
        >
          {data?.input.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              name={item.name}
              option={item.option}
              classes={item.fieldSize}
              placeholder={item.placeholder}
              passwordVisible={item.passwordVisible}
            />
          ))}
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

export default PinPadPage;
