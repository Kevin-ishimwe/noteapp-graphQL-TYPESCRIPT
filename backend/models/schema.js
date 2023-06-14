import { buildSchema } from "graphql";
export const schema = buildSchema(`
  type Query {
    users: [User]
    notes: [Note]
    allNotesUser(email:String!):User
  }
  type Mutation {
    createUser(email: String!, password: String!): User
    deleteUser(email:String!):String
    createNote(title: String!, content: String,authorId:Int!,status:String!):Note
    deleteNote(id:Int!):String
    updateStatus(id:Int!,status:String!):String
}
  type User {
    id: Int
    email: String
    password: String
    notes: [Note]
    createdAt: String
    updatedAt: String
  }

   type Note {
    id: Int
    title: String
    content: String
    author: User
    status: String
    createdAt: String
    updatedAt: String
  }

  
`);
