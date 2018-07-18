# @invisible/google-apis

This package wraps the complexity of Google's auth for service workers and returns authorized [`googleapis`](http://google.github.io/google-api-nodejs-client/) with some helpers.

## How to use this package?

1. You need to pass auth token and scopes(optional, spreadsheets by default) as environmental variables:
```bash
# GOOGLE_SERVICE_ACCOUNT_B64 is the json service worker credentials encoded in base64.
GOOGLE_SERVICE_ACCOUNT_B64
# SCOPES is a comma separated list of scopes.
SCOPES
```

- You can add environmental variables to your `.env` file (`env.sample` as example)

2. API:

```typescript
import { authorize, getSheet } from '@invisible/google-apis'

const main = async () => {
  const googleClient = await autorize() // 'googleapis' client

  const sheet = getSheet(googleClient, spreadsheetId, range) 
  // OR
  const sheets = googleClient.sheets('v4')
}
main()
```

```javascript
const googleAuth = require('@invisible/google-apis')

const main = async () => {
  const googleClient = await googleAuth.authorize()

  const sheet = getSheet(googleClient, spreadsheetId, range) 
  // OR
  const sheets = googleClient.sheets('v4')
}
main()
```

## Publish to NPM
```bash
npm run build
npm publish
```