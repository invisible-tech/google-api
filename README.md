# @invisible/google-auth

This package wraps the complexity of Google's auth for service workers and return authorized `googleapis`.

## How to use this package?

1. Set the environmental variables:
```bash
# GOOGLE_SERVICE_ACCOUNT_B64 is the json service worker credentials encoded in base64.
GOOGLE_SERVICE_ACCOUNT_B64
# SCOPES is a comma separated list of scopes.
SCOPES
```

- You can add environmental variables to your `.env` file and install `dotenv` as dependency/devDependency.

2. Programatically usage:

```javascript
const googleAuth = require('@invisible/google-auth')

const main = async () => {
  const google = await googleAuth.authorize()

  const sheets = google.sheets('v4')
  // You can use the authorized sheets API now.
}
main()
```
