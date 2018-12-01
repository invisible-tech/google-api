import 'dotenv/config'
import { auth, JWT } from 'google-auth-library'
import { google as googleAPIClient} from 'googleapis'
import { split } from 'lodash/fp'
import sheets from './helpers/spreadsheets'

const buildClient = (googleServiceAccountB64: string, scopes: string) => {
  const scopesSplit = split(',')(scopes)

  const googleKeys = JSON.parse(
    Buffer.from(googleServiceAccountB64, 'base64').toString('utf8')
  )

  const client = <JWT>auth.fromJSON(googleKeys)
  client.scopes = scopesSplit

  return client
}

const authorize = async (googleServiceAccountB64: string, scopes: string) => {
  const client = buildClient(googleServiceAccountB64, scopes)
  await client.authorize()
  googleAPIClient.options({ auth: client })
  return {
    sheets: sheets(googleAPIClient)
  }
}

export default {
  authorize
}
