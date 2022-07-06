import pkg from 'mongoose';
import { UserSchema } from '../schemas/user-schema.js';

const { model, Types } = pkg;
const User = model('User', UserSchema);

export class UserModel {
  // eslint-disable-next-line class-methods-use-this
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async findById(userId) {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

 // eslint-disable-next-line class-methods-use-this
  async findAll() {
    const users = await User.find({});
    return users;
  }

 // eslint-disable-next-line class-methods-use-this
  async totalUsers(){
    const totalNum = await User.find({}).count();
    return totalNum;
  }

  // eslint-disable-next-line class-methods-use-this
  async update({ userId, update }) {
    const filter = { _id: new Types.ObjectId(userId) };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // eslint-disable-next-line class-methods-use-this
  async del(userId) {
    try{
      await User.deleteOne({ _id: new Types.ObjectId(userId)});
      return "Successed to delete";
    }catch{
      return "Failed to delete";
    }
  }
}

const userModel = new UserModel();

export { userModel };
