import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { collections, db } from "../db/db.js";

export async function postCheckOut(req, res) {
    const userId = res.locals.userId;
    const { paymentData, address } = req.body;
    try {
        const cartItems = await db.collection(collections.cart).find({ userId }).toArray();
        const checkoutObject = {
            _id: new ObjectId(),
            paymentData: paymentData,
            purchaseDateTime: dayjs().format('DD/MM/YYYY - HH:mm:ss'),
            cartItems: cartItems,
            address
        };
        const result = await db.collection(collections.checkout).insertOne(checkoutObject);
        await db.collection(collections.cart).deleteMany({ userId });
        if (result) {res.sendStatus(201);} else {res.sendStatus(400);}
    } catch (e) {
        res.status(500).json({ e: 'Erro ao obter os itens do carrinho.' });
    }
}


export async function getCheckoutItems(req, res) {
  try {
    const checkoutItems = await db.collection(collections.checkout).find().toArray();
    res.json(checkoutItems);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os itens do checkout.' });
  }
}  

