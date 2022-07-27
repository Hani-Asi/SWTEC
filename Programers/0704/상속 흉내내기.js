function Person(name)
{
    this.name = name;
}

Person.prototype.getName = function()
{
    return this.name || "세윤";
};

function Korean(name)
{
    Person.apply(this, arguments);
}
Korean.prototype = new Person();
Korean.prototype.setName = function(name)
{
    this.name = name;
}

const lee = new Person("이세윤");
const gwon = new Person("권태환");
console.log(lee.getName());
console.log(gwon.getName());
gwon.setName("황재호");
console.log(gwon.getName());