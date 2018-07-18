import {
  zipObject,
  first,
  flow,
  get,
  map,
  tail,
} from 'lodash/fp'

export const spreadsheetToJSON = sheet => {
  const rows = get('data.values')(sheet)
  const header = first(rows)
  return flow(
    tail,
    map(zipObject(header)),
  )(rows)
}

export const getSheet = ({ client, spreadsheetId, range }) =>
  client.sheets('v4').spreadsheets.values
    .get({ spreadsheetId, range })
    .then(spreadsheetToJSON)