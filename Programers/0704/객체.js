const obj1 = new Object();
const obj2 = {};
const obj3 = {name: "이세윤", university : "Mokwon"};
obj3["email"] = "rutilio413@naver.com";
obj3.phone = "01074248404";
delete obj3.phone;

console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log("email" in obj3)
console.log("phone" in obj3)
console.log(Object.keys(obj3));
console.log(Object.values(obj3));

for (const key in obj3)
{
    console.log(key, obj3[key]);
}