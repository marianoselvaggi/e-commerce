import { connect, disconnect } from '../db';
import { Product } from '../../models/';
import { SHOP_CONSTANTS } from '../constants';

export const getProducts = async (gender: string) => {
    try {
        await connect();

        let condition = {};

        if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender)) {
            condition = { gender };
        }

        const products = await Product.find(condition)
        .select('title description images slug inStock price -_id')
        .lean();

        return products;
    } catch (err) {
        throw err;
    } finally {
        disconnect();
    }
};

export const getProductBySlug = async (slug: string) => {
    try {
        await connect();
        
        const product = await Product.findOne({
            slug,
        })
        .select('title description images slug sizes inStock price -_id')
        .lean();

        return product;
    } catch (err) {
        throw err;
    } finally {
        await disconnect();
    }
}

interface IProductSlug {
    slug: string;
};

export const getProductsSlugs = async(): Promise<IProductSlug[]> =>{
    try {
        await connect();

        const products = await Product.find().select('slug -_id').lean();

        return products;
    } catch (err) {
        throw err;
    } finally {
        await disconnect();
    }
}

export const searchProducts = async (query: string) => {
    try {
        await connect();

        if (query.length === 0) {
            throw new Error('You must specified the query to search.');
        }

        const products = await Product.find({
            $text: {
                $search: query,
            }
        })
        .select('title description images slug inStock price -_id')
        .lean();
        return products;
    } catch (err) {
        throw err;
    } finally {
        await disconnect();
    }
}