import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces/products';
import { getProductBySlug } from '../../../database/products/';

type Data = {
    message: string
} | IProduct;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { slug } = req.query;

    switch (req.method) {
        case 'GET':
            const product = await getProductBySlug(slug as string);
            if (!product) {
                return res.status(404).json({ message: 'Product not found '});
            }
            return res.status(200).json( product );
        default:
            return res.status(400).json({ message: 'Bad request.' });
    }
}