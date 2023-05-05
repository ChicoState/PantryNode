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
  storage_type,
  site,
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

router.post("/donate", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
    res.post("Unauthenticated");
  } else {
    const { person_id, siteDetails, items } = req.body;

    try {
      const existingPerson = await person.findByPk(person_id);
      const addressId = existingPerson.pri_addr_id;

      let { Site, Transaction, Items } = await sequelize.transaction(
        async (t) => {
          const Site = await site.create(
            { ...siteDetails, addr_id: addressId },
            { transaction: t }
          );

          const Transaction = await transaction.create(
            {
              person_id: existingPerson.person_id,
              date: new Date(),
              trans_type: "donation",
              site: Site.site_id,
            },
            { transaction: t }
          );

          const Items = [];

          for (const x of items) {
            const { transItemsDetails, itemDetails, storageTypeDetails } = x;

            const StorageType = await storage_type.findOrCreate({
              where: { stor_type: storageTypeDetails.stor_type },
              defaults: storageTypeDetails,
              transaction: t,
            });

            const Item = await item.create(
              {
                ...itemDetails,
                stor_id: StorageType[0].stor_id,
              },
              { transaction: t }
            );

            const TransItem = await trans_items.create(
              {
                ...transItemsDetails,
                trans_id: Transaction.trans_id,
                item_id: Item.item_id,
              },
              { transaction: t }
            );

            Items.push({ StorageType: StorageType[0], Item, TransItem });
          }

          return { Site, Transaction, Items };
        }
      );

      res.status(201).json({ Site, Transaction, Items });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "500: An error occurred while processing the donation transaction",
      });
    }
  }
});


//Addind a new Donor to the database
router.post("/addDonor", ensureAuthenticated, async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("Unauthenticated");
    return;
  }

  try {
    // Extract the donor information from the request body
    const {person_id, full_name, email} = req.body;

    // Split the full name into first and last name
    const [fname, lname] = full_name.split(' ');
    // Create a new donor record in the database
    const newDonor = await person.create({
      person_id,
      fname,
      lname,
      email
    });        
    res.status(201).json({
      person_id: newDonor.person_id,
      full_name: newDonor.full_name,
      email: newDonor.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "500: An error occurred while adding new donor.",
    });
  }
});


module.exports = router;
