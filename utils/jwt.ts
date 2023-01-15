import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string): string => {
    if (! process.env.JWT_SECRET_SEED) {
        throw new Error('There is no SEED for JWT. Please check your env variables.');
    }
    return jwt.sign({
        _id,
        email,
    },process.env.JWT_SECRET_SEED,
    {
        expiresIn: '30d'
    });
}

export const isValidToken = async (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('There is no SECRET in the envs.');
    }

    return new Promise((resolve,reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('The json is invalid');

                const { _id } = payload as { _id: string };

                resolve(_id);
            });
        } catch (err) {

        }
    })


}