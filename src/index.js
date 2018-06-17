'use strict'

try {
  require('dotenv').config()
} catch (err) {
  // dotenv is optional dependency, don't throw if it's not installed
}

const { auth } = require('google-auth-library')
const { google } = require('googleapis')
const { split } = require('lodash/fp')

const {
  GOOGLE_SERVICE_ACCOUNT_B64,
  SCOPES,
} = process.env

const scopes = split(',')(SCOPES)

const GOOGLE_KEYS = JSON.parse(
  Buffer.from(GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
)

// Load JWT or UserRefreshClient from GOOGLE_KEYS environmental variable.
const client = auth.fromJSON(GOOGLE_KEYS)
client.scopes = scopes

const authorize = async () => {
  await client.authorize()

  google.options({ auth: client })
  return google
}

module.exports = {
  authorize,
}
