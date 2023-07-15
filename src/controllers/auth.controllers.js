import { response } from "express";
import { collections, db } from "../db/db.js";
import bcrypt from "bcrypt"
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import {v4 as uuid} from "uuid"

// funções que podem se repetir
async function findUserByEmail(email) {
  const user = await db.collection(collections.users).findOne({email})

  return user
}

async function getUserInfo(accessToken) {
  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token: accessToken });

  const oauth2 = google.oauth2({
    auth: client,
    version: 'v2',
  });

  try {
    const userInfo = await oauth2.userinfo.get();
    return userInfo.data;
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
  }
}

const oAuth2Client = new OAuth2Client(
  process.env.ID_CLIENT,
  process.env.ID_SECRET,
  'postmessage',
)

// controllers
export async function signUp(req, res) {
  let {email, name, password} = req.body
  if (await findUserByEmail(email)) return res.status(409).send('Email já cadastrado!')

  password = bcrypt.hashSync(password, 10)
  const newUser = {email, password, name}
  try {
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
    await db.collection(collections.sessions).insertOne({token, userId: user._id})

    res.send({token, username: user.name})

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signInByGoogle(req, res) {
  const { tokens } = await oAuth2Client.getToken(req.body.code)
  const userInfo = await getUserInfo(tokens.access_token)
  const user = await findUserByEmail(userInfo.email)
  let userId = user?._id;

  if (!user) {
    try {
      const newUser = {
        name: userInfo.name,
        email: userInfo.email,
        password: bcrypt.hashSync(tokens.access_token, 10)
      }
      const response = await db.collection(collections.users).insertOne(newUser)
      userId = response.insertedId
    } catch (error) {
      return res.status(500).send(error.message)
    }
  } 

  try {
    const token = uuid()
    await db.collection(collections.sessions).insertOne({token, userId})

    res.send({token, username: user.name})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function logout(req, res) {
  const token = res.locals.token

  try {
    await db.collection(collections.sessions).deleteOne({ token });
    res.status(204).send("Token removido!")

  } catch(err) {
    res.status(500).send(err.message)
  }
}