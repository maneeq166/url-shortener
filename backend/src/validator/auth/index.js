const { body, query } = require("express-validator");

exports.validateRegistration = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 14, min: 3 }),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateLogin = [
  body("email").notEmpty().withMessage("email is required").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateCheckUser = [
  
]

exports.validateUpdation = [
  body("data").isObject({strict:true}).notEmpty()


]