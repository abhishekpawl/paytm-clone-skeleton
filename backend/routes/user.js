const express = require("express");
const router = express.Router();

const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

/* zod validations */

const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string()
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
})

const updateBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional()
})

/* routes */

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if(!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  });

  if(existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const user = await User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  })

  const userId = user._id;

  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000
  })

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token
  })
})

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if(!success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if(!user) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const token = jwt.sign({
    userId: user._id
  }, JWT_SECRET);

  const account = await Account.findOne({
    userId: user._id
  })

  console.log(account)

  res.json({
    token: token,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    balance: account.balance
  })
})

router.put("/update", authMiddleware, async (req, res) => {
  const success = updateBody.safeParse(req.body);
  if(!success) {
    return res.status(411).json({
      message: "Error while updating information"
    })
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully"
  })
})

router.get("/bulk", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstname: {
        "$regex": filter
      }
    }, {
      lastname: {
        "$regex": filter
      }
    }]
  })

  const restUsers = users.filter(user => user._id != userId);

  res.json({
    users: restUsers.map(user => ({
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    }))
  })
})

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const user = await User.findOne({
    _id: userId
  })

  if(!user) {
    return res.status(411).json({
      message: "Can't fetch user"
    })
  }

  const account = await Account.findOne({
    userId: userId
  })

  if(!account) {
    return res.status(411).json({
      message: "Can't fetch user"
    })
  }

  res.json({
    firstname: user.firstname,
    amount: account.balance
  })
})

module.exports = router;