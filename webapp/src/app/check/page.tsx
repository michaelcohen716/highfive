import LinkButton from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";
import { findFirstUniswapTx } from "@/lib/parseRecentTx";

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

export default async function Check({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log('connected', connected)

  // Find the user's uniswap transaction with the `Swap` event
  // const uniswapTx = await findFirstUniswapTx(connected);
  const params = {
    sender: "0xE300843e7Ee3Bbf74b051138564dA6AD81044F1a",
    recipient: "0x231Ae5AdCcC2dbfF1B457CAf2A3A74Ac7DDC960E",
    txBlockNumber0: 9946925,
    txIdx0: 3,
    txBlockNumber1: 9946927,
    txIdx1: 1,
    logIdx:0
  }

  const renderNotEligible = () => {
    return (
      <>
        <div className="text-center">
          {"Sorry, we couldn't find a Swap event (swapping a token for a token that is not ETH) for this address after Goerli block 9000000."}
        </div>
        <LinkButton
          label="Go back"
          href="/"
        />
      </>
    )
  }

  const renderEligible = () => {
    // const log = uniswapTx?.log;
    // const txHash = log?.tx_hash;
    // const blockNumber = log?.block_height;
    // const logIdx = uniswapTx?.logIdx;
    const sender = params?.sender
    const recipient = params?.recipient
    const txBlockNumber0 = params?.txBlockNumber0
    const txIdx0 = params?.txIdx0
    const txBlockNumber1 = params?.txBlockNumber1
    const txIdx1 = params?.txIdx1
    const logIdx = params?.logIdx

    if (!recipient || !txBlockNumber0 || !txBlockNumber1) { // TODO
      return renderNotEligible();
    }

    return (
      <>
        <div className="text-center">
          {"Congratulations! You can high five."}
        </div>
        <LinkButton
          label="Build Axiom proof params"
          href={"/claim?" + new URLSearchParams({
            connected,
            sender,
            recipient,
            txBlockNumber0: txBlockNumber0.toString(),
            txIdx0:txIdx0.toString(),
            txBlockNumber1: txBlockNumber1.toString(),
            txIdx1: txIdx1.toString(),
            logIdx: logIdx.toString()
          })}
        />
      </>
    )
  }

  return (
    <>
      <Title>
        Check eligibility
      </Title>
      {/* {uniswapTx !== null ? renderEligible() : renderNotEligible()} */}
      {renderEligible()}
    </>
  )
}
