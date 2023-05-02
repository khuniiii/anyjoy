import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const {
    joinEmail,
    joinName,
    joinPassword,
    joinPhoneNumber,
    joinBirth,
    setJoinEmail,
    setJoinName,
    setJoinPassword,
    setJoinPhoneNumber,
    setJoinBirth,
    setValidEmail,
    setValidName,
    setValidPassword,
    setValidPhoneNumber,
    setValidBirth,
    createUser,
  } = states;

  const joinUser = () => {
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

  const handleEmailChange = e => {
    setJoinEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(regex.test(joinEmail));
  };

  const handleNameChange = e => {
    setJoinName(e.target.value);
    const regex = /^[가-힣]{2,5}$/;
    setValidName(regex.test(joinName));
  };

  const handlePasswordChange = e => {
    setJoinPassword(e.target.value);
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    setValidPassword(regex.test(joinPassword));
  };

  const handlePhoneNumberChange = e => {
    setJoinPhoneNumber(e.target.value);
    const regex = /^\d{3}-\d{3,4}-\d{4}$/;
    setValidPhoneNumber(regex.test(joinPhoneNumber));
  };

  const handleBirthChange = e => {
    setJoinBirth(e.target.value);
    const regex = /^\d{6}-[1-4]\d{6}$/;
    setValidBirth(regex.test(joinBirth));
  };

  return {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handlePhoneNumberChange,
    handleBirthChange,
    joinUser,
  };
};

export default useHandlers;
