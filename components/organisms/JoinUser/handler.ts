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
  } = states;

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: joinEmail,
          name: joinName,
          password: joinPassword,
          phoneNum: joinPhoneNumber,
          birth: Number(joinBirth),
          role: "user",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(regex.test(joinEmail));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinName(e.target.value);
    const regex = /^[가-힣]{2,5}$/;
    setValidName(regex.test(joinName));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinPassword(e.target.value);
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    setValidPassword(regex.test(joinPassword));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinPhoneNumber(e.target.value);
    const regex = /^\d{3}-\d{3,4}-\d{4}$/;
    setValidPhoneNumber(regex.test(joinPhoneNumber));
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    register,
  };
};

export default useHandlers;
