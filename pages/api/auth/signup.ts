import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};

/* 회원가입 api 유저 생성 순서
  1. api method가 POST인지 확인
  2. req.body에 필요한 값이 전부 들어 있는지 확인
  3. email이 중복인지 확인
  4. 패스워드를 암호화
  5. 유저 정보 추가
  6. 추가된 유저의 정보와 token을 전달
*/
