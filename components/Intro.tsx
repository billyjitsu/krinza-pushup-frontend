import dynamic from "next/dynamic";
import Image from "next/image";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import heroImage from "../images/push-up.webp";
import { ChooseSideButton } from "./Buttons/ChooseSideButton";
import { ClaimPrizeButton } from "./Buttons/ClaimPrizeButton";
import backDropImage from "../images/pull.webp";
import hater from "../images/Hater.jpg";
import believer from "../images/Believer.jpg";
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
  const [eventHappened, setEventHappened] = useState<boolean>(true);
  const [minted, setMinted] = useState<boolean>(false);
  const [fullHater, setHater] = useState<boolean>(false);
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

  const listen = useContract({
    address: ESCROWCONTRACT as any,
    abi: EscrowContract.abi,
    signerOrProvider: provider,
  });

  const getPastEvents = async () => {
    const events = await (listen?.queryFilter(
      "gameEnded",
       43354516 ,
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
            <div className="relative flex w-full h-screen content-center items-center justify-center md:h-screen z-10 bg-gradient-to-b from-black  to-slate-300">
              <div>
                {
                  <Image
                    src={backDropImage}
                    alt="heroBanner"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                }
                {/* objectFit='cover' or 'contain' */}
              </div>
              {/*Old code */}
              {/* <div className="m-auto  pt-14 md:pt-0 ml-auto mr-auto md:ml-24 md:mr-10">
              <div>
                {<Image src={heroImage} alt="heroBanner" width={350} />}
              </div>
            </div> */}
              <div className="container relative mx-auto p-16 md:p-0">
                <div className="flex flex-col  items-center justify-center -mt-6 md:mt-0 sm:-ml-0 md:-ml-12">
                  <div className="text-center md:text-left md:ml-16 md:space-y-0 space-x-2 space-y-5">
                    {!loading && !minted && (
                      <>
                        <h1 className="text-3xl md:text-5xl font-bold text-center md:pb-3 text-white ">
                          The Krinza{" "}
                          <span className="line-through text-red-500">10</span>{" "}
                          1 Push-Up Challenge <br></br>
                        </h1>
                        {!eventHappened && (
                          <>
                          <h1 className="text-md md:text-2xl text-center text-white">
                            Choose wisely:
                          </h1>
                          <h1 className="text-md md:text-2xl text-center text-white pb-4">
                          5 Matic
                        </h1>
                        </>
                        )}
                        {eventHappened && (
                          <h1 className="text-md md:text-2xl text-center text-white">
                            Claim your prize:
                          </h1>
                        )}
                      </>
                    )}

                    <div className="flex flex-col max-w-s items-center text-center">
                      {!loading && isConnected && !eventHappened && !minted && (
                        <ChooseSideButton
                          contractConfig={contractConfig}
                          setLoading={setLoading}
                          setMinted={setMinted}
                          setHater={setHater}
                        />
                      )}
                      {isConnected && eventHappened && !minted && (
                        <ClaimPrizeButton
                          contractConfig={contractConfig}
                          setLoading={setLoading}
                        />
                      )}
                      {!isConnected && (
                        <>
                          <ConnectButton />
                        </>
                      )}
                    </div>
                    {minted && (
                      <div className="flex flex-col items-center text-center">
                        {fullHater ? (
                          <>
                            <p className="text-white text-center">
                              What a Hater!!!
                            </p>
                            <Image
                              src={hater}
                              alt="nft"
                              width={300}
                              priority
                              className="mb-5"
                            />
                          </>
                        ) : (
                          <>
                            <p className="text-white text-center">
                              A true believer, a friend of the people
                            </p>
                            <Image
                              src={believer}
                              alt="nft"
                              width={300}
                              priority
                              className="mb-5"
                            />
                          </>
                        )}

                        <button
                          className=" bg-red-700 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                          onClick={() => setMinted(false)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
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
