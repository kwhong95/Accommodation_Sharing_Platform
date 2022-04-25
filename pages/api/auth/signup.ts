/* 회원가입 api 유저 생성 순서
  1. api method가 POST인지 확인
  2. req.body에 필요한 값이 전부 들어 있는지 확인
  3. email이 중복인지 확인
  4. 패스워드를 암호화
  5. 유저 정보 추가
  6. 추가된 유저의 정보와 token을 전달
*/

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 1. api method가 POST인지 확인
  if (req.method === "POST") {
    //* 2. req.body에 필요한 값이 전부 들어 있는지 확인
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    //* 3. email이 중복인지 확인
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode === 409;
      res.send("이미 가입된 이메일입니다.");
    }
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

    await new Promise((resolve) => {
      const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
      res.setHeader(
        "Set-Cookie",
        // access_token 이라는 쿠키명에 토큰을 저장하며 path는 "/", expires로 지금 시간에 3일을 더해 만료일을 정하고,
        // httponly를 사용하여 api 통신에서만 쿠키 값을 불러올 수 있고, http이외의 접근은 불가능하게 한다.
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
        )}; httponly`
      );
      resolve(token);
    });

    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
      newUser;

    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUser);
  }
  res.statusCode = 405;
  return res.end();
};
