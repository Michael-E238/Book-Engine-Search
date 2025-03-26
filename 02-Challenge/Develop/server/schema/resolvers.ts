import { User } from '../models/User';
import { Book } from '../models/Book';

const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      // Return the current user
      return context.user;
    },
    users: async () => {
      // Return all users
      return User.find();
    },
    books: async () => {
      // Return all books
      return Book.find();
    },
    book: async (parent, { id }) => {
      // Return a book by ID
      return Book.findById(id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // Login a user
      const user = await User.findOne({ email });
      if (!user ||!(await user.isCorrectPassword(password))) {
        throw new Error('Invalid email or password');
      }
      return { token: 'ome-token', user };
    },
    signup: async (parent, { username, email, password }) => {
      // Signup a new user
      const user = new User({ username, email, password });
      await user.save();
      return { token: 'ome-token', user };
    },
    saveBook: async (parent, { bookId }, context) => {
      // Save a book to a user's saved books list
      const user = context.user;
      const book = await Book.findById(bookId);
      user.savedBooks.push(book);
      await user.save();
      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      // Remove a book from a user's saved books list
      const user = context.user;
      const book = await Book.findById(bookId);
      user.savedBooks.pull(book);
      await user.save();
      return user;
    },
  },
};

export default resolvers;