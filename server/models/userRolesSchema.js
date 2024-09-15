import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: roles,
        required: true,
    },
    roleName: String
});

userRoleSchema.pre('save', async function(next) {
    const role = await Role.findById(this.roleId);
    this.roleName = role.roleName;
    next();
});

const userRole = new mongoose.model("userRole", userRoleSchema);

const insertUserRoles = async () => {
    try {
        await userRole.insertMany();
        const findInsertedUserRoles = await userRole.find();
        console.log(findInsertedUserRoles);
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

insertUserRoles();
