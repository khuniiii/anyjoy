import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION,
) {
  const secret_key = process.env.SECRET;
  const token = jwt.sign(payload, secret_key as string, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET;
    const decoded = jwt.verify(token, secret_key as string);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
