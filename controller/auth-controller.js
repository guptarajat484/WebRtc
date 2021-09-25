const otpServices = require("../services/otp-services");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dtos");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      return res.status(422).send({ Message: "Please Enter Phone No" });
    }

    const otp = await otpServices.generate_otp();
    const ttl = 1000 * 60 * 10;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = await hashService.hashOtp(data);

    try {
      await otpServices.sendBySms(phone, otp);
      return res.send({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Message sending failed" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;

    if (!otp || !hash || !phone) {
      return res.status(422).send({ message: "All fields are required." });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return res.status(400).send({ message: "Otp expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isvalid = otpServices.verify_otp(hashedOtp, data);
    console.log(isvalid);

    if (!isvalid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.finduser({ phone });
      if (!user) {
        user = await userService.createuser({ phone });
      }
    } catch (e) {
      console.log(e);
      return res.send({ error: e });
    }
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      isactivated: false,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken",accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(200).send({user: new UserDto(user),auth:true });
  }
}

module.exports = new AuthController();
