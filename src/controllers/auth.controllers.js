import { collections, db } from "../db/db.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

// funções que podem se repetir
async function findUserByEmail(email) {
  const user = await db.collection(collections.users).findOne({email})

  return user
}

// controllers
export async function signUp(req, res) {
  let {email, name, image, password} = req.body
  password = bcrypt.hashSync(password, 10)

  if (await findUserByEmail(email)) return res.status(409).send('Email já cadastrado!')
  if (!image) image = ''

  try {
    const newUser = {email, password, name, image}
    await db.collection(collections.users).insertOne(newUser)
  } catch (error) {
    req.status(500).send(error.message)
  }

  res.sendStatus(201)
}

export async function signIn(req,res) {
  const {email, password} = req.body

  try {
    const user = await findUserByEmail(email)
    if(!user) return res.status(404).send("E-mail não cadastrado!")

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect) return res.status(401).send("Senha incorreta!")

    const token = uuid()
    await db.collection("sessions").insertOne({token, userId: user._id})

    res.send({token, username: user.name, image: user.image})

  } catch (err) {
    res.status(500).send(err.message);
  }
}
