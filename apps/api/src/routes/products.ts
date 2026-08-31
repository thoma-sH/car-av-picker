import { Router } from 'express';
import { type Request , type Response } from 'express';
import { products } from '../data/products.js';

export const productsRouter = Router();

productsRouter.get('/:slug', (req: Request, res: Response) => {
    const slug = req.params.slug;
    const product = products.find(p => p.slug === slug);

    if (product === undefined) {
        res.status(404).json({ error: 'Product not found'});
        return;
    }
    res.json(product);
})

productsRouter.get('/', (req: Request, res: Response) => {
    const category = 
      typeof req.query.category === 'string' ? req.query.category : undefined;
    
    let result = products;

    if (category !== undefined) {
        result = result.filter(p => p.category === category);
    }

    res.json(result);
})