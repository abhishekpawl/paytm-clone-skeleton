import React, { useEffect, useState } from "react";
import axios from "axios";

function formatToTwoDecimals(num) {
  const str = num.toString();
  const decimalIndex = str.indexOf('.');

  // If there's no decimal point, add '.00'
  if (decimalIndex === -1) return str + '.00';

  const integerPart = str.slice(0, decimalIndex);
  const decimalPart = str.slice(decimalIndex + 1, decimalIndex + 2 + 1); // +1 to include two decimal places

  // If the decimal part is less than 2 digits, pad it with zeros
  return decimalPart.length < 2
    ? `${integerPart}.${decimalPart}0`
    : `${integerPart}.${decimalPart}`;
}

export function Balance() {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setAmount(response.data.amount);
      setLoading(false);
    }

    fetchData()
  }, [])

  if(loading) {
    return <div className="flex">Loading...</div>
  }

  return <div className="flex">
    <div className="font-bold text-lg">
      Your balance
    </div>
    <div className="font-semibold ml-4 text-lg">
      Rs { formatToTwoDecimals(amount) }
    </div>
  </div>
}