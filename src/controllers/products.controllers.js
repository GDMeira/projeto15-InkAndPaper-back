import { ObjectId } from "mongodb"
import { collections, db } from "../db/db.js"

export async function products(req,res) {
    try {
        
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

export async function getProduct(req, res) {
    const { id } = req.params
    if (!id) return res.status(400).send("O id do produto é obrigatório!")

    try {
        const product = await db.collection(collections.products).findOne({_id: new ObjectId(id)})
        if (!product) return res.status(404).send('Produto não encontrado.')

        res.send(product)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}