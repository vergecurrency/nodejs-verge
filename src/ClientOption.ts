export interface ClientOption {
  host?: string
  port?: number
  method?: string
  user?: string
  pass?: string
  headers?: HeaderOption
  passphrasecallback?: Function
  https?: boolean
  ca?: string
}

export interface HeaderOption {
  Host?: string
  Authorization?: string
}
