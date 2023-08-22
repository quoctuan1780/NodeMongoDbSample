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
        }),
        subTitle: string({
            required_error: "Short desc is required",
        })
    }),
};

const payloadUpdate = {
    body: object({
        id: string({
            required_error: "Id is required",
        }),
        imageUrl: string({
            required_error: "Image Url is required",
        }),
        content: string({
            required_error: "content is required",
        }),
        title: string({
            required_error: "Title is required",
        }),
        subTitle: string({
            required_error: "Short desc is required",
        })
    }),
};

const params = {
    params: object({
        id: string({
            required_error: "Id is required",
        }),
    }),
};

export const createPostSchema = object({
    ...payload,
});
export const updatePostSchema = object({...payloadUpdate});
export const getPostSchema = object({...params});
export const deletePostSchema = object({...params});
export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type ReadPostInput = TypeOf<typeof getPostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;