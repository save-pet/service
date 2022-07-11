import mongoose from 'mongoose';
import { UserSchema } from '../schemas/UserSchema.js';

const User = mongoose.model('User', UserSchema);

export class UserModel {
  async findById(id) {
    const user = await User.findOne({ id });
    return user;
  }

  async findByautoId(userId) {
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async totalUsers(){
    const totalNum = await User.find({}).count();
    return totalNum;
  }

  async update({ userId, update }) {
    const filter = { _id: new mongoose.Types.ObjectId(userId) };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async del(userId) {
    try{
      await User.deleteOne({ _id: new mongoose.Types.ObjectId(userId)});
      return "Successed to delete";
    }catch{
      return "Failed to delete";
    }
  }
}

const userModel = new UserModel();

export { userModel };
