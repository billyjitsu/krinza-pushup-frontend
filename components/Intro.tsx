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
import EscrowContract from "../contract/escrow.json";

const Intro = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
 // const [contractAddress, setContractAddress] = useState<string>("");
  const [nft, setNFT] = useState("");

  const ESCROWCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const contractConfig = {
    address: ESCROWCONTRACT,
    abi: EscrowContract.abi,
  };

  // const handleChange = (e: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   try {
  //     setContractAddress(e.target.value);
  //   } catch (error) {}

  //   console.log(contractAddress);
  // };

  // Hater or Believer ///////////////////
  // hater
  const { config: voteHaterConfig, data: dataHaterVote } =
  usePrepareContractWrite({
    ...contractConfig,
    functionName: "depositVote",
    args: [
      false
    ],
    overrides: {
      gasLimit: 1500000,
      value: ethers.utils.parseEther("0.1"),
    },
    onError(error:any) {
      console.log("Error", error);
    },
  } as unknown as UsePrepareContractWriteConfig);

  const {
    data: voteHaterData,
    writeAsync: voteHater,
    isLoading: isvoteHaterLoading,
    isSuccess: isvoteHaterSuccess,
  } = useContractWrite(voteHaterConfig as UseContractWriteConfig);

  const voteHaterFunction = async () => {
    try {

      if(typeof voteHater === "function") {
      let nftTxn = await voteHater?.();
      setLoading(true);
      await nftTxn.wait();
      setLoading(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  //Believer
  const { config: voteBelieveConfig, data: dataVote } =
  usePrepareContractWrite({
    ...contractConfig,
    functionName: "depositVote",
    args: [
      true
    ],
    overrides: {
      gasLimit: 1500000,
      value: ethers.utils.parseEther("0.1"),
    },
    onError(error:any) {
      console.log("Error", error);
    },
  } as unknown as UsePrepareContractWriteConfig);

  const {
    data: voteBelieveData,
    writeAsync: voteBeleive,
    isLoading: isvoteBelieveLoading,
    isSuccess: isvoteBelieveSuccess,
  } = useContractWrite(voteBelieveConfig as UseContractWriteConfig);

  const voteBeleiveFunction = async () => {
    try {

      if(typeof voteBeleive === "function") {
      let nftTxn = await voteBeleive?.();
      setLoading(true);
      await nftTxn.wait();
      setLoading(false);
      }

    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////////////////

  //Read String Status ////////////////////////////
  const { data: nameCheck } = useContractRead({
    ...contractConfig,
    functionName: "name",
    watch: true,
  } as UseContractReadConfig);

  useEffect(() => {

  }, [nameCheck]);
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

  // just check to make sure I can read
  useEffect(() => {
      console.log("Read:", nameCheck);
  }, [nameCheck]);

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
                      The Krinza{" "}
                      <span className="line-through text-red-500">
                        10
                      </span>{" "}
                      1 Push Challenge <br></br>
                    </h1>
                    <h1 className="text-md md:text-xl text-white">
                      Choose your side:
                    </h1>
                  </>
                )}

                <div className="flex flex-col max-w-s items-center text-center md:items-start ">
                  {
                    /*!isLoading && */ !loading && isConnected && (
                      <>
                        <div className="flex flex-col md:flex-row w-full md:w-full md:space-x-2 items-center "></div>
                        <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
                          <button
                            className=" bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2 text-white font-bold"
                            onClick={voteHaterFunction}
                          >
                            Hater
                          </button>
                          <p className="text-white md:pt-1 ">or</p>
                          <button
                            className="md:w-1/2 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                            onClick={voteBeleiveFunction}
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
