"use client";

import { useAxiomCircuit } from '@axiom-crypto/react';
import { CircuitInputs } from "../../lib/circuit";
import { AxiomV2Callback } from "@axiom-crypto/experimental";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import ClaimAirdropClient from "./ClaimAirdropClient";

export default function BuildQuery({
  inputs,
  callback,
  airdropAbi,
}: {
  inputs: CircuitInputs,
  callback: AxiomV2Callback,
  airdropAbi: any[],
}) {
  const { builtQuery, payment, setParams } = useAxiomCircuit();

  useEffect(() => {
    setParams(inputs, callback);
  }, [setParams, inputs, callback]);

  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  return <ClaimAirdropClient airdropAbi={airdropAbi} />;
}
