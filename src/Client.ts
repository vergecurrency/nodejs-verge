import { API } from './API'
import * as http from 'http'
import { RPCErrorCode } from './RPCErrorCode'
import { ClientOption } from './ClientOption'
import * as https from 'https'
import { RPCResponse } from './RPCResponse'
import { Transaction } from './Transaction'
import { Block } from './Block'

export class Client extends API {
  options: ClientOption
  errors: RPCErrorCode[]

  constructor(options: ClientOption) {
    super()
    this.options = {
      host: 'localhost',
      port: 20102,
      method: 'POST',
      user: '',
      pass: '',
      headers: {
        Host: 'localhost',
        Authorization: '',
      },
      passphrasecallback: null,
      https: false,
      ca: null,
      ...options,
    }

    if (this.options.user && this.options.pass) {
      this.options.headers.Authorization = `Basic ${new Buffer(
        this.options.user + ':' + this.options.pass
      ).toString('base64')}`
    }
  }

  private send(command: string, ...args: any[]): Promise<any> {
    var rpcData = {
      id: new Date().getTime(),
      method: command.toLowerCase(),
      params: args.filter(item => !!item),
    }

    var options = this.options
    options.headers['Content-Length'] = JSON.stringify(rpcData).length

    var request
    if (this.options.https === true) {
      request = https.request
    } else {
      request = http.request
    }

    const promisedRequest = new Promise<any>((resolve, reject) => {
      const rpcRequest = request(options, function(res) {
        let data = ''

        res.setEncoding('utf8')

        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          try {
            const rpcResponse: RPCResponse = JSON.parse(data)
            if (rpcResponse.id != rpcData.id) {
              throw new Error('Possible Man-in-the-middle Attack!!!')
            }
            if (rpcResponse.error) {
              if (
                rpcResponse.error.code ===
                  RPCErrorCode.RPC_WALLET_UNLOCK_NEEDED &&
                options.passphrasecallback
              ) {
                //TODO: Handle special case :thinking:
                return this.unlock(command, args, () => {})
              } else {
                var err = JSON.stringify(rpcResponse)
                return reject(err)
              }
            }
            console.log(rpcResponse)
            resolve(
              rpcResponse.result !== null ? rpcResponse.result : rpcResponse
            )
          } catch (exception) {
            var errMsg =
              res.statusCode !== 200
                ? 'Invalid params ' + res.statusCode
                : 'Failed to parse JSON'
            errMsg += ' : ' + JSON.stringify(data)
            return reject(new Error(errMsg))
          }
        })
      })

      rpcRequest.on('error', error => reject(error))
      rpcRequest.end(JSON.stringify(rpcData))
    })

    return promisedRequest
  }

  private auth(user: string, pass: string) {
    if (user && pass) {
      var authString =
        'Basic ' + new Buffer(user + ':' + pass).toString('base64')
      this.options.headers['Authorization'] = authString
    }
    return this
  }

  /* TODO: make unlock working again
  private unlock(command, args, fn) {
    var self = this

    var retry = function(err) {
      if (err) {
        fn(err)
      } else {
        var sendargs = args.slice()
        sendargs.unshift(command)
        sendargs.push(fn)
        self.send.apply(self, sendargs)
      }
    }

    this.options.passphrasecallback(command, args, function(
      err,
      passphrase,
      timeout
    ) {
      if (err) {
        fn(err)
      } else {
        self.send('walletpassphrase', passphrase, timeout, retry)
      }
    })
  }*/

  getBalance(account?: string): Promise<number> {
    return this.send('getbalance', account).catch(console.error)
  }
}
