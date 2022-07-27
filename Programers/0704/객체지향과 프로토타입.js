function Person(name, univ, move)
{
    this.name = name;
    this.univ = univ;

    Person.prototype.getName = function()
    {
        return this.name;
    };

    Person.prototype.setName = function(name)
    {
        this.name = name;
    };
}

const lee = new Person("이세윤", "목원대");
const gwon = new Person("권태환", "목원대");

console.log(lee);
console.log(gwon);
console.log(Person.constructor);
console.log(Person._proto_);
console.log(gwon.constructor);
console.log(gwon._proto_);
