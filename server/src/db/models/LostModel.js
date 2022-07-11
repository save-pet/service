import mongoose from 'mongoose';
import { LostSchema } from '../schemas/LostSchema.js';

const Lost = mongoose.model('losts', LostSchema);

export class LostModel {
  async findAllLostPosts() {
    const orders = await Lost.find({});
    return orders;
  }

  async findByEmail(email) {
    const lostPost = await Lost.find({ email: email });
    return lostPost;
  }

  async findById(shortId) {
    const lostPost = await Lost.findOne({ shortId: shortId });
    return lostPost;
  }

  async update({ lostShortId, update }) {
    const filter = { shortId: lostShortId };
    const option = { returnOriginal: false };

    const updatedLostPost = await Lost.findOneAndUpdate(filter, update, option);

    return updatedLostPost;
  }

  async delete(shortId) {
    await Lost.findOneAndDelete({ shortId: shortId });
  }

  async create(lostInfo) {
    const newLostPost = await Lost.create(lostInfo);
    return newLostPost;
  }
}

const lostModel = new LostModel();

export { lostModel };