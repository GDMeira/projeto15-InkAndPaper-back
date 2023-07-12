import { db } from "../db/db.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

//function de sign-up aqui

export async function signIn(req,res) {
  const {email, password} = req.body

  try {
    const user = await db.collection("users").findOne({email})
    if(!user) return res.status(404).send("E-mail não cadastrado!")

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect) return res.status(401).send("Senha incorreta!")

    const token = uuid()
    await db.collection("sessions").insertOne({token, userId: user._id})

    res.send({token, username: user.name})

  } catch (err) {
    res.status(500).send(err.message);
  }
}
