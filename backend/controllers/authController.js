const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success!",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // 1) check if email and password exists
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password", 401);
    }

    // 2) check if email and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password", 401);
    }

    // 3) if everything ok send token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: err + err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check whether its there
    // console.log(req.headers);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    } else {
      throw new Error("You are not logged in!", 401);
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3) Check if user still exists (user deleted after token assign)
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw new Error("Token belongs to this user is no longer exists", 401);
    }

    // 4) Check if changed password after token assigned
    if (freshUser.changePasswordAfter(decoded.iat)) {
      throw new Error("User recently changed pasword. Please login again", 401);
    }

    req.user = freshUser;
    next();
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({
        status: "error",
        message: "You do not have access!",
      });
    }
    next();
  };
};

exports.forgetPassword = async (req, res) => {
  try {
    // 1) Get uder email based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("There is no user with this email", 404);
    }
    // 2) Generate random token
    const resetToken = user.createPasswordToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forget your password? Submit a APTCH request with your new password and passwordConfirm tp ${resetURL}. \nIf you didn't forget your password, please ignore this email.`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for only 10 mins)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      (user.passwordResetToken = undefined),
        (user.passwordResetExpires = undefined),
        await user.save({ validateBeforeSave: false });
      throw new Error(
        "There was an error in sending email. Please try again later",
        500
      );
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token is not expired and there is user set the new password
    if (!user) {
      throw new Error("Token is invalid or expired", 400);
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined),
      await user.save();

    // 3) update changedPasswordAt property for the user
    // 4) send JWT token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if posted current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      throw new Error("Your current password is wrong!", 401);
    }
    // 3) If so update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) login sent token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};
