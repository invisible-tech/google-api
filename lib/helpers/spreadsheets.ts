import {
  zipObject,
  first,
  flow,
  get,
  map,
  tail,
} from 'lodash/fp'

const spreadsheetToJSON = (sheet: any) => {
  const rows = get('data.values')(sheet)
  const header = first(rows)
  return flow(
    // @ts-ignore: typing issues
    tail,
    // @ts-ignore: typing issues
    map(zipObject(header)),
  )(rows)
}

// @ts-ignore: non-specified parameters
const loadSheet = (googleAPIClient, spreadsheetId, range) =>
  googleAPIClient.sheets('v4').spreadsheets.values
    .get({ spreadsheetId, range })
    .then(spreadsheetToJSON)

const sheets = googleAPIClient => {
  return {
      getSheet: function (spreadsheetId, range) {
        loadSheet(googleAPIClient, spreadsheetId, range)
      }
  }
}

export default sheets
