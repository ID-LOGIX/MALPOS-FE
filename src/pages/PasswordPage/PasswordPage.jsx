import { useForm } from "react-hook-form";

import { Box, Button, FormGeneric } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import data from "../../data/formData/passwordPage.json";

const BrandNameForm = () => {
  const useFormReturn = useForm();
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <Box className="mc-auth text-center">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" />
        <FormGeneric
          className="custom-form-css mc-auth-form"
          useFormReturn={useFormReturn}
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

export default BrandNameForm;
