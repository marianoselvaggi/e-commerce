import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/jwt';
import { isValidEmail } from '../../../utils/validations';

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
            return registerUser(req, res);
        default:
            res.status(400).json({ message: 'invalid method' });
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email, password, name = '' } = req.body as {email: string; password:string; name:string};
    
    if (password.length < 6 ) {
        return res.status(400).json({
            message: 'The password must contain at least 6 characters.',
        });
    }

    if (name.length < 2 ) {
        return res.status(400).json({
            message: 'The name must contain at least 2 characters.',
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: 'The email is not valid.',
        });
    }

    // TODO: validate email
    await db.connect();
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (user) {
        await db.disconnect();
        return res.status(400).json({ message: 'The user already exists.' });
    }
    
    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error in the server',
        });
    }
    const { _id } = newUser;
    
    const token = signToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            email,
            role: 'client',
            name,
        }
    });
}
