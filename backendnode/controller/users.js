const userModel = require("../models/users");
const bcrypt = require("bcryptjs");


//Registartion logic
const register = async (req, res, next) => {
  let { name, email, phoneNo, password, role } = req.body;
  try {
    const emailExits = await userModel.findOne({ email: email });

    if (emailExits) {
      res.json({
        error: true,
        message: "email already exits",
        data: null,
      });
    } else {
      const saltrounds = 10;
      //salt of the password
      const salt = await bcrypt.genSalt(saltrounds);

      //hash password
      const hashedPassword = await bcrypt.hash(password, salt);

      await userModel.insertMany([
        {
          name,
          email,
          phoneNo,
          role,
          password: hashedPassword,
        },
      ]);

      const userData = await userModel.findOne({ email: email });

      res.json({
        error: false,
        message: "User Registration Successfull",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//login Logic

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {
      const isPasswordMatch = await bcrypt.compare(password, userData.password);

      if (isPasswordMatch) {
        let payload = { email };

        res.json({
          error: false,
          message: "Login Successfully",
          role: userData.role,
          email: userData.email,
          name: userData.name,
          userData: userData,
        });

      } else {
        res.json({
          error: true,
          message: "Invalid Password",
          data: null,
        });
      }
    } else {
      res.json({
        error: true,
        message: "User not registered",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};


//Reset password
const resetPassword = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const saltrounds = 10;
    //salt of the password
    const salt = await bcrypt.genSalt(saltrounds);

    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.findOne({ email }).lean();
    if (user) {
      await userModel.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
    res.json({
      error: false,
      message: "User Password has been updated successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};


//Getting all the users
const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({}, { password: 0, hashedOTP: 0 }).lean();

    if (user) {
      console.log("user", user);
      res.json({
        error: false,
        message: "All Users found successfully",
        data: user,
      });
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
  } catch (err) {
    next(err);
  }
};





module.exports = {
  register,
  login,
  getAllUsers,
  resetPassword,
};
