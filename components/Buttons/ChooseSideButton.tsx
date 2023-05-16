import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import React,{useState} from "react";
import type {
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";

interface ChooseSideButtonProps {
  contractConfig: any; // TODO: make this properly typed to an address + ABI
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

const ChooseSideButton = ({
  contractConfig,
  setLoading,
}: ChooseSideButtonProps) => {

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

  // Believer
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
