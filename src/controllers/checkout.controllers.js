import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { collections, db } from "../db/db.js";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

// Carrega os plugins de fuso horário e UTC no Day.js
dayjs.extend(utc);
dayjs.extend(timezone);


export async function postCheckOut(req, res) {
    const userId = res.locals.userId;
    const { paymentData, addressData, addressComp } = req.body;
    try {
        const cartItems = await db.collection(collections.cart).find({ userId }).toArray();
        
          // Obtém a data e hora atual com o fuso horário do servidor
    const purchaseDateTime = dayjs().tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:mm:ss');
        
        const checkoutObject = {
            userId: userId,
            _id: new ObjectId(),
            paymentData: paymentData,
            purchaseDateTime: purchaseDateTime,
            cartItems,
            addressData, 
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
  const userId = res.locals.userId;
  console.log(userId)
  try {
    const checkoutItems = await db.collection(collections.checkout).find({userId}).toArray();
    res.json(checkoutItems);
  } catch (error) {
    res.status(500).json('Erro ao obter os itens do checkout.');
  }
}  

