import React from "react";

import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { RecoilRoot } from "recoil";
import { useLocation } from "react-router-dom";

export function Dashboard() {
  const location = useLocation();
  const firstname = location.state.firstname;
  const amount = location.state.amount;

  return <div>
    <Appbar />
    <div className="m-8">
      <Balance value={ amount } />
      <Users />
    </div>
  </div>
}