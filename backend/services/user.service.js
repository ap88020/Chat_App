import userModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email or password are required");
    }

    // Create the user - password will be hashed automatically in the pre-save hook
    const user = await userModel.create({
        email,
        password,
    });

    // Generate JWT token for the user
    const token = user.generateJWT();

    return { user, token }; // Return the user and token
};
