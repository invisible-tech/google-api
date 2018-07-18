import {
  zipObject,
  first,
  flow,
  get,
  map,
  tail,
} from 'lodash/fp'

export const spreadsheetToJSON = (sheet: any) => {
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
export const getSheet = ({ client, spreadsheetId, range }) =>
  client.sheets('v4').spreadsheets.values
    .get({ spreadsheetId, range })
    .then(spreadsheetToJSON)