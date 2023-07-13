import { ObjectId } from "mongodb";
import { collections, db } from "../db/db.js";

export async function addToCart(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!id) return res.status(400).send("O id do produto é obrigatório!")

    // Verifique se o produto existe
    try {
        const product = await db.collection(collections.products).findOne({ _id: new ObjectId(id) });
        if (!product) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Verifique se a quantidade solicitada está disponível
        if (product.quantityInStock < quantity) {
            return res.status(400).send('Quantidade solicitada indisponível.');
        }

        const newProductCart = {
            ...req.body,
            productId: new ObjectId(id)
        }

        await db.collection(collections.cart).insertOne(newProductCart)

        console.log('newProductCart aqui', newProductCart)
        return res.send('Produto adicionado ao carrinho.');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}