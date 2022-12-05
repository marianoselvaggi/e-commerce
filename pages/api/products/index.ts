import type { NextApiRequest, NextApiResponse } from 'next'
import { getProducts } from '../../../database';
import { IProduct } from '../../../interfaces/products';

type Data = {
    message: string
} | IProduct[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { gender = 'all' } = req.query;
    switch (req.method) {
        case 'GET':
            const products = await getProducts(gender as string);
            return res.status(200).json( products );
        default:
            return res.status(400).json({ message: 'Bad request.' });
    }
}