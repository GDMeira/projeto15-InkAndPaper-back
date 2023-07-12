import { collections, db } from "../db/db.js";

export async function postTest(req,res) {
    try {
        await db.collection(collections.test).insertOne(req.body);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }

    res.status(201).send('Document created. Connection with MongoDB is working!');
}

export async function getTests(req, res) {
    try {
        const tests = await db.collection(collections.test).find().toArray();
        res.send(tests);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}