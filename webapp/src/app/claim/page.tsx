import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
// import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import highFiveJson from '@/lib/abi/HighFive.json';
import { CircuitInputs } from "@/lib/circuit";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/experimental";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Claim({ searchParams }: PageProps) {
  // sender
  const connected = searchParams?.connected as string ?? "";
  const recipient = searchParams?.recipient as string ?? "";
  const txBlockNumber0 = searchParams?.txBlockNumber0 as string ?? "";
  const txIdx0 = searchParams?.txIdx0 as string ?? "";
  const txBlockNumber1 = searchParams?.txBlockNumber1 as string ?? "";
  const txIdx1 = searchParams?.txIdx1 as string ?? "";
  const logIdx = searchParams?.logIdx as string ?? "";

  console.log("searchparams",searchParams)

  // const tx = await publicClient.getTransaction({
  //   hash: txHash as `0x${string}`,
  // });
  // const txIdx = tx.transactionIndex.toString();

  const inputs: CircuitInputs = {
    sender: String(connected),
    recipient: String(recipient),
    txBlockNumber0: Number(txBlockNumber0),
    txIdx0: Number(txIdx0),
    txBlockNumber1:Number(txBlockNumber1),
    txIdx1: Number(txIdx1),
    logIdx: Number(logIdx)
  }
  const callback: AxiomV2Callback = {
    target: Constants.HIGH_FIVE_ADDR as `0x${string}`,
    extraData: bytes32(connected),
  }

  return (
    <>
      <Title>
        Send HighFive
      </Title>
      <div className="text-center">
        Click below to highfive
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callback={callback}
          highFiveAbi={highFiveJson.abi}
        />
      </div>
    </>
  )
}
