var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

var { Sequelize, Op } = require("sequelize");
var { initModels, person, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require("../config/keys").PostgresURI);

initModels(sequelize);

router.get("/donors", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
    // const errors = [];
    res.post("Unauthenticated");
  } else {
    try {
      const donors = await person.findAll({
        attributes: [
          "person_id",
          ["fname", "first_name"],
          ["lname", "last_name"],
          "email",
          [Sequelize.literal('CONCAT("fname", \' \', "lname")'), "full_name"],
        ],
        include: [
          {
            model: transaction,
            as: "transactions",
            where: { trans_type: "donation" },
            attributes: [],
          },
        ],
        distinct: true,
      });

      const formattedDonors = donors.map((donor) => {
        return {
          person_id: donor.person_id,
          full_name: donor.getDataValue("full_name"),
          email: donor.email,
        };
      });

      res.json(formattedDonors);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "500: An error occurred while fetching donors" });
    }
  }
});

router.get("/lookupDonor", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
    // const errors = [];
    res.post("Unauthenticated");
  } else {
    try {
      const { person_id, first_name, last_name } = req.query;

      const whereCondition = {};

      if (person_id) {
        whereCondition["person_id"] = person_id;
      }

      if (first_name) {
        whereCondition["fname"] = { [Op.like]: `%${first_name}%` };
      }

      if (last_name) {
        whereCondition["lname"] = { [Op.like]: `%${last_name}%` };
      }

      const persons = await person.findAll({
        where: whereCondition,
        attributes: ["person_id", "fname", "lname", "email"],

        include: [
          {
            model: transaction,
            as: "transactions",
            where: { trans_type: "donation" },
            attributes: [],
            required: true,
          },
        ],
      });

      res.status(200).json(persons);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "500: An error occurred while fetching requested donor." });
    }
  }
});

module.exports = router;
