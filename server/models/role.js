import mongoose from "mongoose";
import './config.js';

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true}
});

const Role = mongoose.model('Role', roleSchema);

// const rolesDocument1 = {
//     roleName: "Admin"
// }
// const rolesDocument2 = {
//     roleName: "Client"
// }
// const insertRoles = async () => {
//     try {
//         await role.insertMany([rolesDocument1,rolesDocument2]);
//         const findInsertedData = await role.find();
//         console.log(findInsertedData);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

export default Role;
