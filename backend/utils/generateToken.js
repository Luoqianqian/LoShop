import Jwt  from "jsonwebtoken";

const generateToken = (userId) => {
  const token = Jwt.sign({userId}, 'luoqianian', {
    expiresIn: '30d',
  });
  return token;
}

export default generateToken;