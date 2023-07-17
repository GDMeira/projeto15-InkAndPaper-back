import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { collections, db } from "../db/db.js";

export async function postCheckOut(req, res) {
    const userId = res.locals.userId;
    const { paymentData, address, addressComp } = req.body;
    try {
        const cartItems = await db.collection(collections.cart).find({ userId }).toArray();
        const checkoutObject = {
            _id: new ObjectId(),
            paymentData: paymentData,
            purchaseDateTime: dayjs().format('DD/MM/YYYY - HH:mm:ss'),
            cartItems,
            address, 
            addressComp
        };
        const result = await db.collection(collections.checkout).insertOne(checkoutObject);
        await db.collection(collections.cart).deleteMany({ userId });
        cartItems.forEach(product => {
          db.collection(collections.products).updateOne({ _id: product.productId }, {
            $inc: { quantityInStock: - product.quantity }
          })
        });

        if (result) {res.sendStatus(201);} else {res.sendStatus(400);}
    } catch (e) {
        res.status(500).json('Erro ao obter os itens do carrinho.' );
    }
}

export async function getCheckoutLastItems(req, res) {
  try {
    const checkoutItems = await db.collection(collections.checkout).find().toArray();
    const lastItem = checkoutItems.pop(); 
    res.json(lastItem);
  } catch (error) {
    res.status(500).json('Erro ao obter os itens do checkout.');
  }
}
export async function getCheckoutItems(req, res) {
  try {
    const checkoutItems = await db.collection(collections.checkout).find().toArray();
    res.json(checkoutItems);
  } catch (error) {
    res.status(500).json('Erro ao obter os itens do checkout.');
  }
}  

