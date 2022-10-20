const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({
                    _id: context.user._id
                })
                    .select('-__v -password')
                    .populate('books');

                return userData;
            }
            throw new AuthenticationError('You\'re not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);

                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.log(err);
            }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Credentials are incorrect');
            }

            const correctPw = await user.isCorrectPassword
                (password);

            if (!correctPw) {
                throw new AuthenticationError('Credentials are incorrect');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user_id },
                    { $push: { savedBooks: { bookData } } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You have to log in');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You have to log in');
        }
    }

}

module.exports = resolvers;