 const mongoose = require("mongoose");

 const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    display_pic_url: { type: String },
    user_description: { type: String },
    following_list: { type: [String] },
    sales_order_one_off:  [{
      orderId: {
         orderType: String,
         orderNum: String
      },
      price: String,
      productName: String,
      purchaseDate: { type: Date, immutable: true, default: () => Date.now() },
      buyerUsername: String,
      buyerId: String,
      productId: String,
      qty: String,
      status: String
 }],
    sales_order_subscription: [{
      orderId: {
         orderType: String,
         orderNum: String
      },
      price: String,
      productName: String,
      subscriptionDate: { type: Date, immutable: true, default: () => Date.now() },
      buyerUsername: String,
      buyerId: String,
      productId: String,
      qty: String,
      status: String
 }],
    subscriber_list: { type: [String] },
    seller_ratings: { type: [] }
 });



module.exports = mongoose.model("User", userSchema);