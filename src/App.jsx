import React, { useState } from "react";
import { ethers,  } from "ethers";

function App() {
  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState(""); 

  
 

  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTokens(address).then((data) => {
      setTokens(data.assets);
    }).catch((error) => {
      console.error("Error fetching tokens:", error);
      setTokens([]);
    });
  };

  
  const fetchTokens = async (address) => { 
    
    

    if (!ethers.utils.isAddress(address)) { 
      alert("Please enter a valid Ethereum wallet address");
      return;
    }
    const provider = new ethers.providers.JsonRpcProvider(
      "https://necessary-twilight-model.quiknode.pro/551290050c658a695ca395a3a0be97c745efd21c/"
    );
    const tokens = await provider.send("qn_getWalletTokenBalance", { 
      wallet: address,
      contracts: []   
    });
    return tokens;
  };

  return (
    <div className="h-screen w-screen justify-center space-x-3 ml-5">
      <div className="flex space-x-3 w-screen h-14 ml-2 mt-10">
        <form 
          onSubmit={handleSubmit}
          className="w-6/12 h-15 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800"
        >
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter your Address here" 
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <button
            type="submit"
            className="rounded-lg top-1 right-1 bottom-1 border absolute w-42 text-sm justify-center bg-blue-400 text-white p-3 font-bold"
          >
            Show Me the tokens!
          </button>
        </form>
      </div>
      {tokens.length > 0 && (
        <div className="relative overflow-x-auto justify-center space-x-3 w-6/12 h-140 mt-10 mb-10">
          <h1 className="text-3xl font-bold">Tokens</h1>
          <table className="min-w-full divide-y-4 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 text-left font-bold text-gray-1000">Name</th>
                <th className="whitespace-nowrap px-4 text-left font-bold text-gray-900">Symbol</th>
                <th className="whitespace-nowrap px-4 text-left font-bold text-gray-900">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-4 text-blue-500">{token.name}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-blue-900">{token.symbol}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-900">{ethers.utils.formatUnits(token.amount, token.decimals)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
