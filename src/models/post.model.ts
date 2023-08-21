import mongoose from 'mongoose';

export interface PostInput {
    title: string;
    content: string;
    imageUrl: string;
    shortDesc: string;
}

export interface PostDocument extends PostInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String, required: true },
        shortDesc: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model<PostDocument>("Post", PostSchema);

export default PostModel;