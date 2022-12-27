import { ISizes } from './';

export interface ICartProduct {
    _id: string;
    description: string;
    image: string;
    price: number;
    size?: ISizes
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}