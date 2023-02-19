const router = require("express").Router();
const Users = require("../models/Users");
const verifyToken = require("../verifyToken");
const CryptoJS = require("crypto-js");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can only update your account!");
  }
});

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can only delete your account!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL

router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await Users.find().sort({ _id: -1 }).limit(5)
        : await Users.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to see all userrs!");
  }
});

//GET ALL STATS
router.get("/stats", async (req, res) => {
  //const today = new Date();
 // const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await Users.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
