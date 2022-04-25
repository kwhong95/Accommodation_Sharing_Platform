## 비밀번호 암호화 하기

### bcryptjs 라이브러리 사용(문서 살펴보기)

```js
To hash a password:

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.

To check a Password:

//Load hash from your password DB.
bcrypt.compareSync("B4c0/\/", hash); // true
bcrypt.compareSync("not_bacon", hash); // false

Auto-gen a salt and hash:

var hash = bcrypt.hashSync('bacon', 8);
```

`hashSync("문자", salt)`를 통하여 암호를 해싱하고, `compareSync("문자", 해시된 문자)`를 통해 같이 일치하는지 확인 가능하다. 여기서 `salt`는 번역 그대로 소금이고 특별한 값을 의미한다. 암호에 특별한 값을 추가하여 해시를 해킹하는 것을 방지하는 것이다. 소금값이 길수록 해킹으로부터 안전한 해시값을 만들 수 있다.
