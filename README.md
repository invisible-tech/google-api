# @invisible/google-api

This package wraps the complexity of Google's auth for service workers and returns authorized [`googleapis`](http://google.github.io/google-api-nodejs-client/) with some helpers.

## How to use this package?

1. You need to pass auth token and scopes(optional, spreadsheets by default) as parameters to `.authorize()` or as environmental variables:
```bash
# GOOGLE_SERVICE_ACCOUNT_B64 is the json service worker credentials encoded in base64.
GOOGLE_SERVICE_ACCOUNT_B64
# SCOPES is a comma separated list of scopes.
SCOPES
```

- You can add environmental variables to your `.env` file (`env.sample` as example)

2. API:

```typescript
import google from '@invisible/google-api'

const { sheets } = await google.authorize(GOOGLE_SERVICE_ACCOUNT_B64, SCOPES)

sheets.getSheet(spreadsheetId, range)

```

## Publish to NPM
```bash
npm run build
npm publish
```