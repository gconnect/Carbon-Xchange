import React, {useEffect, useCallback, useState} from 'react'
import ToucanClient, { UserRetirementsResponse } from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';
import { formattedDate, truncate } from '@/utils/util';
import Link from 'next/link';

export default function Retirements() {
  const {address} = useAccount()
  const [retirements, setRetirements] = useState<UserRetirementsResponse[] | undefined>([])

  const fetchResult =useCallback(async () => {
    const sdk = new ToucanClient("alfajores");
    const retire = await sdk.fetchUserRetirements(address?.toLocaleLowerCase() as string)
    setRetirements(retire)
    console.log(retire)
    return retire
    },[address])
  
  useEffect(() => {
      fetchResult()
    })

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead
                  className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
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
                  <tr key={index} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">{item.token.name}</td>
                  <td className="whitespace-nowrap  px-6 py-4"><Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/address/${item.token.address}`}> {truncate(item.token.address)} </Link></td>
                  <td className="whitespace-nowrap  px-6 py-4">{parseInt(item.amount)/1e18}</td>
                    <td className="whitespace-nowrap  px-6 py-4"><Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/tx/${item.creationTx}`}> {`${item.creationTx.substring(0,10)}...`} </Link></td>
                  <td className="whitespace-nowrap  px-6 py-4">{formattedDate(parseInt(item.timestamp))}</td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
