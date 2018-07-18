import { config } from 'dotenv'
import { auth, JWT, UserRefreshClient } from 'google-auth-library'
import { google } from 'googleapis'
import { split } from 'lodash/fp'
import { getSheet } from './helpers/spreadsheets'

const result = config()
if (result.error) {
  //
}
if (typeof process.env.GOOGLE_SERVICE_ACCOUNT_B64 !== 'string') {
  throw Error('GOOGLE_SERVICE_ACCOUNT_B64 must be defined as environment variable')
}

const scopes = split(',')(process.env.SCOPES || 'https://www.googleapis.com/auth/spreadsheets')

const GOOGLE_KEYS = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
)

// @ts-ignore: Load JWT or UserRefreshClient from GOOGLE_KEYS environmental variable. (they have incompatible types)
const client: JWT = auth.fromJSON(GOOGLE_KEYS)
client.scopes = scopes

const authorize = async () => {
  await client.authorize()
  google.options({ auth: client })
  return google
}

export default {
  authorize,
  getSheet
}

