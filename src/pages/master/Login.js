import React from "react";
import {
  Box,
  Heading,
  Button,
  Anchor,
  Image,
  FormGeneric,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/authAPI/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/customStoreHooks";
import { setAuth } from "../../features/auth/authSlice";
import { HandleNotification } from "../../components/elements/Alert";

export default function Login() {
  const useFormReturn = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [saveLogin] = useLoginMutation();
  const handleLogin = async (e) => {
    await saveLogin(e)
      .unwrap()
      .then((response) => {
        console.log("response", response.data);
        if (response.data.payload.token) {
          dispatch(setAuth(response.data));
          response.data.user.userRestaurantMap[0].accessLevel === "Kitchen"
            ? navigate("/kitchen-order-list")
            : navigate("/orders-line");
          HandleNotification("You are login successfully");
        }
      });
  };
  return (
    <Box className="mc-auth text-center">
      {/* <Image
        src={data?.pattern.src}
        alt={data?.pattern.alt}
        className="mc-auth-pattern"
      /> */}
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        {/* <Logo
          src={data?.logo.src}
          alt={data?.logo.alt}
          href={data?.logo.path}
        /> */}
        <img src={"images/logo-malpos.png"} className="img-fluid" />
        {/* <Heading as="h4" className="mc-auth-title">
          {data?.title}
        </Heading> */}
        <FormGeneric
          className="mc-auth-form"
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
              passwordVisible={item.passwordVisible}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
          >
            {/* <Link to="/orders-line" style={{ color: "white" }}> */}
            {data?.button.text}
            {/* </Link> */}
          </Button>
          <Anchor className="mc-auth-forgot" href={data?.forgot.path}>
            {data?.forgot.text}
          </Anchor>
          {/* <Box className="mc-auth-divide"><Text as="span">{ data?.divide.text }</Text></Box>
                    <Box className="mc-auth-connect">
                        {data?.connect.map((item, index) => (
                            <Anchor key={ index } href={ item.path } className={ item.classes }>
                                <i className={ item.icon }></i>
                                <span>{ item.text }</span>
                            </Anchor>
                        ))}
                    </Box> */}
        </FormGeneric>
        {/* <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box> */}
      </Box>
    </Box>
  );
}
