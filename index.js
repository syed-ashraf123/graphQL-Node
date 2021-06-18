const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const Axios = require("axios");
const app = express();

//Database
let msg = "THis is database";

//For hello query we are returning just a string
//Welcome query will accept an argument
//Exclamation mark means required
const schema = buildSchema(`
type Post{
    userId:Int
    id:Int
    title:String
    body:String
}


type User{
    name:String
    age:Int
    college:String
}


type Query {
    hello:String!
    welcomeMessage(name:String,age:Int!):String
    getUser:User
    getUsers:[User]
    getPosts:[Post]
}
input UserInput{
    name:String!
    age:Int!
    college:String!
}
type Mutation{
setMessage(newMessage:String):String
createUser(user:UserInput):User
}
`);

//Resolvers
//What to return for hello query
const root = {
  hello: () => {
    return "Hello World";
  },
  welcomeMessage: (args) => {
    console.log(args);
    return `WElcome ${args.name} ${args.age}`;
  },
  getUser: () => {
    return {
      name: "Zanoe",
      age: 45,
      college: "IUL",
    };
  },
  getUsers: () => {
    return [
      {
        name: "Zanoe",
        age: 45,
        college: "IUL",
      },
      {
        name: "Zanoe",
        age: 25,
        college: "IUL",
      },
    ];
  },
  getPosts: async () => {
    const res = await Axios("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  },
  setMessage: ({ newMessage }) => {
    console.log(newMessage);
    message = newMessage;
    return message;
  },
  //For Mutation of with Objects instead args do this.
  //craeteUser(user:{
  //       name:"ok",
  //       age:99
  //   })
  createUser: (args) => {
    return args.user;
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

app.listen(4000, () => console.log("Server up and Running"));
