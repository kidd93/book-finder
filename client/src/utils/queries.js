import { gql } from '@apollo/client';

export const GET_ME = gql`
        query me ($username: String) {
        me {
            _id
            username
            email
            bookcount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;