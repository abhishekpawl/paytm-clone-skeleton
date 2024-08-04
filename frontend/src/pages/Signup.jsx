import React, { useState } from "react";

import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={ "Sign up" } />
        <SubHeading label={ "Enter your details to create an account" } />
        <InputBox onChange={e => {
          setFirstname(e.target.value)
        }} type={ "text" } label={ "First Name" } placeholder={ "John" } />
        <InputBox onChange={e => {
          setLastname(e.target.value)
        }} type={ "text" } label={ "Last Name" } placeholder={ "Doe" } />
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} type={ "text" } label={ "Email" } placeholder={ "john@abc.com" } />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} type={ "password" } label={ "Password" } placeholder={ "123456" } />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstname,
              lastname,
              password
            })
            navigate("/signin")
          }} label={ "Sign up" } />
        </div>
        <BottomWarning label={ "Already have an account?" } buttonText={ "Sign in" } to={ "/signin" } />
      </div>
    </div>
  </div>
}