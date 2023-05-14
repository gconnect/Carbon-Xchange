import React, {useState, useEffect, useCallback} from 'react'
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';
import { RedeemsResponse } from 'toucan-sdk';


export default function Redeems() {
  const {address} = useAccount()
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const [redeems, setRedeems] = useState<RedeemsResponse[] | undefined>([])

    const fetchResult =useCallback(async () => {
    const sdk = new ToucanClient("alfajores");
    // const tokens = await sdk.fetchAllTCO2Tokens()
      const myAddress = address?.toLocaleLowerCase() as string
      const list = await sdk.fetchUserRedeems(myAddress, "NCT")
      setRedeems(list)
      console.log(redeems)
    return redeems
    },[address,redeems])
  
  useEffect(() => {
      fetchResult()
    },[fetchResult])

  return (
    <div>Redeems</div>
  )
}
