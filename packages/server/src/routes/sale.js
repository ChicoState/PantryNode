const express = require("express");
const { Op } = require("sequelize");

const Category = require("../models/Category");
const Item = require("../models/Item");
const Stock = require("../models/Stock");
const Donor = require("../models/Donor");
const Checkout = require("../models/Checkout");
const passport = require("../services/jwt-auth");

const router = express.Router();

router.get(
  "/category",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

// router.post('/cat', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const category = await Category.create({ name });
//     res.status(201).json(category);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// });

router.post(
  "/donor",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, email, location, phone, type } = req.body;
    try {
      const existingDonor = await Donor.findOne({ where: { email } });
      if (existingDonor) {
        return res
          .status(400)
          .json({ message: `Donor with email ${email} already exists` });
      }

      const newDonor = await Donor.create({
        name,
        email,
        location,
        phone,
        type,
      });
      // const users = await Donor.findAll();
      res.status(201).json(newDonor);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get(
  "/donor",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const donors = await Donor.findAll();
    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }
    res.status(200).json({ donors });
  }
);

router.get("/stock", async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: Item,
    });

    if (stocks.length === 0) {
      return res.status(404).json({ message: "No Stock found" });
    }

    res.status(200).json({ stock: stocks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { itemId, quantityX, cllgId } = req.body;

    if (cllgId < 9) {
      return res.status(400).json({ message: "Invalid cllgId" });
    }

    try {
      const item = await Item.findOne({
        where: { id: itemId },
        include: [Category, Stock],
      });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      const currentDate = new Date();

      if (item.ExpiryDate < currentDate) {
        return res.status(400).json({ message: "Item is expired" });
      }

      // Item found,
      const stock = item.Stock;
      if (stock.quantity < quantityX) {
        return res.status(400).json({ message: "Insufficient stock quantity" });
      }

      // Reduce the stock quantity
      await Stock.decrement("quantity", {
        by: quantityX,
        where: { id: stock.id },
      });

      const newCheckout = await Checkout.create({
        cllgId,
        itemName: item.ItemName,
        itemType: item.Category.name,
        quantity: quantityX,
        datePur: new Date(),
        StockId: stock.id, // replace 1 with the actual Stock ID
      });

      res.status(201).json(newCheckout);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/addStock",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const { itemName, category_id, quantity, ExpiryDate, price, donorID } =
      req.body;
    try {
      // Check if category with given ID exists
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res
          .status(400)
          .json({ message: `Category with ID ${category_id} not found` });
      }

      const item = await Item.findOne({
        where: { ItemName: itemName, ExpiryDate },
        include: [Stock],
      });
      let s;

      if (item) {
        // Item with the same name already exists
        s = item.Stock;
        const stockId = s.id;
        const stock = await Stock.findOne({
          where: { id: stockId },
        });

        // If the stock exists, increase the quantity
        stock.quantity += quantity;
        await stock.save();
      } else {
        s = await Stock.create({
          quantity,
          ExpiryDate,
          price,
          category_id,
        });
        // Item with the same name doesn't exist, create a new one
      }
      const newItem = await Item.create({
        ItemName: itemName,
        ExpiryDate: new Date(ExpiryDate),
        StockId: s.id,
        CategoryId: category_id,
      });

      // console.log(newStock);

      // console.log(newItem);

      // const donor = await Donor.findOne({ where: { id: donorID } });
      // if (!donor) {
      //   return res
      //     .status(400)
      //     .json({ message: `Donor with ID ${donorID} not found` });
      // }
      // else {
      // const newDonation = await Donation.create({
      //   quantity,
      //   date: new Date(),
      //   donorId: donorID,
      //   stock_id: newStock.id,
      // });
      // }

      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const items = await Checkout.findAll({
        include: Stock,
      });
      if (items.length === 0) return res.status(200).json({ purchased: [] });
      res.status(200).json({ purchased: items });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get(
  "/charts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentDate = new Date();

      const expiredItems = await Item.findAll({
        where: {
          ExpiryDate: { [Op.lt]: currentDate },
        },
        include: [Category, Stock],
      });

      const nextWeek = new Date(
        currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
      );

      const soonToBeExpired = await Item.findAll({
        where: {
          ExpiryDate: {
            [Op.between]: [currentDate, nextWeek],
          },
        },
        include: [Category, Stock],
      });

      const daysToExpire = 5; // get items that expire more than 5 days from today
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() + daysToExpire);

      const goodItems = await Item.findAll({
        where: {
          ExpiryDate: { [Op.gt]: thresholdDate },
        },
        include: [Category, Stock],
      });

      res.status(200).json({ goodItems, soonToBeExpired, expiredItems });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
