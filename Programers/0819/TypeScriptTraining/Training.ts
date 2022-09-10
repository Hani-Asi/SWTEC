/*
3. tuple
배열을 Tuple로 이용하는 방법
*/

const tuple: [string, number] = ["Lee", 1747];
console.log(tuple);
console.log(tuple[1]);

/*
4. enum
열거형을 사용하는 방법
*/

enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const color = Color.BLUE;
color;

/*
5. 대수 타입
여러 자료형의 값을 가질 수 있게하는 방법
합집합 타입과 교집합 타입이 있다.
*/

let numOrStr: number | string = 1; // 교집합
numOrStr = "str";
//numOrStr = false; 다른 타입이 들어가면 오류가 뜬다.

//let numAndStr: number & string = ''; 원시 타입에서 사용할 수는 없다.

interface Name {
  // 합집합은 인터페이스에서 사용가능하다.
  name: string;
}
interface Age {
  age: number;
}
let nameAndAge: Name | Age = {
  name: "Lee", // 변수가 name이든 age든 둘 중 하나가 없어도 사용가능하다
};
let nameAndAge2: Name & Age = {
  name: "Lee", // 변수가 name과 age 둘 다 있어야 사용가능하다
  age: 1747,
};

type Person = Name & Age;
let asi: Person = {
  name: "asi",
  age: 1747,
};

/*
6. Optional
E5 2021에도 추가된 기능, 타입스크립트는 이미 있다.
*/

interface Post {
  title: string;
  content: string;
}
interface ResponseData {
  post?: Post;
  message?: string;
  status: number;
}
const response: ResponseData[] = [
  {
    post: {
      title: "hello",
      content: "there",
    },
    status: 09,
  },
  {
    message: "error",
    status: 10,
  },
];
// console.log(response[0].post.title);
console.log(response[1].post && response[1].post.title);
console.log(response[1].post?.title);
// 85줄이 너무 길어서 86줄처럼 ? 하나면 짧게 코딩 가능하다.
// 84줄과 86줄의 차이는 ? 하나이다. ?를 넣으면 데이터가 없어도 자동으로 undefined를 반환한다.

/*
7. Generic
하나의 인터페이스로 여러 타입을 이요할 수 있게 하는 방법
*/

interface Value<T> {
  value: T;
}
const value: Value<number> = {
  value: 1,
};

function toString<T>(a: T): string {
  return `${a}`;
}
console.log(toString("5"));

/*
8. Parial, Required, Pick, Omit
기존 interface를 재활용 할 수 있게 만든다.
*/

interface User {
  nickName: string;
  name: string;
  age: number;
  address: string;
  createAt?: string;
  updateAt?: string;
}

// Partial
// 모든 필드가 Optional이 된다.
// Optional이라 아무것도 안넣어도 된다.
const partial: Partial<User> = {};

// Required
// 모든 필드가 Required가 된다.
// Required라 Optional처리한 부분도 무조건 넣어야 한다.
const required: Required<User> = {
  nickName: "Asi",
  name: "Lee",
  age: 25,
  address: "rutilio413@naver.com",
  createAt: "",
  updateAt: "",
};

// Pick
// 특정 필드만 골라서 사용할 수 있다.
const pick: Pick<User, "nickName" | "name" | "age"> = {
  nickName: "Asi",
  name: "Lee",
  age: 1747,
};

// Omit
// 특정 필드만 제외하고 사용할 수 있다.
const omit: Omit<User, "name" | "address" | "createdAt" | "updateAt"> = {
  nickName: "Asi",
  age: 25,
};

// 위 4가지를 섞을 수도 있다.
const mix: Omit<User, "address"> & Pick<Partial<User>, "nickName"> = {
  nickName: "Asi",
  name: "Lee",
  age: 25,
};

/*
9. extends
특정 인터페이스를 상속받아 인터페이스를 확장할 수 있다.
*/

interface Time {
  hour: number;
  minute: number;
  second: number;
}
interface DateTime extends Time {
  year: number;
  month: number;
  day: number;
}
interface OffsetDateTime extends DateTime {
  offset: number;
}
interface TimeFormat extends Pick<Time, "hour" | "minute"> {
  ampm: "am" | "pm";
}
const timeFormat: TimeFormat = {
  hour: 4,
  minute: 15,
  ampm: "pm",
};
