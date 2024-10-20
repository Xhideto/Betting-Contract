import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import bettingAbi from "../artifacts/contracts/Assessment.sol/Betting.json"; // Update this path

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [contract, setContract] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(undefined);
  const [betResult, setBetResult] = useState({ resolved: false, won: false });

  const init = async () => {
    if (!window.ethereum) {
      console.log("MetaMask not found");
      return;
    }

    const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(acc[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, bettingAbi.abi, signer);

    if (_contract) {
      setContract(_contract);
      setLoading(false);
      await getBalance();
    }
  };

  useEffect(() => {
    init();
  }, []);

  async function getBalance() {
    if (contract) {
      const _balance = (await contract.getBalance()).toString();
      console.log(_balance);
      setBalance(_balance);
    }
  }

  async function placeBet(amount) {
    if (!contract) {
      console.log("No contract");
      return;
    }
    try {
      const tx = await contract.placeBet({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      alert("Bet placed successfully");
    } catch (error) {
      alert("Error placing bet.");
      console.error("Error placing bet:", error);
    }
    getBalance();
  }

  async function resolveBet(won) {
    if (!contract) return;
    try {
      const tx = await contract.resolveBet(wallet, won);
      await tx.wait();
      alert("Bet resolved successfully");
    } catch (error) {
      alert("Error resolving bet.");
      console.error("Error resolving bet:", error);
    }
  }

  async function checkBetResult() {
    if (!contract) {
      console.log("Contract not available");
      return;
    }

    try {
      const [resolved, won] = await contract.checkBetResult();
      setBetResult({ resolved, won });
      console.log("Bet result:", { resolved, won });
    } catch (error) {
      console.error("Error checking bet result:", error);
    }
  }

  return (
      <div className="container mt-5">
        <h1 className="text-center">Betting Contract</h1>
        {loading ? (
            <p className="text-center">Waiting for MetaMask...</p>
        ) : (
            <div className="text-center">
              <p>Wallet: {wallet}</p>
              <p>Balance: {balance} wei</p>
              <button className="btn btn-primary m-2" onClick={() => placeBet("1")}>Place Bet of 1 ETH</button>
              <button className="btn btn-success m-2" onClick={() => resolveBet(true)}>Resolve Bet (Win)</button>
              <button className="btn btn-danger m-2" onClick={() => resolveBet(false)}>Resolve Bet (Lose)</button>
              <button className="btn btn-info m-2" onClick={checkBetResult}>Check Bet Result</button>
              {betResult.resolved && (
                  <p>{betResult.won ? "You won the bet!" : "You lost the bet."}</p>
              )}
            </div>
        )}
      </div>
  );
}

export default App;
