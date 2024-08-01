import userModel from "../../DB/model/User.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        // Assuming you have a way to identify the current user, such as from a JWT
        const userId = req.user;
        const user = await userModel.findById(userId._id);

        // Check if the user is an admin
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can perform this action' });
        }

        // User is admin, proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};