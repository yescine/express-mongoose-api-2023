import mongoose from "mongoose"
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  userId: String,
  user: String,
  db: String
});

export default mongoose.model('system.users', UserSchema);