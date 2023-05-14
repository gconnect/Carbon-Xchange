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
    // const poolContents = await sdk.fetchPoolContents("BCT")

    // const result = await sdk.fetchUserRedeems(address as string, "NCT")
    const retire = await sdk.fetchUserRetirements(address as string)

    console.log(retire)
    return retire
    },[address])
  
  useEffect(() => {
      fetchResult()
    })

  return (
    <div>Redeems</div>
  )
}
