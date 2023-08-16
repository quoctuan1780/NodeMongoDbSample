import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        url: string({
            required_error: "Url is required",
        }),
        originalName: string({
            required_error: "OriginalName is required",
        })
    }),
};

export const createImageSchema = object({
    ...payload,
});

export const getImageSchema = object({url: string({
    required_error: "url is required"
})});

export type CreateImageInput = TypeOf<typeof createImageSchema>;
export type ReadImageInput = TypeOf<typeof getImageSchema>;