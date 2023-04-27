import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getLoginInfo, loginEmail, loginPassword, setLoginUserInfo } = states;

  const getLoginInfoData = async () => {
    try {
      const { data } = await getLoginInfo({
        variables: {
          input: {
            email: loginEmail,
            password: loginPassword,
          },
        },
      });
      setLoginUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getLoginInfoData };
};

export default useHandlers;
