var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

var { Sequelize, Op } = require("sequelize");
var { initModels, person, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require("../config/keys").PostgresURI);

initModels(sequelize);

router.get("/donors", ensureAuthenticated, async (req, res) => {
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
});

module.exports = router;
