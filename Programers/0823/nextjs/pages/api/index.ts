import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    name: "Lee Seyun",
    email: "rutilio413@naver.com",
    query: req.query,
  });
}
