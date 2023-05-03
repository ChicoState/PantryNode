var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

var { Sequelize, Op } = require("sequelize");
var {
  initModels,
  person,
  transaction,
  trans_items,
  item,
} = require("../models/init-models");

const sequelize = new Sequelize(require("../config/keys").PostgresURI);

initModels(sequelize);

router.get("/donors", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
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

      res.status(200).json(formattedDonors);
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
    res.post("Unauthenticated");
  } else {
    try {
      const { person_id, fname, lname } = req.query;

      const whereCondition = {};

      if (person_id) {
        whereCondition["person_id"] = person_id;
      }

      if (fname) {
        whereCondition["fname"] = { [Op.like]: `%${fname}%` };
      }

      if (lname) {
        whereCondition["lname"] = { [Op.like]: `%${lname}%` };
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
      res.status(500).json({
        message: "500: An error occurred while fetching requested donor.",
      });
    }
  }
});

router.get("/donations/:person_id", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
    res.post("Unauthenticated");
  } else {
    const { person_id } = req.params;

    try {
      const donorTransactions = await transaction.findAll({
        where: {
          person_id,
          trans_type: "donation",
        },
        include: [
          {
            model: person,
            as: "person",
            attributes: ["person_id", "fname", "lname", "email"],
          },
          {
            model: trans_items,
            as: "trans_items",
            include: [
              {
                model: item,
                as: "item",
                attributes: ["item_id", "name"],
              },
            ],
          },
        ],
      });

      if (donorTransactions.length === 0) {
        return res
          .status(404)
          .json({ message: "404: No donations found for this person_id" });
      }

      const personInfo = {
        person_id: donorTransactions[0].person.person_id,
        fname: donorTransactions[0].person.fname,
        lname: donorTransactions[0].person.lname,
        email: donorTransactions[0].person.email,
      };

      const formattedTransactions = donorTransactions.map((transaction) => {
        return {
          trans_id: transaction.trans_id,
          date: transaction.date,
          items: transaction.trans_items.map((trans_item) => ({
            item_id: trans_item.item.item_id,
            name: trans_item.item.name,
            descr: trans_item.item.descr,
            quantity: trans_item.quantity,
          })),
        };
      });

      res.json({ donor: personInfo, donations: formattedTransactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "500: An error occurred while fetching transactions",
      });
    }
  }
});

module.exports = router;
