const { ObjectId } = require("mongodb");
const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, password, fullname, street, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.street = street;
    this.city = city;
  }

  async signup() {
    const hashPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashPassword,
      street: this.street,
      city: this.city,
    });
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  hasMatchPassword(password) {
    return bcrypt.compare(this.password, password);
  }

  static async findById(userId) {
    const uid = new ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }
}

module.exports = User;
