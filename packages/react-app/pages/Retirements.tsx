import React, {useEffect, useCallback, useState} from 'react'
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';

export default function Retirements() {
  const {address} = useAccount()

  const fetchResult =useCallback(async () => {
    const sdk = new ToucanClient("alfajores");
    const retire = await sdk.fetchUserRetirements(address as string)
    console.log(retire)
    console.log(retire)
    return retire
    },[address])
  
  useEffect(() => {
      fetchResult()
    })

  return (
    <div>Retirements</div>
  )
}
