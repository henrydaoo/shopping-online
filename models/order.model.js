const { ObjectId } = require("mongodb");
const db = require("../data/database");

class Order {
  constructor(cart, userData, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.id = orderId;
    this.date = Date.now();
    if (this.date) {
      this.formattedDate = new Date(this.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  async save() {
    const orderData = {
      userData: this.userData,
      productData: this.productData,
      date: new Date(),
    };

    return db.getDb().collection("orders").insertOne(orderData);
  }

  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static async findAllForUser(userId) {
    const uid = new ObjectId(userId);

    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();
    console.log("this is order from order models", orders);

    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new ObjectId(orderId) });

    return this.transformOrderDocument(order);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }
}

module.exports = Order;
