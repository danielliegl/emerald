require('dotenv').config();
const { verify, JsonWebTokenError } = require("jsonwebtoken");

export function verify_jwt(headers) {
  try {
    const cookies = headers.cookie.split(';')
    let token;

    for (const cookie of cookies)
    {
      const [name, value] = cookie.trim().split('=')
      if(name === "token")
      {
        token = value
      }
    }

    if(!token)
    {
      throw JsonWebTokenError;
    }

    const decodedToken = verify(token, process.env.SECRET)

    return decodedToken;
  }
  catch (error)  {
    throw JsonWebTokenError;
  }
}