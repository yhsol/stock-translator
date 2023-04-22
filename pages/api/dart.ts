import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export type DartQueryParams = {
  category: string;
  corp_code: string;
  bsns_year: string;
  reprt_code: string;
};

type Data = {
  // 응답 데이터 타입 정의
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { category, corp_code, bsns_year, reprt_code } =
    req.query as DartQueryParams;

  try {
    const crtfc_key = process.env.DART_CRTFC_KEY || "";
    const params = new URLSearchParams({
      crtfc_key,
      corp_code,
      bsns_year,
      reprt_code,
    });

    const response = await axios.get<Data>(
      `https://opendart.fss.or.kr/api/${category}.json?${params}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
