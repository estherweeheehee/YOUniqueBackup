const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { hashSync } = require("bcrypt");
// const userdata = require("../data/userdata");


const router = express.Router();
const saltRounds = bcrypt.genSaltSync(10);

router.get("/", async (req, res) => {
  res.send("success");
});

router.post("/seed", async (req, res) => {
      try {
        await User.deleteMany({});
        const newUsers = await User.create([
            {
                username: "esther",
                password: bcrypt.hashSync("123", saltRounds),
                email: "esther@mail.com",
                first_name: "Esther",
                last_name: "Wee",
                display_pic_url: "https://media-exp2.licdn.com/dms/image/C5103AQEznnA5w3f52g/profile-displayphoto-shrink_800_800/0/1517506416229?e=1660780800&v=beta&t=P1klipOPIFA9JWPzCCX0n_GW7UH8FfWQmUfNhRYIqmw",
                user_description: "hello world i'm esther and I like durians. I sell cookies"
            },
            {
                username: "lucas",
                password: bcrypt.hashSync("123", saltRounds),
                email: "lucas@mail.com",
                first_name: "Lucas",
                last_name: "Scott",
                display_pic_url: "https://scontent.fsin7-1.fna.fbcdn.net/v/t1.6435-9/72901431_10206357000560969_6209118440393801728_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aSFlRyEVB_sAX-O93ET&tn=NEbFg-ajeMcLo6EP&_nc_ht=scontent.fsin7-1.fna&oh=00_AT_BYPlIWAb7hjC2r-2nnRHrIRyv84ry4mxR7d0TIGpTBA&oe=62D35181",
                user_description: "hello world i'm lucas",
            },
            {
                username: "jiehao",
                password: bcrypt.hashSync("123", saltRounds),
                email: "jiehao@mail.com",
                first_name: "Jie",
                last_name: "Hao",
                display_pic_url: "https://i.pinimg.com/originals/a7/4c/11/a74c11686bebb2bf37027473e0d595a3.jpg",
                user_description: "hello world i'm jiehao"
            },
            {
                username: "hello",
                password: bcrypt.hashSync("world", saltRounds),
                email: "hello@mail.com",
                first_name: "jimmy",
                last_name: "neutron",
                display_pic_url: "https://images.generated.photos/-NEf8sq8XZhVzzmu88RD_AnEODxf7KzV5_dvbNK3paM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvNjViMTli/MGItN2UwYy00NmFk/LWJjOGEtYmY5Nzgy/YTA2MjA4LmpwZw.jpg",
                user_description: "hello world i'm Jimmy Neutron and I have a big brain"
            }
        ]);
        res.send(newUsers)
      } catch (error) {
        res.send(error);
      }
    });
    


router.post("/signup", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    };
    const user = await User.create(newUser);
    req.session.username = req.body.username;
    res.send(user);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUser = await User.findOne({ username });
    if (checkUser === null) {
      res.send({ status: "fail", data: "No such user" });
    } else {
      if (bcrypt.compareSync(password, checkUser.password)) {
        req.session.username = username;
        res.send(checkUser);
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.get("/mypurchase/OF/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const users = await User.find({ "sales_order_one_off.buyerId": id });

      const result = [];
      users.forEach((element) => {
        element["sales_order_one_off"].forEach((item) => {
          if (item["buyerId"] === id) {
            result.push(item);
          }
        });
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/mypurchase/MS/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const users = await User.find({ "sales_order_subscription.buyerId": id });

      const result = [];
      users.forEach((element) => {
        element["sales_order_subscription"].forEach((item) => {
          if (item["buyerId"] === id) {
            result.push(item);
          }
        });
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
});

router.put("/OForderstatus/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.username) {
        res.send({ status: "fail", data: "No access" });
    } else {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { $set: {sales_order_one_off: req.body}}, {
                new: true,
              })
            res.send(updatedUser)
        } catch (error) {
            res.send({ error: error });
        }
    }
})

router.put("/MSorderstatus/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.username) {
        res.send({ status: "fail", data: "No access" });
    } else {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { $set: {sales_order_subscription: req.body}}, {
                new: true,
              })
            res.send(updatedUser)
        } catch (error) {
            res.send({ error: error });
        }
    }
})

router.put("/settings/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } catch (error) {
      res.send(error);
    }
  }
});

router.delete("/settings/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const deletedUser = await User.findByIdAndRemove(id);
      req.session.destroy();
      res.send(deletedUser);
    } catch (error) {
      
      res.send({ error: error });
    }
  }
});

router.get("/logout", async (req, res) => {
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      req.session.destroy();
      res.send({ status: "success" });
    } catch (error) {
      res.send({ error: error });
    }
  }
});

router.post("/buy/OF/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { sales_order_one_off: req.body } },
        {
          new: true,
        }
      );
      res.send(updatedUser);
    } catch (error) {
      res.send({ error: error });
    }
  }
});

router.post("/buy/MS/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.username) {
    res.send({ status: "fail", data: "No access" });
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { sales_order_subscription: req.body } },
        {
          new: true,
        }
      );
      res.send(updatedUser);
    } catch (error) {
      res.send({ error: error });
    }
  }
});

router.get("/feed/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.send(user);
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/search/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find()
      const result = [];
      for (let element of users) {
        if (element.username.toLowerCase().includes(id) ) {
          result.push(element)
        }
      }
      
      res.send(result);
    } catch (error) {
    res.send({ error: error });
    }
  });

module.exports = router;
