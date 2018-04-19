import { Client } from './Client'
export { Client } from './Client'

const myClient: Client = new Client({
  pass: 'lolcat',
  user: 'kyon',
})

myClient.getBalance().then(console.log)
