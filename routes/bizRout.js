const router = require("express").Router();
const sharp = require("sharp");
const _ = require("lodash");

const { BizCard, validateBiz } = require("../models/bizModel");
const authMw = require("../middlewares/authMw");
const { upload, editImage } = require("../middlewares/upload");

/////// create biz card ///////
router.post("/", authMw, upload.single("bizImage"), async (req, res) => {
  const { error } = validateBiz(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let bizCard = await BizCard.findOne({ bizAdress: req.body.bizAdress });
  if (bizCard) {
    res.status(403).send("בכתובת זו כבר קיים עסק רשום");
    return;
  }

  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .jpeg()
      .toBuffer();

    bizCard = new BizCard({
      ...req.body,
      bizImage: buffer,
      owner: req.user._id,
    });

    try {
      await bizCard.save();
      res.status(200).send(bizCard);
    } catch (e) {
      res.status(403).send("בכתובת זו כבר קיים עסק רשום");
    }
  }

  const buffer = await sharp("defaultImage.png")
    .resize({ width: 250, height: 250 })
    .jpeg()
    .toBuffer();

  bizCard = new BizCard({
    ...req.body,
    bizImage: buffer,
    owner: req.user._id,
  });
  try {
    await bizCard.save();
    return res.status(200).send(bizCard);
  } catch (e) {
    res.status(403).send("בכתובת זו כבר קיים עסק רשום");
  }
});

/////// edit bizCard ///////
router.put(
  "/edit/:bizId",
  authMw,
  upload.single("bizImage"),
  async (req, res) => {
    const { error } = validateBiz(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    const bizCard = await BizCard.findById(req.params.id);
    res.set("Content-Type", "multipart/form-data");

    if (bizAdress == req.body.bizAdress) {
      res.status(403).send("בכתובת זו כבר קיים עסק רשום");
    }

    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .jpeg()
        .toBuffer();

      try {
        await bizCard.findOneAndUpdate({
          ...req.body,
          bizImage: buffer,
        });
        res.status(200).send(bizCard);
      } catch (e) {
        res.status(403).send(e);
      }
    } else {
      try {
        await bizCard.findOneAndUpdate({ _id: req.params.bizId }, req.body);
        res.send(bizCard);
      } catch (e) {
        res.status(403).send(e);
      }
    }
  }
);

/////// show all biz cards //////
router.get("/", async (req, res) => {
  try {
    const bizCards = await BizCard.find();
    res.set("Content-Type", "multipart/form-data");
    res.send(bizCards);
  } catch (e) {
    res.status(404).send("החיפוש לא הצליח. נסה שוב");
  }
});

/////// find by bizName //////
router.get("/:bizName", async (req, res) => {
  const input = req.params.bizName;
  try {
    const bizCard = await BizCard.find({
      bizName: { $regex: input },
    });

    if (!bizCard) {
      return res
        .status(404)
        .send("שם העסק לא קיים במערכת. נסה שם אחר או חפש לפי קטגוריה.");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(404).send(e);
  }
});

/////// find by bizCategory //////
router.get("/category/:bizCategory", async (req, res) => {
  const input = req.params.bizCategory;
  try {
    const bizCard = await BizCard.find({
      bizCategory: { $regex: input },
    });

    if (!bizCard) {
      return res
        .status(404)
        .send("שם העסק לא קיים במערכת. נסה שם אחר או חפש לפי קטגוריה.");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(404).send(e);
  }
});

///// show my biz cards //////
router.get("/myBiz/:owner", authMw, async (req, res) => {
  try {
    const bizCards = await BizCard.find({ owner: req.user._id });
    res.set("Content-Type", "multipart/form-data");
    res.send(bizCards);
  } catch (e) {
    res.status(500).send(e);
  }
});

/////// show bizImage ///////
router.get("/:id/bizImage", async (req, res) => {
  try {
    const bizCard = await BizCard.findById(req.params.id);
    if (!bizCard || !bizCard.bizImage) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(bizCard.bizImage);
  } catch (e) {
    res.status(404).send();
  }
});

/////// show specific bizCard ///////
router.get("/my-biz-card/:bizId", authMw, async (req, res) => {
  try {
    const bizCard = await BizCard.findOne({
      _id: req.params.bizId,
    });
    if (!bizCard) {
      return res.status(500).send("העסק שביקשת לא קיים בחשבונך");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(404).send(e);
  }
});

/////// delete biz card ///////
router.delete("/delete/:bizId", authMw, async (req, res) => {
  try {
    console.log(req.params.bizId);
    const bizCard = await BizCard.findOneAndRemove({
      _id: req.params.bizId,
    });
    if (!bizCard) {
      return res.status(404).send("העסק שביקשת לא קיים בחשבונך");
    }
    res.send(bizCard.bizName + " נמחק מחשבונך");
  } catch (e) {
    res.status(404).send("העסק שביקשת לא קיים בחשבונך");
  }
});

module.exports = router;
