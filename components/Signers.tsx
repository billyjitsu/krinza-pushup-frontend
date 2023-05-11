import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./Loading";
import EscrowContract from "../contract/escrow.json";
import useMerkleProof from "./Merkle";

import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";

const Signers = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
//   const [proof, setProof] = React.useState("");
//   const [index, setIndex] = React.useState(0);

  const ESCROWCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const contractConfig = {
    address: ESCROWCONTRACT,
    abi: EscrowContract.abi,
  };

  const { leaf, proof, index } =  useMerkleProof({ walletAddress: address });

  // lock bets
  const { config: lockBetConfig, data: dataLockBet } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "lockBets",
    args: [proof, index],
    overrides: {
      gasLimit: 1500000,
    },
    onError(error: any) {
      console.log("Error", error);
    },
  } as unknown as UsePrepareContractWriteConfig);

  const {
    data: lockBetData,
    writeAsync: lockBet,
    isLoading: islockBetLoading,
    isSuccess: islockBetSuccess,
  } = useContractWrite(lockBetConfig as UseContractWriteConfig);

  const lockBetFunction = async () => {
    try {
      if (typeof lockBet === "function") {
        console.log( "Proof", proof);
        console.log( "Index", index);
        console.log( "Leaf", leaf)


        let nftTxn = await lockBet?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black h-screen w-full ">
      <>
        {!loading && (
          <div className="flex flex-col md:flex-row px-5 justify-center lg:mr-16 h-screen w-full">
            <div className="m-auto  pt-14 md:pt-0 ml-auto mr-auto md:ml-24 md:mr-10">
              {/* <div>
                {<Image src={heroImage} alt="heroBanner" width={350} />}
              </div> */}
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
                            onClick={lockBetFunction}
                          >
                            Lock
                          </button>
                          <p className="text-white md:pt-1 ">or</p>
                          <button
                            className="md:w-1/2 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                           // onClick={voteBeleiveFunction}
                          >
                            End Game
                          </button>
                        </div>
                      </>
                    )
                  }
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

export default dynamic(() => Promise.resolve(Signers), { ssr: false });;
