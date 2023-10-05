"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const useStates = () => {
  const [joinEmail, setJoinEmail] = useState<string>("");
  const [joinName, setJoinName] = useState<string>("");
  const [joinPassword, setJoinPassword] = useState<string>("");
  const [joinPhoneNumber, setJoinPhoneNumber] = useState<string>("");
  const [joinBirth, setJoinBirth] = useState<string>("");

  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [validBirth, setValidBirth] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  const getter = {
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
    isValid,
    router,
  };
  const setter = {
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
  };

  return { ...getter, ...setter };
};

export default useStates;
