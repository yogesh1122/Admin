import mongoose, { Schema } from 'mongoose';
import uuid4 from 'uuid4';

const options = { timestamps: true };

const users = new Schema(
	{
		username: String,
		email: { type: String, unique: true },
		phone: Number,
		fullname: String,
		id: { type: String, default: uuid4() },
	},
	options
);

export const usersModel = mongoose.model('users', users);
