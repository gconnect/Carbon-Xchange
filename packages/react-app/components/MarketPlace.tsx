import React, { useCallback , useEffect, useState} from 'react'
import axios from 'axios';
import { gql, useQuery } from "@apollo/client";
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Router from 'next/router';

const MarketPlace: React.FC = () => {
  const [images, setImages] = useState<any[]>([])
  const [show, setShow] = useState<boolean>(false)
  const { address } = useAccount()
  
  const CARBON_OFFSETS = gql`
  query CarbonOffsets {
    tco2Tokens(first: 16){
    id
    symbol
    name
    createdAt
    address
    creationTx
    score
    projectVintage {
      creator {
        id
      }
      endTime
      id
      isCCPcompliant
      isCorsiaCompliant
      name
      startTime
      timestamp
      totalVintageQuantity
      tx
      owner {
        id
      }
    }
  }
}`;

  
   const getImages = useCallback(async ()  => {
     const response = await axios.get(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_IMAGE_KEY}&q=nature&image_type=photo`)
     setImages(response.data.hits)
   }, [])

  useEffect(() => {
    getImages()
    // fetchResult()
  },[getImages])
  
  const { loading, error, data } = useQuery(CARBON_OFFSETS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div>
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Carbon Credit Marketplace
      </h1>
      <p className="text-center text-gray-600 my-2 text-lg ">
        Discover and purchase carbon credits to offset your carbon footprint
      </p>
    </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      {data && data.tco2Tokens.map((item: any, index: number) => <div key={index}>
        <div className="drop-shadow-md bg-white m-2 p-4 cursor:pointer">
          {images && <Image className='w-full' key={index} src={images[index].webformatURL} alt='images' height={200} width={200}/> } 
          {item.name}
          <button
            onClick={() =>
              Router.push({
              pathname: `/MarketPlace/${item.id}`,
                query: {
                  id: item.id,
                  symbol: item.symbol,
                  name: item.name,
                  image: images[index].webformatURL,
                  tokenAddress: item.address,
                  createdAt: item.createdAt,
                  creationTx: item.creationTx,
                  score: item.score,
                  projectVintageCreatorId: item.projectVintage.creator.id,                
                  startTime: item.projectVintage.startTime,
                  endTime: item.projectVintage.endTime,
                  projectVintageId: item.projectVintage.id,
                  isCCPcompliant: item.projectVintage.isCCPcompliant,
                  isCorsiaCompliant: item.projectVintage.isCorsiaCompliant,
                  vintageName: item.projectVintage.name,
                  totalVintageQuantity: item.projectVintage.totalVintageQuantity,
                  tx: item.projectVintage.tx,
                  owner: item.projectVintage.owner.id
                }
            })
            }
              type="button"
              className="inline-block bg-yellow-500 p-2 my-2 w-full rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-toggle="modal"
              data-te-target="#redeemModal"
              data-te-ripple-init
              data-te-ripple-color="light">
              View Details
          </button>
        </div> 
      </div>
      )}
    </div>
  </div>
  )
}

export default MarketPlace