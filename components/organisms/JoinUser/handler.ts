import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const {
    joinEmail,
    joinName,
    joinPassword,
    joinPhoneNumber,
    joinBirth,
    createUser,
  } = states;

  const joinUser = () => {
    if (typeof joinBirth !== "number") return;
    try {
      createUser({
        variables: {
          input: {
            email: joinEmail,
            name: joinName,
            password: joinPassword,
            phoneNum: joinPhoneNumber,
            birth: joinBirth,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { joinUser };
};

export default useHandlers;
