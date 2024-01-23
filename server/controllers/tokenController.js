import * as JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { sign, verify } = JWT.default;
const secret = process.env.SECRET; // load from env

function generateToken(id) {

    return sign({id}, secret, { expiresIn: '1h' });
}

function checkToken(token) {
    return verify(token, secret);
};

export { generateToken, checkToken };