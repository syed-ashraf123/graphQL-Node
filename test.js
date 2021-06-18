const buildSchema = (args) => {
  return {
    name: args.name || String,
    age: args.age || Int16Array,
    country: args.country || String,
  };
};

//Resolvers
const getname = (args) => {
  return buildSchema(args);
};

console.log(getname({ name: "Tom Cruice", age: 24, country: "USA" }));
