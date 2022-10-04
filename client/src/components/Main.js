import React from "react";
import "./Main.css";
import { useSelector, useDispatch } from "react-redux";
import factoryABI from "../abi/factoryABI";
import exchangeABI from "../abi/exchangeABI";
import { setEstimatedKethAmount, setExchangeKlayAmount } from "../store/token";

const FACTORY_CA = "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654";
const KETH_CA = "0x34d21b1e550d73cee41151c77f3c73359527a396";
function Main(props) {
  return (
    <main>
      <Title />
      <Ticket />
    </main>
  );
}

function Title(props) {
  return (
    <section>
      <span className="main-text">
        원하는 자산으로 바로 <span className="text-strong">교환(스왑)</span>
        하세요
      </span>
    </section>
  );
}

function Ticket(props) {
  const token = useSelector((state) => state.token);
  const swap = () => {
    const contract = new window.caver.klay.Contract(factoryABI, FACTORY_CA);
    const value = token.exchangeKlayAmount * 1e18;
    console.log(token.klay, token.exchangeKlayAmount);
    contract.methods
      .exchangeKlayPos(KETH_CA, token.exchangeKlayAmount, [])
      .send({
        from: token.fromAddress,
        gas: 1e7,
        value: value.toString(),
      })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  return (
    <section className="ticket">
      <section>
        <KlayCardItem />
        <article className="change-icon">
          <img src="https://klayswap.com/img/icon/ic-target-swap.svg" alt="" />
        </article>
        <KEthCardItem />
      </section>
      <section onClick={swap}>
        <span>Swap</span>
      </section>
    </section>
  );
}

const KETH_KLAY_LP_AC = "0x27f80731dddb90c51cd934e9bd54bff2d4e99e8a";
const KlayCardItem = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const exchangeRatio = async (e) => {
    const contract = new window.caver.klay.Contract(
      exchangeABI,
      KETH_KLAY_LP_AC
    );
    const pool = await contract.methods.getCurrentPool().call();
    const ratio = pool[1] / pool[0];
    const exchangeKlayAmount = e.target.value;
    dispatch(setExchangeKlayAmount(exchangeKlayAmount));
    dispatch(setEstimatedKethAmount(exchangeKlayAmount * ratio));
  };
  // exchangeRatio();
  return (
    <article className="card-item">
      <label>From</label>
      <article className="exchange">
        <input type="number" placeholder="0" onChange={exchangeRatio} />
        <img src="https://klayswap.com/img/icon/ic-drp-open-gray.svg" alt="" />
        <div className="token-img">
          <img
            src="https://s.klayswap.com/data/img/token/0x0000000000000000000000000000000000000000/icon.svg?v=1647939876203"
            alt=""
          />
        </div>
      </article>
      <article className="final-part">
        <span className="sub-text">
          <span>보유</span>
          <span>{token.klay}</span>
        </span>
        <span className="sub-text2">KLAY</span>
      </article>
    </article>
  );
};

const KEthCardItem = () => {
  const token = useSelector((state) => state.token);

  return (
    <article className="card-item">
      <label>To</label>
      <article className="exchange">
        <input type="number" placeholder="0" value={token.estimatedKEth} />
        <img src="https://klayswap.com/img/icon/ic-drp-open-gray.svg" alt="" />
        <div className="token-img">
          <img
            src="https://s.klayswap.com/data/img/token/0x34d21b1e550d73cee41151c77f3c73359527a396.svg"
            alt=""
          />
        </div>
      </article>
      <article className="final-part">
        <span className="sub-text">
          <span>보유</span>
          <span>{token.kEth}</span>
        </span>
        <span className="sub-text2">KETH</span>
      </article>
    </article>
  );
};

export default Main;
