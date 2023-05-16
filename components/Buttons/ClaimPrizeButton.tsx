import {
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import React from "react";
import type {
  UsePrepareContractWriteConfig,
  UseContractWriteConfig,
} from "wagmi";

interface ClaimPrizeButtonProps {
  contractConfig: any;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

const ClaimPrizeButton = ({
  contractConfig,
  setLoading,
}: ClaimPrizeButtonProps) => {
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
  return (
    <>
      <button
        className="md:w-1/5 bg-red-700 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
        onClick={collectPayFunction}
      >
        Claim
      </button>
    </>
  );
};

export {ClaimPrizeButton}