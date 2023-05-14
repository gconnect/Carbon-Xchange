import React, {useState, useEffect, useCallback} from 'react'
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';

export default function Redeems() {
  const {address} = useAccount()

    const fetchResult =useCallback(async () => {
    const sdk = new ToucanClient("alfajores");
    // const tokens = await sdk.fetchAllTCO2Tokens()
    const poolContents = await sdk.fetchPoolContents("BCT")

      const redeems = await sdk.fetchRedeems("NCT")
    

      console.log(redeems)
      console.log(poolContents)
    return redeems
    },[])
  
  useEffect(() => {
      fetchResult()
    })

  return (
    <div>Redeems</div>
  )
}
