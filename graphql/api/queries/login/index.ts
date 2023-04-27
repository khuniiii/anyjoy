import { User } from "@/lib/model/user";

export const login = async (
  _: unknown,
  { input }: { input: { email: string; password: string } },
): Promise<unknown> => {
  const login = await User.findOne({
    $and: [{ email: input.email }, { password: input.password }],
  });

  if (!login) {
    throw new Error(
      `Anime with email ${input.email} not found or password ${input.password} not found`,
    );
  }

  return login;
};
