import { useSelector, useDispatch } from "react-redux";
import tokenABI from "../abi/tokenABI";
import { setFromAddress, setKlayKEthAmount } from "../store/token";
import "./Nav.css";

const KETH_CA = "0x34d21b1e550d73cee41151c77f3c73359527a396";

function Nav(props) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const connectWallet = async () => {
    const [fromAddress] = await window.klaytn.enable();
    dispatch(setFromAddress(fromAddress));
    const klayBalance = await window.caver.klay.getBalance(fromAddress);
    const kEthContract = new window.caver.klay.Contract(tokenABI, KETH_CA);
    const kEthBalance = await kEthContract.methods
      .balanceOf(fromAddress)
      .call();
    dispatch(setKlayKEthAmount(klayBalance / 1e18, kEthBalance / 1e18));
  };
  return (
    <nav>
      <section className="home">
        <article>
          <img src="https://klayswap.com/img/logo/logo.svg" alt="main logo" />
        </article>
        <article>KLAYswap</article>
      </section>
      <section className="nav-items">
        <NavItem text="내자산" />
        <NavItem text="스왑" />
        <NavItem text="예치" />
        <NavItem text="KSP거버넌스" isDropdown={true} />
        <NavItem text="Drops" />
        <NavItem text="대시보드" />
      </section>
      <section className="nav-btn">
        <article>
          {token.fromAddress ? (
            <div>{token.fromAddress.substring(0, 16)}...</div>
          ) : (
            <button onClick={connectWallet}>지갑 연결</button>
          )}
        </article>
      </section>
    </nav>
  );
}

const NavItem = (props) => {
  return (
    <article className="nav-item">
      <span>{props.text}</span>
      {props.isDropdown ? (
        <img
          src="https://klayswap.com/img/icon/ic-triangle-bottom-gray.svg"
          alt="tab"
        />
      ) : (
        <></>
      )}
    </article>
  );
};

export default Nav;
