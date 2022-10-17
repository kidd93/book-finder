const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth 
        saveBook(input: savedBook!): UserremoveBook(bookId: ID!): User
    }

    type User {
        _id: _id
        username: String
        email: String
        bookCount: Int 
        saveBooks: [Book]
    }


    type removeBook {
        bookId: User
    }

    type Book {
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
`;

module.exports = typeDefs;