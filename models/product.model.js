const { ObjectId } = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.image = productData.image;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (producDocument) {
      return new Product(producDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      image: this.image,
      summary: this.summary,
      price: this.price,
      description: this.description,
    };

    if (this.id) {
      const productId = new ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db.getDb().collection("products").updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  static async findById(productId) {
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      const error = new Error("could not find product with provided id");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  delete() {
    const productId = new ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
