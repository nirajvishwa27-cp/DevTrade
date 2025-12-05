import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    sameSite: 'Strict', // Helps prevent CSRF attacks
  });
  return token;
}
