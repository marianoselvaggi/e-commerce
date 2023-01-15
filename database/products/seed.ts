import { Product, User } from '../../models';
import { connect, disconnect } from '../db';
import { initialData } from '../seed-data';

export const seedProducts = async () => {
    try {
        await connect();

        await Product.deleteMany();

        const products: any = initialData.products;

        await Product.insertMany(products);

        await User.deleteMany();
        const users: any = initialData.users;

        await User.insertMany(users);

        return;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await disconnect();
    }
};