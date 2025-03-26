import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!): User
    removeBook(bookId: ID!): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User
  }
`;

export default typeDefs;