import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        imageUrl: string({
            required_error: "Image Url is required",
        }),
        content: string({
            required_error: "content is required",
        }),
        title: string({
            required_error: "Title is required",
        })
    }),
};

const params = {
    params: object({
        _id: string({
            required_error: "Id is required",
        }),
    }),
};

export const createPostSchema = object({
    ...payload,
});

export const getPostSchema = object({...params});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type ReadPostInput = TypeOf<typeof getPostSchema>;