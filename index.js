const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const app = express();

let database = "This is my current Database";

const schema = buildSchema(`

type User{
    name:String
    age:Int
    college:String
}

type Query{
    hello:String
    welcomeMessage(name:String,age:Int):String
    getUser:User
    getUsers:[User]
}

type Mutation{
    update(message:String):String!
}

`);

//Resolvers
const root = {
  hello: () => {
    return "Hello World";
  },
  welcomeMessage: (args) => {
    return `Name is ${args.name} & Age is ${args.age}`;
  },
  getUser: () => {
    return {
      name: "Zano",
      age: 24,
      college: "IUL",
    };
  },
  getUsers: () => {
    return [
      {
        name: "Zano",
        age: 24,
        college: "IUL",
      },
      {
        name: "Codes",
        age: 20,
        college: "UJU",
      },
    ];
  },
  update: (args) => {
    database = args.message;
    return null;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => console.log("Up & Running *4000"));
