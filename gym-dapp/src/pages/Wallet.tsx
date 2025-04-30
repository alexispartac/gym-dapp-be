import React from 'react'
import { Container } from '@chakra-ui/react'
import { CardContainer,  CardBody, CardItem } from '../components/ui/3d-card-efect'
import { NFTCollection } from "../assets/NFTCollection"
import { useUser } from '../context/UserContext'
export interface UserNFT {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    owner: string;
    creator: string;
    creator_fee: number;
    royalty: number;
    token_id: number;
    token_uri: string;
    token_type: string;
    chain: string;
    minted: boolean;
    listed: boolean;
    for_sale: boolean;
    sold: boolean;
};

const NFTCard = ( { nft, userNFT } : { nft : UserNFT, userNFT : UserNFT[] } ) => {

  const isInUserCollection = userNFT.some((nftItem) => nftItem.id === nft.id);

  return (
    <CardContainer className='m-2'>
      <CardBody>
        <CardItem
          className='bg-neutral-800 rounded-lg'
          translateX={0}
          translateY={0}
          translateZ={0}
          rotateX={0}
          rotateY={0}
          rotateZ={0}
        >
          <img 
            src={`/${nft.image}`} 
            alt="NFT" 
            className={`rounded-lg h-[6em] w-[5em] md:h-[12em] md:w-[10em] contain-content m-auto ${ !isInUserCollection ? "opacity-15" : ''}`} />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

const NFTColection = () => {
  const { NFT } = useUser();
  const userNFT = NFT;
  return (
    <Container>
      <h1 className='text-xl font-bold text-neutral-200'>NFT Collection</h1>
      <br />
      <div className='flex flex-row flex-wrap '>
        { NFTCollection.map((nft, index) => (
          <div key={index} className='flex flex-col items-center'>
            <NFTCard nft={nft} userNFT={userNFT} />
            <h1 className='text-neutral-200 text-[10px] md:text-sm'>{nft.name}</h1>
          </div>
        ))}
        <div className='flex flex-col items-center'>
          <h1 className='text-neutral-200 text-[10px] items-center px-[10px] m-auto flex flex-col md:text-sm'>Coming Soon...</h1>
        </div>
      </div>
    </Container>
  )
}

const Wallet = () => {

  return (
    <Container p={0} m={0} w={"100%"} className='flex flex-col align-center' >
          <h1 className='text-3xl p-[5px] text-neutral-200'>Wallet</h1>
          <br />
          <NFTColection />
          <br /> <br /> <br />
    </Container>
  )
}

export default Wallet
