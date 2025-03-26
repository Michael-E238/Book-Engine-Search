// use this to decode a token and get the user's information out of it
import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile(token: string) {
    return jwtDecode(token);
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
    } catch (err) {
      return false;
    }
  }

  // create a middleware function to authenticate requests
  authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtDecode<UserToken>(token);
      if (this.isTokenExpired(token)) {
        return res.status(401).send({ message: 'Token expired' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
}

export { AuthService };