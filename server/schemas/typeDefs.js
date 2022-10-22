const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        title: String
        link: String
    }

    type User {
        _id: String
        username: String
        email: String
        bookCount: Int 
        savedBooks: [Book]
    }

    type SaveBook {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        savedBooks(username: String!): [Book]
        savedBook(bookId: ID!): Book
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth 
        saveBook(authors: [String!], description: String!, title: String!, image: String!, link: String): User
        removeBook(bookId: ID): User 
    }
`;

module.exports = typeDefs;