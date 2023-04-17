import React, { useEffect } from "react";
import { useState } from "react";
import { useContractRead } from "wagmi";
import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";
// import AuctionContract from "../contractABIs/AuctionABI.json";
// import NFTContract from "../contractABIs/NFT721.json";

export interface RetrieveProps {
  registrationCreator: any;
  depositedNFT: any;
  nftMetaData: any;
}

const RetrieveImage = () => {
  const AUCTIONCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  // const contractConfig = {
  //   address: AUCTIONCONTRACT,
  //   abi: AuctionContract.abi,
  // };

  const [nft, setNFT] = useState("");
  // const [registryCreator, setRegistryCreator] = useState("");

  //Registry Creator
  // const { data: registrationCreator } = useContractRead({
  //   ...contractConfig,
  //   functionName: "registryCreator",
  //   watch: true,
  // } as UseContractReadConfig);

  //Read Despositor information
  // const { data: depositedNFT } = useContractRead({
  //   ...contractConfig,
  //   functionName: "depositors",
  //   args: [registrationCreator],
  //   watch: true,
  // } as UseContractReadConfig);

  // const { data: nftMetaData } = useContractRead({
  //   address: depositedNFT?.nftContract,
  //   abi: NFTContract,
  //   functionName: "tokenURI",
  //   args: [0],
  //   watch: true,
  //   enabled: Boolean(depositedNFT),
  // } as UseContractReadConfig);

  // const getImage = async () => {
  //   const nftImage = await (await fetch(nftMetaData)).json();
  //   setNFT(nftImage.image);
  //   console.log("NFT Image", nftImage.image);
  //   // );
  // };

  // useEffect(() => {
  //   getImage();
  // }, [nftMetaData]);

  return (
    <div classNameName="text-white">
      {/* <button
        classNameName=" bg-blue-500 hover:bg-red-600 rounded-full px-7 py-2 text-white font-bold"
        onClick={getImage}
      >
        Push Me
      </button> */}
      {/* <img classNameName="w-96" src={nft}></img>
      <p classNameName="font-bold">Contract Address:</p>
      {depositedNFT && (
        <>
          {depositedNFT?.nftContract}
          <p classNameName="font-bold">
            Token ID: {depositedNFT.tknIdOwner.toString()}
          </p>
        </>
      )} */}
    </div>
  );
};

export default RetrieveImage;
