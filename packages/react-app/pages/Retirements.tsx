import React from 'react'
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';

export default function Retirements() {

  const fetchResult = async () => {
    const sdk = new ToucanClient("alfajores");
    const tokens = await sdk.fetchAllTCO2Tokens()
    const poolContents = await sdk.fetchPoolContents("BCT")

    const result = await sdk.fetchUserRedeems(address as string, "BCT")
    const retire = await sdk.fetchUserRetirements(address as string)

    console.log(poolContents)
    return(poolContents)
  }

  return (
    <div>Retirements</div>
  )
}
