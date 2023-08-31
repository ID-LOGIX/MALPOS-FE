import { useForm } from "react-hook-form";
import data from "../../data/formData/signupForm.json";
import {
  Box,
  Button,
  Anchor,
  FormGeneric,
  Text,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";

const SignupPage = () => {
  const useFormReturn = useForm();

  return (
    <Box className="mc-auth text-center">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" alt="Logo" />
        <FormGeneric
          className="custom-form-css mc-auth-form"
          useFormReturn={useFormReturn}
          //   onSubmit={handleSubmit(handleSignup)}
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
        <div className="p-1">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor
            style={{ color: "#F07632" }}
            className="bold"
            href={data?.navigate.path}
          >
            {data?.navigate.text}
          </Anchor>
        </div>
      </Box>
    </Box>
  );
};

export default SignupPage;
