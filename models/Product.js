const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    product_category: { type: String, required: true },
    product_image: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price_one_off: { type: Number, required: true, min: 0 },
    product_price_subscription: { type: Number, required: true, min: 0 },
    product_listed_date: { type: Date, immutable: true, default: () => Date.now() },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model("Product", productSchema);