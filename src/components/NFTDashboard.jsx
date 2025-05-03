import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x28D744dAb5804eF913dF1BF361E06Ef87eE7FA47";
const ALCHEMY_BASE_URL = "https://base-mainnet.g.alchemy.com/v2/-h4g9_mFsBgnf1Wqb3aC7Qj06rOkzW-m";

export default function NFTDashboard() {
  const [wallet, setWallet] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  };

  const loadNFTs = async () => {
    setLoading(true);
    try {
      const fetchURL = `${ALCHEMY_BASE_URL}/getNFTsForOwner?owner=${wallet}&contractAddresses[]=${CONTRACT_ADDRESS}&withMetadata=true`;
      const res = await fetch(fetchURL);
      const data = await res.json();

      const nftList = data.ownedNfts.map((nft) => {
        const metadata = nft.metadata;
        const image = metadata.image?.startsWith("ipfs://")
          ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
          : metadata.image;
        return {
          tokenId: parseInt(nft.tokenId, 16).toString(),
          name: metadata.name,
          description: metadata.description,
          image,
        };
      });

      setNfts(nftList);
    } catch (err) {
      console.error("Alchemy fetch failed", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (wallet) loadNFTs();
  }, [wallet]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ReVerse Genesis NFT Dashboard</h1>
      {!wallet ? (
        <button onClick={connectWallet} className="bg-black text-white py-2 px-4 rounded">Connect Wallet</button>
      ) : (
        <div>
          <p className="mb-4">Connected: {wallet}</p>
          {loading ? (
            <p>Loading NFTs...</p>
          ) : nfts.length === 0 ? (
            <p>No NFTs found in this wallet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nfts.map((nft) => (
                <div key={nft.tokenId} className="border rounded p-4 shadow">
                  <img
                    src={nft.image}
                    alt={`NFT ${nft.tokenId}`}
                    className="mb-2 w-full"
                  />
                  <h2 className="text-lg font-semibold">#{nft.tokenId} — {nft.name}</h2>
                  <p className="text-sm text-gray-600">{nft.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
