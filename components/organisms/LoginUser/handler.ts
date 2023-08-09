import { StatesType } from "./type";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

const useHandlers = (states: StatesType) => {
  const { loginEmail, loginPassword } = states;

  const login = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const email = loginEmail;
      const password = loginPassword;
      const response = await signIn("credentials", {
        email,
        password,
        // callbackUrl: 'http://localhost:3000',
        redirect: false,
      });
      console.log(1234, response);

      if (response?.error) console.error(response?.error);
    } catch (error) {
      console.error("error", error);
    }
  };
  return { login };
};

export default useHandlers;
