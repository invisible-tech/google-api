import { config } from 'dotenv'
import { auth, JWT, UserRefreshClient } from 'google-auth-library'
import { google as googleAPIClient} from 'googleapis' 
import { split } from 'lodash/fp'
import sheets from './helpers/spreadsheets'

const result = config()

const buildClient = (GOOGLE_SERVICE_ACCOUNT_B64, SCOPES) => {
  if (GOOGLE_SERVICE_ACCOUNT_B64 === undefined)
    if (typeof process.env.GOOGLE_SERVICE_ACCOUNT_B64 !== 'string')
      throw Error('GOOGLE_SERVICE_ACCOUNT_B64 must be defined as environment variable or passed as parameter')
    else 
      GOOGLE_SERVICE_ACCOUNT_B64 = process.env.GOOGLE_SERVICE_ACCOUNT_B64

  const scopes = split(',')(SCOPES || process.env.SCOPES || 'https://www.googleapis.com/auth/spreadsheets')

  const GOOGLE_KEYS = JSON.parse(
    Buffer.from(GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
  )

  // @ts-ignore: Load JWT or UserRefreshClient from GOOGLE_KEYS environmental variable. (they have incompatible types)
  const client: JWT = auth.fromJSON(GOOGLE_KEYS)
  client.scopes = scopes

  return client
}

const authorize = async (GOOGLE_SERVICE_ACCOUNT_B64, SCOPES) => {
  const client = buildClient(GOOGLE_SERVICE_ACCOUNT_B64, SCOPES)
  await client.authorize()
  googleAPIClient.options({ auth: client })
  return {
    sheets: sheets(googleAPIClient)
  }
}

export default {
  authorize
}
