const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const RefreshModel = require("../models/refresh-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  async storeRefreshToken(token, userId) {
    try {
      const rtoken = await RefreshModel.create({
        token: token,
        userId: userId,
      });
      return rtoken
    } catch (e) {
      console.log(e)
      return e
    }
  }
  async verifyAccessToken(token){
  const decoded=jwt.verify(token,accessTokenSecret)
    return decoded;
  }
}
module.exports = new TokenService();
