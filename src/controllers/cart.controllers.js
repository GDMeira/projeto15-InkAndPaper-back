import { ObjectId } from "mongodb";
import { collections, db } from "../db/db.js";

// funções que podem repetir

async function findByUserAndProduct(userId, productId) {
    const order = await db.collection(collections.cart).findOne({ productId, userId });

    return order
}

export async function removeCartItem(req, res) {
    const userId = res.locals.userId;
    const { productId } = req.body;
    try {
      const result = await db.collection(collections.cart).deleteOne({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
      });
  
      if (result.deletedCount === 1) {
        res.status(200).send("Produto removido do carrinho com sucesso.");
      } else {
        res.status(404).send("Produto não encontrado no carrinho.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
}

// controllers

export async function addToCart(req, res) {
    const { id } = req.params;
    const addQuantityToCart = req.body.quantity;
    let product;

    if (addQuantityToCart < 0 || typeof (addQuantityToCart) !== 'number') return res.status(400).send("A quantidade do produto deve ser um número positivo!")
    if (!id) return res.status(400).send("O id do produto é obrigatório!")

    // Verifique se o produto existe
    try {
        product = await db.collection(collections.products).findOne({ _id: new ObjectId(id) });
        if (!product) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Verifique se a quantidade solicitada está disponível
        if (product.quantityInStock < addQuantityToCart) {
            return res.status(400).send('Quantidade solicitada indisponível.');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

    try {
        const order = await findByUserAndProduct(res.locals.userId, product._id);

        if (order) {
            await db.collection(collections.cart).updateOne(order, {
                $set: { quantity: order.quantity + addQuantityToCart }
            })
        } else {
            const newProductCart = {
                userId: res.locals.userId,
                quantity: addQuantityToCart,
                productId: new ObjectId(id),
                title: product.title,
                image: product.image,
                price: product.price
            }

            await db.collection(collections.cart).insertOne(newProductCart)
        }

        res.status(201).send('Produto adicionado ao carrinho.')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getCartItemsByUserId(req, res) {
    // pega o userid no locals
    const userId = res.locals.userId;
    try {
        //chama a função de get cart items com o id de argumento
        const cartItems = await db
            .collection(collections.cart)
            .find({ userId })
            .toArray();
        res.json(cartItems);
    } catch (e) {
        res.status(500).json('Erro ao obter os itens do carrinho.' );
    }
}