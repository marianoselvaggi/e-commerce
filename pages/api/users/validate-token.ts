import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { signToken, isValidToken } from '../../../utils/jwt';

type Data = 
| { message: string }
| { 
    token: string,
    user: {
        name: string,
        role: string;
        email: string;
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return checkJWT(req, res);
        default:
            res.status(400).json({ message: 'invalid method' });
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies;

    try {
        const _id = await isValidToken(token);

        await db.connect();
        const user = await User.findById(_id).lean();

        if(!user) {
            return res.status(400).json({
                message: 'The user does not exist.',
            });
        }

        const { name, email, role } = user;

        const newToken = signToken(_id, email);

        return res.status(200).json({
            token: newToken,
            user: {
                name,
                email,
                role 
            }
        });
    } catch {
        return res.status(400).json({
            message: 'The token is not valid',
        });
    }

    // await db.connect();

    // const user = await User.findOne({ email });
    // await db.disconnect();
    
    // if (!user) {
    //     return res.status(400).json({ message: 'User or password invalid. - EMAIL' });
    // }

    // if( !bcrypt.compareSync(password, user.password!)) {
    //     return res.status(400).json({ message: 'User or password invalid. - PASSWORD' });
    // }
    
    // const {role, name, _id} = user;
    // const token = signToken(_id, email);

    // return res.status(200).json({
    //     token,
    //     user: {
    //         email,
    //         role,
    //         name,
    //     }
    // });
}
