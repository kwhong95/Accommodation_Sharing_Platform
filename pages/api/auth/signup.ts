/* 회원가입 api 유저 생성 순서
  1. api method가 POST인지 확인
  2. req.body에 필요한 값이 전부 들어 있는지 확인
  3. email이 중복인지 확인
  4. 패스워드를 암호화
  5. 유저 정보 추가
  6. 추가된 유저의 정보와 token을 전달
*/

import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import user from "../../../lib/data/user";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstname, lastname, password, birthday } = req.body;
  const userExist = Data.user.exist({ email });
  const hashedPassword = bcrypt.hashSync(password, 8);
  const users = Data.user.getList();

  let userId;
  if (users.length === 0) {
    userId = 1;
  } else {
    userId = users[users.length - 1].id + 1;
  }

  //* 4. 패스워드 암호화
  const newUser: StoredUserType = {
    id: userId,
    email,
    firstname,
    lastname,
    password: hashedPassword,
    birthday,
    profileImage: "/static/image/user/default_user_profile_image.jpg",
  };

  Data.user.write([...users, newUser]);

  //* 2. req.body에 필요한 값이 전부 들어 있는지 확인
  if (!email || !firstname || !lastname || !password || !birthday) {
    res.statusCode = 400;
    return res.send("필수 데이터가 없습니다.");
  }

  //* 3. email이 중복인지 확인
  if (userExist) {
    res.statusCode === 409;
    res.send("이미 가입된 이메일입니다.");
  }

  //* 1. api method가 POST인지 확인
  if (req.method === "POST") {
    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};
