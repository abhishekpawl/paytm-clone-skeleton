import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  /* console.log(searchParams.get('id')); */

  return <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-3xl font-bold text-center">Send money</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{ searchParams.get('name')[0] }</span>
            </div>
            <h3 className="text-2xl font-semibold">{ searchParams.get('name') }</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={e => {
                  setAmount(e.target.value)
                }}
                value={amount}
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button onClick={async () => {
              const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: searchParams.get('id'),
                amount
              }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
              setAmount(0)
              navigate("/dashboard", {
                state: {
                  firstname: searchParams.get('name'),
                  amount: res.data.balance
                }
              })
            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
              Initiate transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}