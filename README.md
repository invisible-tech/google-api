# Upwork Scraper

This package gets the first page of jobs applications on Upwork and append into a spreadsheet.

How to use this package?

1. Set the environmental variables:
```
NODE_ENV

# Google Credentials
GOOGLE_SERVICE_ACCOUNT_B64
KEYWORDS_SPREADSHEET_ID

# Upwork Credentials
CONSUMER_KEY
CONSUMER_SECRET

ACCESS_TOKEN
ACCESS_SECRET
```

* If it expires or you don't have the `ACCESS_TOKEN` or `ACCESS_SECRET` environmental variables, run `yarn get-access-token`.

2. Run:

```bash
$ node upwork.js
```
