import dynamic from "next/dynamic";
import Image from "next/image";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import heroImage from "../images/push-up.webp";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./Loading";
import RetrieveImage from "./RetrieveImage";
import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";

const Intro = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [increment, setIncrement] = useState("");
  const [nft, setNFT] = useState("");

  const AUCTIONCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  // const contractConfig = {
  //   address: AUCTIONCONTRACT,
  //   abi: AuctionContract.abi,
  // };

  // const nftContractConfig = {
  //   address: contractAddress as String, 
  //   abi: NFTContract,
  // };

  const handleContractChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    try {
      setContractAddress(e.target.value);
    } catch (error) {}

    console.log(contractAddress);
  };

  const handleTokenIdChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    try {
      setTokenId(e.target.value);
    } catch (error) {}

    console.log(tokenId);
  };

  const handleBidChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    try {
      setStartingBid(e.target.value);
    } catch (error) {}

    console.log(startingBid);
  };

  const handleIncrementChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    try {
      setIncrement(e.target.value);
    } catch (error) {}

    console.log(increment);
  };

  //set approval for the Auction Contract to pull in the NFT//
  // const { config: approveConfig, data: data } = usePrepareContractWrite({
  //   ...nftContractConfig,
  //   functionName: "setApprovalForAll",
  //   args: [AUCTIONCONTRACT, true],
  //   overrides: {
  //     //value: ethers.utils.parseEther("0"),
  //     gasLimit: 1500000,
  //   },
  //   onError(error: any) {
  //     console.log("Error", error);
  //   },
  // } as unknown as UsePrepareContractWriteConfig);

  // const {
  //   data: approveData,
  //   writeAsync: approveTheNFT,
  //   isLoading: isLoading,
  //   isSuccess: isSuccess,
  // } = useContractWrite(approveConfig as UseContractWriteConfig);

  // const approveTokenFunction = async () => {
  //   try {
  //     console.log("Contract : tokenId", contractAddress, tokenId);

  //     if(typeof approveTheNFT === "function") {
  //     let nftTxn = await approveTheNFT?.();
  //     setLoading(true);
  //     await nftTxn.wait();
  //     setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  ///////////////////////////////////////////////////////

  // Register NFT to Auction Contract ///////////////////
  // const { config: registerNFTConfig, data: dataRegistration } =
  // usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "registerNFTAuction",
  //   args: [
  //     contractAddress,
  //     tokenId,
  //     ethers.utils.parseEther(startingBid.toString() || "0"), 
  //     ethers.utils.parseEther(increment.toString() || "0"), 
  //   ],
  //   overrides: {
  //     gasLimit: 1500000,
  //   },
  //   onError(error:any) {
  //     console.log("Error", error);
  //   },
  // } as unknown as UsePrepareContractWriteConfig);

  // const {
  //   data: nftRegisterData,
  //   writeAsync: nftRegister,
  //   isLoading: isNFTRegisterLoading,
  //   isSuccess: isNFTRegisterSuccess,
  // } = useContractWrite(registerNFTConfig as UseContractWriteConfig);

  // const nftRegisterFunction = async () => {
  //   try {

  //     if(typeof nftRegister === "function") {
  //     let nftTxn = await nftRegister?.();
  //     //temp
  //     getImage();
  //     ///
  //     setLoading(true);
  //     await nftTxn.wait();
  //     setLoading(false);
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  ///////////////////////////////////////////////////////

  //Read Registration Status ////////////////////////////
  // const { data: nftApprovedToAuction } = useContractRead({
  //   ...contractConfig,
  //   functionName: "registered",
  //   watch: true,
  // } as UseContractReadConfig);

  // useEffect(() => {
    
  // }, [nftApprovedToAuction]);
  ///////////////////////////////////////////////////////

  //Find the token URI of NFT ////////////////////////////
  // const { data: nftMetaData } = useContractRead({
  //   ...nftContractConfig,
  //   functionName: "tokenURI",
  //   args: [tokenId],
  //   watch: true,
  // } as unknown as UseContractReadConfig);

  // const getImage = async () => {
  //   const nftImage = await (await fetch(nftMetaData as string)).json();
  //   setNFT(nftImage.image);
  //  // console.log("NFT Image", nftImage.image);
  // };
  ///////////////////////////////////////////////////////

  ////Withdraw /////////////////////////////////////////
  // const { config: withdrawConfig, data: dataWithdraw } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "withdrawAuctionFunds",
  //   //args: [300],
  //   overrides: {
  //     gasLimit: 1500000,
  //   },
  //   onError(error : any) {
  //     console.log("Error", error);
  //   },
  // } as unknown as UsePrepareContractWriteConfig);

  // const {
  //   data: withdrawData,
  //   writeAsync: withdrawAuction,
  //   isLoading: isWithdrawAuctionLoading,
  //   isSuccess: isWithdrawAuctionSuccess,
  // } = useContractWrite(withdrawConfig as UseContractWriteConfig);

  // const withdrawFundsFunction = async () => {
  //   try {
  //     if(typeof withdrawAuction === "function"){
  //     let nftTxn = await withdrawAuction?.();
  //     setLoading(true);
  //     await nftTxn.wait();
  //     setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //////////////////////////////////////////////////////

  //Read Auction Status ////////////////////////////
  // const { data: auctionStartedStatus } = useContractRead({
  //   ...contractConfig,
  //   functionName: "auctionStarted",
  //   watch: true,
  // } as UseContractReadConfig);
  /////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////


  return (
    <div className="bg-black h-screen w-full ">
      <>
        {!loading && (
          <div className="flex flex-col md:flex-row px-5 justify-center lg:mr-16 h-screen w-full">
            <div className="m-auto  pt-14 md:pt-0 ml-auto mr-auto md:ml-24 md:mr-10">
              <div>
                {<Image src={heroImage} alt="heroBanner" width={350} />}
              </div>
            </div>

            <div className="flex flex-col  items-center justify-center -mt-6 md:mt-0 sm:-ml-0 md:-ml-12">
              <div className="text-center md:text-left md:ml-16 space-x-2 space-y-5">
                {!loading && (
                  <>
                    <h1 className="text-3xl md:text-5xl font-bold text-white ">
                      The Krinza 10 Push Challenge <br></br> 
                    </h1>
                    <h1 className="text-md md:text-xl text-white">
                      Choose your side:
                    </h1>
                  </>
                )}

                <div className="flex flex-col max-w-s items-center text-center md:items-start ">
                  {
                    /*!isLoading && */ !loading &&
                      isConnected &&
                      (
                        <>
                          <div className="flex flex-col md:flex-row w-full md:w-full md:space-x-2 items-center ">
                            
                          </div>
                          <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
                            <button
                              className=" bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2 text-white font-bold"
                              // onClick={}
                            >
                              Hater
                            </button>
                            <p className="text-white md:pt-1 ">or</p>
                            <button
                              className="md:w-1/2 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                              // onClick={}
                            >
                              Believer
                            </button>
                          </div>
                        </>
                      )
                  }

                  {!isConnected && (
                    <>
                      <ConnectButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Screen */}
        {loading && isConnected && <LoadingScreen />}

      </>
    </div>
  );
};

// export default Intro;
export default dynamic(() => Promise.resolve(Intro), { ssr: false });
