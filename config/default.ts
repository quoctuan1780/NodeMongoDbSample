import dotenv from 'dotenv'

dotenv.config()

export default {
    port: 8000,
    dbUri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yzqzpsx.mongodb.net/batterythuduc?retryWrites=true&w=majority`
};
