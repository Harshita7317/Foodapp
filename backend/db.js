const mongoose = require("mongoose");
const mongoURL =
  // "mongodb://harshitamishra912:mernfoodappp@ac-nbhaqqj-shard-00-00.r8f01yk.mongodb.net:27017,ac-nbhaqqj-shard-00-01.r8f01yk.mongodb.net:27017,ac-nbhaqqj-shard-00-02.r8f01yk.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-x1i6tn-shard-0&authSource=admin&retryWrites=true&w=majority";

  "mongodb+srv://harshitamishra912:mernfoodappp@cluster0.r8f01yk.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB =  () => {
  mongoose.connect(mongoURL, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("database connected");
      const fetched_data = mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(function (err, data) {
        const foodCategory = mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};
mongoose.set("strictQuery", false);
module.exports = mongoDB();
