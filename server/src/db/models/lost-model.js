import pkg from 'mongoose';
import { LostSchema } from '../schemas/lost-schema.js';

const { model } = pkg;
const Lost = model('losts', LostSchema);

export class LostModel {
  async findAll() {
    const orders = await this.Lost.find({});
    return orders;
  }

  async findByEmail(email) {
    const lostPost = await this.Lost.find({ email: email });
    return lostPost;
  }

  async findById(shortId) {
    const lostPost = await this.Lost.findOne({ shortId: shortId });
    return lostPost;
  }

  async update({ lostShortId, update }) {
    const filter = { email: lostShortId };
    const option = { returnOriginal: false };

    const updatedLostPost = await this.Lost.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return updatedLostPost;
  }

  // async delete(orderId) {
  //   await this.Lost.findOneAndDelete({ shortId: orderId });
  // }

  async create(lostinfo) {
    const newLostPost = await this.Lost.create(lostinfo);
    return newLostPost;
  }
}

const lostModel = new LostModel();

export { lostModel };
