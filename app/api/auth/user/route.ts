import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import * as bcrypt from "bcrypt";

if (!process.env.MONGODB_URI) throw new Error("env error");
const uri: string = process.env.MONGODB_URI;

export async function Post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, ...restInfo } = req.body;

    // MongoDB 연결
    const client = await MongoClient.connect(uri);
    const db = client.db();

    // 기존의 가입된 이메일 체크하기
    const checkExisting = await db.collection("users").findOne({ email });

    if (checkExisting) {
      client.close();
      res.status(422).json({ result: false, error: "이미 가입된 계정이에요!" });
      return;
    }

    const status = await db.collection("users").insertOne({
      email,
      password: await bcrypt.hash(password, 12),
      role: "user",
      ...restInfo,
    });

    // 성공시 response
    res.status(201).json({ result: true, message: "User created", ...status });
    client.close();
  } else {
    res.status(500).json({ result: false, error: "Route not valid" });
  }
}
