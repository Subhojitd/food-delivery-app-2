const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
``;

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: req.body.productId,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return response.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error : ${err}` });
  }
});

module.exports = router;
