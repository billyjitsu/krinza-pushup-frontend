import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import React,{useState} from "react";
import type {
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
  
} from "wagmi";

interface ChooseSideButtonProps {
  contractConfig: any; // TODO: make this properly typed to an address + ABI
  setLoading: (value: React.SetStateAction<boolean>) => void;
  setMinted: (value: React.SetStateAction<boolean>) => void;
  setHater: (value: React.SetStateAction<boolean>) => void;
}

const ChooseSideButton = ({
  contractConfig,
  setLoading,
  setMinted,
  setHater,
}: ChooseSideButtonProps) => {

  // Hater or Believer ///////////////////
  // hater
  const { config: voteHaterConfig, data: dataHaterVote, isError: hateError } =
    usePrepareContractWrite({
      ...contractConfig,
      functionName: "depositVote",
      args: [false],
      overrides: {
        gasLimit: 1500000,
        value: ethers.utils.parseEther("5"),
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

  // Check TX for both Write functions
  const { isSuccess: txHaterSuccess, error: txHaterError } = useWaitForTransaction({
    confirmations: 1,
    hash: voteHaterData?.hash,
  });

  const voteHaterFunction = async () => {
    try {
      if (typeof voteHater === "function") {
        let nftTxn = await voteHater?.();
        setLoading(true);
        await nftTxn.wait();
        console.log("Vote Hater Data", voteHaterData);
        console.log("Vote Hater Tx Success hash", voteHaterData?.hash);
        console.log("Vote Hater Tx Error", txHaterError);
        console.log("Vote Hater Tx Success", txHaterSuccess);
        console.log("Hater Error", hateError);
        
        setLoading(false);
        setMinted(true);
        setHater(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Error out");
    }
  };

  // Believer
  const { config: voteBelieveConfig, data: dataVote } = usePrepareContractWrite(
    {
      ...contractConfig,
      functionName: "depositVote",
      args: [true],
      overrides: {
        gasLimit: 1500000,
        value: ethers.utils.parseEther("5"),
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

  // Check TX for both Write functions
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash: voteBelieveData?.hash,
  });

  const voteBeleiveFunction = async () => {
    try {
      if (typeof voteBeleive === "function") {
        let nftTxn = await voteBeleive?.();
        setLoading(true);
        await nftTxn.wait();
        console.log("Vote Believer Data", voteBelieveData);
        console.log("Vote Believer Tx Success hash", voteBelieveData?.hash);
        console.log("Vote Believer Tx Error", txError);
        console.log("Vote Believer Tx Success", txSuccess);
        setLoading(false);
        setMinted(true);
        setHater(false);
      }
    } catch (error) {
      console.log(error);
      console.log("Error out");
    }
  };
  ///////////////////////////////////////////////////////

  return (
    <>
      {/* <div className="flex flex-col md:flex-row w-full md:w-full md:space-x-2 items-center "></div> */}
      <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
        <button
          className=" bg-red-700 hover:bg-red-600 rounded-full px-12 py-2 text-white font-bold"
          onClick={voteHaterFunction}
        >
          Hater
        </button>
        <p className="text-white md:pt-1 ">or</p>
        <button
          className="md:w-1/2 bg-red-700 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
          onClick={voteBeleiveFunction}
        >
          Believer
        </button>
      </div>
    </>
  );
};

export { ChooseSideButton };
