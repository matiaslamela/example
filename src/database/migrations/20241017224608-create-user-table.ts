"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import * as fs from "fs";
import * as path from "path";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    const sqlFilePath = path.join(__dirname, "create-user-table.sql");
    const sql = fs.readFileSync(sqlFilePath, "utf8");
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable("users");
  },
};
