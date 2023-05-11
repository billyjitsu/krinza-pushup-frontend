import { MerkleTree } from "merkletreejs";
import { keccak256 as SHA256 } from "js-sha3";

const leaves = [
  "0xe2b8651bF50913057fF47FC4f02A8e12146083B8",
  "0x940ACd9375b46EC2FA7C0E8aAd9D7241fb01e205",
  "0xCBD6832Ebc203e49E2B771897067fce3c58575ac",
].map((v) => SHA256(v));
const tree = new MerkleTree(leaves, SHA256, { sort: false });
const root = tree.getHexRoot();
console.log ("Root>>>>>>>>", root)

interface MerkleProofProps {
    walletAddress: string;
  }

const leaf = SHA256("0xe2b8651bF50913057fF47FC4f02A8e12146083B8"); //put variable
const proof = tree.getHexProof(leaf);
// console.log(tree.toString());
console.log("Root", tree.getHexRoot());
console.log("Proof for [0]", proof);

// const MerkleProof = ({ walletAddress }: MerkleProofProps) => {
//     const leaf = SHA256(walletAddress);
//     const proof = tree.getHexProof(leaf);
//     const index = leaves.findIndex((v) => v === leaf);
// }

const useMerkleProof = ({ walletAddress }: MerkleProofProps) => {
    console.log("Wallet Address", walletAddress)
    const leaf = SHA256(walletAddress);
    const proof = tree.getHexProof(leaf);
    const index = leaves.findIndex((v) => v === leaf);
    return { leaf, proof, index };
}

export default useMerkleProof;