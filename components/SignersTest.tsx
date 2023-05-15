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
//import useMerkleProof from "./Merkle";
import { MerkleTree } from "merkletreejs";
import SHA256 from "keccak256";

import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";

const Signers = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [proof, setProof] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState(0);
  const [onList, setOnList] = React.useState(true);
  const [vote, setVote] = React.useState(true);

  const ESCROWCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const contractConfig = {
    address: ESCROWCONTRACT,
    abi: EscrowContract.abi,
  };

  const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const value = event.target.value === 'true'; // Convert string to boolean
    setVote(value);
    console.log("Vote Value", value);
  };


  // // lock bets
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
        await MerkleProof();

        let nftTxn = await lockBet?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // End Game
  const { config: endGameConfig, data: dataEndGame } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "endGame",
    args: [proof, index],
    overrides: {
      gasLimit: 1500000,
    },
    onError(error: any) {
      console.log("Error", error);
    },
  } as unknown as UsePrepareContractWriteConfig);

  const {
    data: endGameData,
    writeAsync: endGame,
    isLoading: isEndGameLoading,
    isSuccess: isEndGameSuccess,
  } = useContractWrite(endGameConfig as UseContractWriteConfig);

  const endGameFunction = async () => {
    try {
      if (typeof endGame === "function") {
        await MerkleProof();

        let nftTxn = await endGame?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // Vote Outcome
  const { config: voteOutcomeConfig, data: dataVoteOutcome } =
    usePrepareContractWrite({
      ...contractConfig,
      functionName: "voteOutcome",
      args: [proof, index, vote], // true = win, false = lose   make this dynamic
      overrides: {
        gasLimit: 1500000,
      },
      onError(error: any) {
        console.log("Error", error);
      },
    } as unknown as UsePrepareContractWriteConfig);

  const {
    data: voteData,
    writeAsync: voteOutcome,
    isLoading: isVoteLoading,
    isSuccess: isVoteSuccess,
  } = useContractWrite(voteOutcomeConfig as UseContractWriteConfig);

  const voteOutcomeFunction = async () => {
    try {
      if (typeof voteOutcome === "function") {
        await MerkleProof();

        let nftTxn = await voteOutcome?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const leaves = [
  //   "0xe2b8651bF50913057fF47FC4f02A8e12146083B8",
  //   "0x940ACd9375b46EC2FA7C0E8aAd9D7241fb01e205",
  //   "0xCBD6832Ebc203e49E2B771897067fce3c58575ac",
  // ].map((v) => SHA256(v));

  const leaves = [
    "0xe2b8651bF50913057fF47FC4f02A8e12146083B8",
    "0x940ACd9375b46EC2FA7C0E8aAd9D7241fb01e205",
    "0xCBD6832Ebc203e49E2B771897067fce3c58575ac",
  ];
  const hashedLeaves = leaves.map((leaf) => SHA256(leaf));
  //const tree = new MerkleTree(leaves, SHA256, { sort: false });
  const tree = new MerkleTree(hashedLeaves, SHA256, { sort: false });
  const root = tree.getHexRoot();
  //console.log ("Root>>>>>>>>", root)

  const MerkleProof = () => {
    if (!address) {
      // Handle the case when the wallet address is not available
      // Set default values or handle the error accordingly
      return { proofs: [], indexPosition: 0 }; // Example: Setting default values
    }
    console.log("Wallet Address", address);
    // console.log("Hashed wallet:", SHA256(address as string));
    // console.log("Leaves index address:", leaves[0]);
    const leaf = SHA256(address as string);
    const proofs = tree.getHexProof(leaf);
    // setProof(proofs);
    console.log("Proof", proof);
    //const indexPosition = leaves.findIndex((v) => v === leaf);
    const indexPosition = leaves.findIndex(
      (addressToFind) => addressToFind === address
    );
    console.log("Index Position", indexPosition);

    if (indexPosition === -1) {
      try {
        //throw new Error("Leaf not found in the Merkle tree");
        setOnList(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setOnList(true);
    }
    // setIndex(indexPosition);
    //setIndex(indexPosition);
    console.log("Index", index);
    return { proofs, indexPosition };
  };

  useEffect(() => {
    try {
      const { proofs, indexPosition } = MerkleProof();
      setProof(proofs);
      setIndex(indexPosition);
      console.log("Proof in useEffect", proof);
    } catch (error) {
      console.log(error);
    }
  }, [address]);

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
                {onList ? (
                  <div>
                    {/* Your existing content when the wallet is on the list */}
                  </div>
                ) : (
                  <div className="text-3xl md:text-5xl font-bold text-white ">
                    Wallet is not on the list.
                  </div>
                )}
                {!loading && onList && (
                  <>
                    <h1 className="text-3xl md:text-5xl font-bold text-white ">
                      The VC{" "}
                      <span className=" text-red-500">5 </span>
                       Council <br></br>
                    </h1>
                    <h1 className="text-md md:text-xl text-white">
                      You have the power:
                    </h1>
                  </>
                )}

                <div className="flex flex-col max-w-s items-center text-center md:items-start ">
                  {onList && !loading && isConnected && (
                    <>
                      <div className="flex flex-col md:flex-row w-full md:w-full md:space-x-2 items-center "></div>
                      <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
                        <button
                          className=" bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2 text-white font-bold"
                          onClick={lockBetFunction}
                        >
                          Lock
                        </button>
                        {/* <p className="text-white md:pt-1 ">or</p> */}
                        <select onChange={handleOptionChange}>
                          <option value="">Did Krinza do it</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                        <button
                          className="md:w-1/2 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                          onClick={voteOutcomeFunction}
                        >
                          Vote
                        </button>
                        <button
                          className="md:w-1/2 bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
                          onClick={endGameFunction}
                        >
                          End Game
                        </button>
                      </div>
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

export default dynamic(() => Promise.resolve(Signers), { ssr: false });
