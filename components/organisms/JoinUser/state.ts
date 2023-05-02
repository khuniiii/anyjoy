import { useState } from "react";
import { useCreateUserMutation } from "@/graphql/mutations/createUser.graphql";

const useStates = () => {
  const [joinEmail, setJoinEmail] = useState<string>("");
  const [joinName, setJoinName] = useState<string>("");
  const [joinPassword, setJoinPassword] = useState<string>("");
  const [joinPhoneNumber, setJoinPhoneNumber] = useState<string>("");
  const [joinBirth, setJoinBirth] = useState<number>();
  const [createUser] = useCreateUserMutation();

  const getter = {
    joinEmail,
    joinName,
    joinPassword,
    joinPhoneNumber,
    joinBirth,
  };
  const setter = {
    setJoinEmail,
    setJoinName,
    setJoinPassword,
    setJoinPhoneNumber,
    setJoinBirth,
    createUser,
  };

  return { ...getter, ...setter };
};

export default useStates;
