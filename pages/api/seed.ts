import type { NextApiRequest, NextApiResponse } from 'next';
import { seedProducts } from '../../database';

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    try {
        if (process.env.NODE_ENV === 'production') {
            return res.status(400).json({ message: 'Seed is not allowed in Prod.' });
        }
        await seedProducts();

        res.status(200).json({ message: 'succed' })
    } catch (err) {
        let message = 'Error in seed'
        if (err instanceof Error) message = err.message

        res.status(500).json({ message });
    }
};