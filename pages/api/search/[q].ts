import type { NextApiRequest, NextApiResponse } from 'next'
import { searchProducts } from '../../../database/products/get';
import { IProduct } from '../../../interfaces/products';

type Data = 
| { message: string }
| IProduct[];

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const { q } = req.query;
    switch (req.method) {
        case 'GET':
            try {
            const result = await searchProducts(q as string);
            return res.status(200).json(result);
            } catch(err: any) {
                return res.status(400).json({ message: err?.message || ''});
            }

        default:
            return res.status(400).json({ message: 'Method not allowed' });
    }
}