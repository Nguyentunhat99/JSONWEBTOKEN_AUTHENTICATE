import db, { sequelize } from "../models/index";

let getRolesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataRoles = {};
      let Roles = await db.roles.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      dataRoles.data = Roles;
      resolve(dataRoles);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getRolesService,
};
