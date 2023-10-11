import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";
import { signIn, useSession } from "next-auth/react";
import { FormEvent } from "react";

const useHandlers = (states: StatesType) => {
  const { loginEmail, loginPassword, router } = states;
  const { data: session } = useSession();
  const toast = useToast();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const email = loginEmail;
      const password = loginPassword;
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: process.env.NEXT_PUBLIC_URI,
        redirect: false,
      });
      console.log(session);
      console.log(1234, response);

      if (!session || (response && response.error)) {
        toast.error({
          title: "로그인 실패",
          content: response && response.error,
          duration: 5000,
        });
      } else {
        toast.success({
          title: "로그인 성공",
          content: "환영합니다.",
          duration: 5000,
        });
        router.replace("/");
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return { login };
};

export default useHandlers;
