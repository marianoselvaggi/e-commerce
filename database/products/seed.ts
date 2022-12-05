import { Product } from '../../models';
import { connect, disconnect } from '../db';
import { initialData } from '../seedProducts';

export const seedProducts = async () => {
    try {
        await connect();

        await Product.deleteMany();

        const products: any = initialData.products;

        await Product.insertMany(products);

        return;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await disconnect();
    }
};