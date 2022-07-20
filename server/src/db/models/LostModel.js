import mongoose from 'mongoose';
import { LostSchema } from '../schemas/LostSchema.js';

const Lost = mongoose.model('losts', LostSchema);

export class LostModel {
  async findAllLostPosts() {
    const orders = await Lost.find({}).sort({ "createdAt": -1 });
    return orders;
  }

  async findPhoneNumberByLostId(lostid){
    const lostInfo = await Lost.find({ _id : lostid }).populate('userId')
    const phoneNumber = lostInfo[0].userId.phoneNumber;
    return phoneNumber;
  }

  // user의 _id로 검색 -> populate 사용해서 , user 다른 정보 불러올 수 있음
  async findById(id) {
    const lostPost = await Lost.find({ userId: id }).populate('userId');
    return lostPost;
  }

  async findByShortId(shortId) {
    const lostPost = await Lost.findOne({ shortId: shortId });
    return lostPost;
  }

  async getCoordinate(lostId) {
    const lostInfo = await Lost.findOne({ _id : lostId });
    const latitude = lostInfo.latitude;
    const longitude = lostInfo.longitude;
    return { latitude: latitude, longitude: longitude };
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