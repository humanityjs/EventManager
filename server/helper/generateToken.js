import jwt from 'jsonwebtoken';
import env from 'dotenv';


env.config();
export function generateToken(data) {
  const payload = {
    fullname: data.fullname,
    email: data.email,
    isAdmin: data.isAdmin,
    image: data.imageUrl,
  };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 12,
  });
  return token;
}
