import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const {
    joinEmail,
    joinName,
    joinPassword,
    joinPhoneNumber,
    joinBirth,
    validEmail,
    validName,
    validPassword,
    validPhoneNumber,
    validBirth,
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
    setIsValid,

    router,
  } = states;

  const toast = useToast();

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

      if (res.statusText === "Created") {
        toast.success({
          title: "가입 완료",
          content: "회원 가입이 완료되었습니다.",
          duration: 5000,
        });
        router.replace("/login");
      } else {
        toast.error({
          title: "가입 실패",
          content: "다시 시도해주세요.",
          duration: 5000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (email: string) => {
    setJoinEmail(email);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(regex.test(joinEmail));
  };

  const handleNameChange = (name: string) => {
    setJoinName(name);
    const regex = /^[가-힣]{2,5}$/;
    setValidName(regex.test(joinName));
  };

  const handlePasswordChange = (password: string) => {
    setJoinPassword(password);
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+-])[A-Za-z\d!@#$%^&*+-]{8,16}$/;

    const isValidPassword = regex.test(password); // 현재 입력값을 기반으로 검사
    setValidPassword(isValidPassword);
  };

  const handlePhoneNumberChange = (phoneNum: string) => {
    setJoinPhoneNumber(phoneNum);
    const regex = /^\d{11}$/;
    const isValidPhoneNum = regex.test(phoneNum);
    setValidPhoneNumber(isValidPhoneNum);
  };

  const handleBirthChange = (birth: number) => {
    setJoinBirth(birth.toString());
    const regex = /^\d{8}$/;
    const isValidBirth = regex.test(birth.toString());
    setValidBirth(isValidBirth);
  };

  console.log(validEmail);

  const validateCheck = () => {
    if (
      validEmail &&
      validName &&
      validPassword &&
      validPhoneNumber &&
      validBirth &&
      joinEmail.length > 0 &&
      joinName.length > 0 &&
      joinPassword.length > 0 &&
      joinPhoneNumber.length > 0 &&
      joinBirth.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handlePhoneNumberChange,
    handleBirthChange,
    register,
    validateCheck,
  };
};

export default useHandlers;
