function Foo(){
    this.c=1;
}
Foo.fn=function(){console.log(4)}
Foo.a=1;
console.dir(Foo)
Foo.a=2;
console.dir(Foo)
var f=new Foo();f.c=2;
var ff=new Foo();
console.log(ff,f)
