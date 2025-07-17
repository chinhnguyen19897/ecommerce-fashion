import jwt from "jsonwebtoken";

function jwtPayload(userId: number) {
  const payload = {
    iss: "userName",
    sub: userId,
    aud: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
  };
  return payload;
}

export function signAccessToken(id: number) {
  const payload = jwtPayload(id);
  const key = process.env.JWT_TOKEN_KEY || "";
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}

export function signRefreshToken(id: number) {
  const payload = jwtPayload(id);
  const key = process.env.REFRESH_TOKEN_KEY || "";
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}

export function verifyToken(accessToken: string) {
  return new Promise<{ message: string } | any>((resolve) => {
    const key = process.env.JWT_TOKEN_KEY || "";
    jwt.verify(accessToken, key, (error: any, payload: any) => {
      if (error) {
        resolve({
          message: "invalid_token",
        });
      } else {
        resolve(payload);
      }
    });
  });
}
