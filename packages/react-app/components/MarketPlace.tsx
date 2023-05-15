import React, { useCallback , useEffect, useState} from 'react'
import axios from 'axios';
import { gql, useQuery } from "@apollo/client";
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Router from 'next/router';
import ToucanClient from 'toucan-sdk';

const MarketPlace: React.FC = () => {
  const [images, setImages] = useState<any[]>([])
  const [show, setShow] = useState<boolean>(false)
  const { address } = useAccount()
  const [searchItem, setSearchItem] = useState<string>("")
  const [filteredList, setFilteredList] = useState<any[]>([])
  const [tokens, setTokens] = useState<any[]>([])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(e.currentTarget.value)
  }

  const CARBON_OFFSETS = gql`
  query CarbonOffsets {
    tco2Tokens{
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

  // const filterList = gql`
  //   query filterTCO2 {
  //   tco2Tokens(where: {symbol: "TCO2-VCS-1052-2012"}){
  //     id
  //     symbol
  //     name
  //   }
  // }
  // `

  const fetchTC02Tokens = async () => {
    const toucan = new ToucanClient("alfajores")
    const tokens = await toucan.fetchAllTCO2Tokens()
    setTokens(tokens)
    console.log(tokens)
  }
  
   const getImages = useCallback(async ()  => {
     const response = await axios.get(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_IMAGE_KEY}&q=nature&image_type=photo&per_page=200`)
     setImages(response.data.hits)
     console.log(images.length)
   }, [])

  useEffect(() => {
    getImages()
    fetchTC02Tokens()
  }, [getImages])
  
  const { loading, error, data } = useQuery(CARBON_OFFSETS);

  const searchToken = () => {
    const tokenData = data && data.tco2Tokens.filter((item: any) => item.symbol === searchItem
      || item.name === searchItem ||
      item.address === searchItem
    )
    console.log(tokenData)
    setFilteredList(tokenData)
    // setSearchItem("")
  }

  return (
    <div>
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Carbon Credit Marketplace
      </h1>
      <p className="text-center text-gray-600 my-2 text-lg ">
        Discover and purchase carbon credits to offset your carbon footprint
        </p>
        <div>
          <input className='border p-4 w-3/4 my-4' type="text" placeholder='Search TCO2 token by token symbol, name, or token address' value={searchItem} onChange={handleSearch} />
          <button onClick={searchToken} className='bg-yellow-400 p-4 rounded'>Search</button>
        </div>
      </div>
      {loading ? <div className='text-center'>Loading</div> : error ? <div>Error occured</div> : filteredList && filteredList.length !== 0 ? <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          { filteredList && filteredList.map((item: any, index: number) => <div key={index}>
            <div className="drop-shadow-md bg-white m-2 p-4 cursor:pointer">
              {images && <Image className='w-full' key={index} src={images[index].webformatURL && images[index].webformatURL} alt='images' height={200} width={200} />}
              {item.name}
              <button
                onClick={() =>
                  Router.push({
                    pathname: `/MarketPlace/${item.address}`,
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
      </div> :
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          { data && data.tco2Tokens.map((item: any, index: number) => <div key={index}>
            <div className="drop-shadow-md bg-white m-2 p-4 cursor:pointer">
              {images && <Image className='w-full' key={index} src={images[index]?.webformatURL && images[index].webformatURL} alt='images' height={200} width={200} />}
              {item.name}
              <button
                onClick={() =>
                  Router.push({
                    pathname: `/MarketPlace/${item.address}`,
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
      }
  </div>
  )
}

export default MarketPlace