import React, {useEffect, useCallback, useState} from 'react'
import ToucanClient, { UserRetirementsResponse } from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';
import { formattedDate, truncate } from '@/utils/util';
import Link from 'next/link';

export default function Retirements() {
  const { address } = useAccount()
  const [loading, setLoading] = useState<boolean>(false)

  const [retirements, setRetirements] = useState<UserRetirementsResponse[] | undefined>([])

  const fetchResult = useCallback(async () => {
    setLoading(true)
    const sdk = new ToucanClient("alfajores");
    const retire = await sdk.fetchUserRetirements(address?.toLocaleLowerCase() as string)
    setRetirements(retire)
    console.log(retire)
    setLoading(false)
    return retire
    },[address])
  
  useEffect(() => {
      fetchResult()
    })

  return (
    <div>
      {!address ? <div className='text-slate-400 text-center'>Please connect your wallet to view retirements </div> : retirements?.length == 0 ?
        <div>You don/'t have any retirements. Help reduce the level of emissions.
          Please select a token from the marketplace to retire </div>  :
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light border border-slate-600">
                <thead
                  className="border-slate-700 bg-slate-950 font-medium text-slate-400 dark:border-slate-400 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">Name</th>
                    <th scope="col" className=" px-6 py-4">Address</th>
                    <th scope="col" className=" px-6 py-4">Amount</th>
                    <th scope="col" className=" px-6 py-4">Transaction Hash</th>
                    <th scope="col" className=" px-6 py-4">Date Created</th>
                  </tr>
                </thead>
                <tbody>
                {retirements?.map((item, index) =>
                  <tr key={index} className="border-b dark:border-slate-600">
                  <td className="whitespace-nowrap  px-6 py-4 font-medium text-slate-400">{item.token.name}</td>
                  <td className="whitespace-nowrap  px-6 py-4 text-slate-400"><Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/address/${item.token.address}`}> {truncate(item.token.address)} </Link></td>
                  <td className="whitespace-nowrap  px-6 py-4 text-slate-400">{parseInt(item.amount)/1e18}</td>
                    <td className="whitespace-nowrap  px-6 py-4 text-slate-400"><Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/tx/${item.creationTx}`}> {`${item.creationTx.substring(0,10)}...`} </Link></td>
                  <td className="whitespace-nowrap  px-6 py-4 text-slate-400">{formattedDate(parseInt(item.timestamp))}</td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
       }
    </div>
  )
}
