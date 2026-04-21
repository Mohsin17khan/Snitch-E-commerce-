import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    next();
}

export const validationResults = [
    body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),

    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

    body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters long"),

    body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .matches(/^\d{10}$/)
    .withMessage("Please enter a valid 10-digit contact number"),

    body("isSeller")
    .isBoolean().withMessage("isSeller must be a boolean value"),
    
    validateRequest

]

export const LoginValidation = [
    body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),

    body("password")
    .notEmpty()
    .withMessage("Password is required"),

    validateRequest

]