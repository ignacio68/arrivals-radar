import { ACCESS_KEY } from '@/setup/aviatonstack'
import { Http, HttpResponse } from '@nativescript/core'

const baseURL = 'http://api.aviationstack.com/v1/'
const searchMode = 'flights'

export const httpGetFlightByIcaoCode = (query: string): any => {
  const data = Http.request({
    url: `${baseURL}${searchMode}?access_key=${ACCESS_KEY}&flight_icao=${query}`,
    method: 'GET',
  }).then((response: HttpResponse) => {
    const content = response.content
    const obj = content.toJSON()
    console.log(`http::httpGet::query: ${query}`)
    console.log(`http::httpGet::result: ${JSON.stringify(obj)}`)
    return obj
  })
  return data
}
