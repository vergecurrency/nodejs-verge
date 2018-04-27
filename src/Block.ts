export interface Block {
  hash: string
  confirmations: string
  size: string
  height: string
  version: string
  algo_id: string
  algo: string
  mined_hash: string
  merkleroot: string
  mint: string
  time: string
  nonce: string
  bits: string
  difficulty: string
  previousblockhash?: string
  nextblockhash?: string
  flags: string
  proofhash: string
  entropybit: string
  modifier: string
  modifierchecksum: string
  tx: string
  signature: string
}
