import dynamic from "next/dynamic";
import Image from "next/image";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import heroImage from "../images/push-up.webp";
import {
  useAccount,
  useProvider,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useContract,
} from "wagmi";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./Loading";
import RetrieveImage from "./RetrieveImage";
import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
  UseContractEventConfig,
} from "wagmi";
import EscrowContract from "../contract/escrow.json";

const Intro = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [eventHappened, setEventHappened] = useState<boolean>(false);
  const provider = useProvider();

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
      args: [false],
      overrides: {
        gasLimit: 1500000,
        value: ethers.utils.parseEther("0.0026"),
      },
      onError(error: any) {
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
      if (typeof voteHater === "function") {
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
  const { config: voteBelieveConfig, data: dataVote } = usePrepareContractWrite(
    {
      ...contractConfig,
      functionName: "depositVote",
      args: [true],
      overrides: {
        gasLimit: 1500000,
        value: ethers.utils.parseEther("0.0026"),
      },
      onError(error: any) {
        console.log("Error", error);
      },
    } as unknown as UsePrepareContractWriteConfig
  );

  const {
    data: voteBelieveData,
    writeAsync: voteBeleive,
    isLoading: isvoteBelieveLoading,
    isSuccess: isvoteBelieveSuccess,
  } = useContractWrite(voteBelieveConfig as UseContractWriteConfig);

  const voteBeleiveFunction = async () => {
    try {
      if (typeof voteBeleive === "function") {
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

  //Claim Prize
  const { config: collectConfig, data: dataCollect } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "collectPayout",
    overrides: {
      gasLimit: 1500000,
    },
    onError(error: any) {
      console.log("Error", error);
    },
  } as unknown as UsePrepareContractWriteConfig);

  const {
    data: collectData,
    writeAsync: collectPay,
    isLoading: iscollectLoading,
    isSuccess: iscollectSuccess,
  } = useContractWrite(collectConfig as UseContractWriteConfig);

  const collectPayFunction = async () => {
    try {
      if (typeof collectPay === "function") {
        let nftTxn = await collectPay?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////////////////

  const listen = useContract({
    address: ESCROWCONTRACT as any,
    abi: EscrowContract.abi,
    signerOrProvider: provider,
  });

  const getPastEvents = async () => {
    const events = await (listen?.queryFilter(
      "gameEnded",
      35447840,
      "latest"
    ) ?? []);
    console.log(events);
    if (events.length > 0) {
      console.log("The event has occurred");
      setEventHappened(true);
    } else {
      console.log("The event has not occurred");
    }
  };

  useEffect(() => {
    getPastEvents();
  }, []);

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
                      <span className="line-through text-red-500">10</span> 1
                      Push Challenge <br></br>
                    </h1>
                    {!eventHappened && (<h1 className="text-md md:text-xl text-white">
                      Choose your side:
                    </h1>)}
                    {eventHappened && (<h1 className="text-md md:text-xl text-white">
                      Claim your prize:
                    </h1>)}
                  </>
                )}

                <div className="flex flex-col max-w-s items-center text-center md:items-start ">
                  {!loading && isConnected && !eventHappened && (
                    <>
                      {/* <div className="flex flex-col md:flex-row w-full md:w-full md:space-x-2 items-center "></div> */}
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
                  )}
                  {isConnected && eventHappened && (
                    <>
                      <button
                        className="md:w-1/5 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                        onClick={collectPayFunction}
                      >
                        Claim
                      </button>
                    </>
                  )}

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
