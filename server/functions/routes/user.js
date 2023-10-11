const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "No token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized Token" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (error) {
    return res.send({
      success: false,
      msg: `Error verifying token : ${error},`,
    });
  }
});

const listAllUsers = async (nextpagetoken) => {
  await admin
    .auth()
    .listUsers(1000, nextpagetoken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listUsersResult.pageToken) {
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => console.log(error));
};

listAllUsers();

router.get("/all", async (req, res) => {
  await listAllUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (error) {
    return res.send({
      success: false,
      msg: `Error getting all users : ${error}`,
    });
  }
});
module.exports = router;
