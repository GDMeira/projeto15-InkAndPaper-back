import { collections, db } from "../db/db.js"

export async function tokenValidation(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).send('Token inválido.')

    try {
        const session = await db.collection(collections.sessions).findOne({token})
        if (!session) return res.status(401).send('Token inválido.')

        res.locals = session

        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
}