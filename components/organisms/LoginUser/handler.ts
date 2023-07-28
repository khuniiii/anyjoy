import { StatesType } from "./type";
import { signIn } from "next-auth/react";

const useHandlers = (states: StatesType) => {
  const { loginEmail, loginPassword } = states;
  const login = async (e: any) => {
    e.preventDefault();
    const email = loginEmail;
    const password = loginPassword;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(response);
  };
  return { login };
};

export default useHandlers;
