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
import MerkleProof from "./Merkle";

import type {
  UseContractReadConfig,
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";


const Signers = () => {
   const { address, isConnected } = useAccount();
   const [loading, setLoading] = useState<boolean>(false);
   const [proof, setProof] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const ESCROWCONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const contractConfig = {
    address: ESCROWCONTRACT,
    abi: EscrowContract.abi,
  };

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
        let nftTxn = await lockBet?.();
        setLoading(true);
        await nftTxn.wait();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>sgners</div>;
};

export default Signers;
