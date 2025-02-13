import { Web3Provider } from "@/components/Web3Provider";
import { useWeb3 } from "@/hooks/useWeb3";
import SEO from "@/seo.config";
import { switchChain } from "@/util/web3Util";
import { DefaultSeo } from "next-seo";
import NextLink from "next/link";
import React, { useState } from "react";
import { BsGear, BsGithub, BsMoon, BsSun, BsTwitter } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <DefaultSeo {...SEO} />
      <div
        className="min-h-full flex flex-col relative bg-base-100 transition-all"
        data-theme={isDark ? "dark" : "light"}
      >
        <Web3Provider>
          <Header {...{ isDark, setIsDark }} />
          <div className="mt-16 text-base-content">{children}</div>
          <Footer />
        </Web3Provider>
      </div>
    </>
  );
}

export const Header: React.FC<{
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}> = (props) => {
  return (
    <nav className="navbar fixed flex justify-between backdrop-blur-sm">
      <NextLink href="/">
        <a className="btn btn-ghost text-base-content normal-case text-2xl">
          <span className="hidden sm:block">Non-Fungible Meishi</span>
          <span className="sm:hidden ">NFMeishi</span>
        </a>
      </NextLink>
      <div className="flex-none gap-2">
        <AccoutWithAth />
        <div className="w-0.5 h-8 bg-base-content"></div>
        <div className="flex-none">
          <ChainState />
          <ToggleTheme {...props} />
        </div>
      </div>
    </nav>
  );
};
export const AccoutWithAth = () => {
  const { connectWallet, account, isLoading } = useWeb3();
  if (isLoading) {
    return <button className="btn btn-ghost  loading">Loading</button>;
  } else if (account) {
    return (
      <div className="font-bold text-lg">
        {account.ethName || account.abbreviatedId}
      </div>
    );
  } else {
    return (
      <button className="btn btn-ghost" onClick={() => void connectWallet()}>
        Connect Wallet
      </button>
    );
  }
};

export const ChainState: React.FC = () => {
  const { isTargetChain, isMetaMask, provider } = useWeb3();
  const handleClick = () => {
    if (isMetaMask && provider) {
      void switchChain(provider);
    }
  };
  return isTargetChain ? (
    <></>
  ) : (
    <button className="btn btn-square btn-ghost" onClick={handleClick}>
      <VscDebugDisconnect size="2rem" color="#f21361" />
    </button>
  );
};

export const ToggleTheme: React.FC<{
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}> = ({ isDark, setIsDark }) => {
  const toggle = () => setIsDark(!isDark);
  return (
    <button className="btn btn-square btn-ghost" onClick={toggle}>
      {isDark ? <BsMoon size="2rem" /> : <BsSun size="2rem" />}
    </button>
  );
};

export const Footer: React.FC = () => (
  <footer className="footer items-center p-4 bg-neutral text-neutral-content mt-auto">
    <div className="items-center grid-flow-col">
      <BsGear size="36" />
      <p> NF Business Card © 2022 - All right reserved</p>
    </div>
    <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="https://twitter.com/unknown_gakusei">
        <BsTwitter size="1.5rem" />
      </a>
      <a href="https://github.com/inaridiy/BusinessCardNFT">
        <BsGithub size="1.5rem" />
      </a>
      <a href="https://app.cyberconnect.me/address/inaridiy.eth">
        <LogoCyberConnect size="1.5rem" />
      </a>
    </div>
  </footer>
);

export const LogoCyberConnect: React.FC<{ size?: string }> = ({
  size = "1rem",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 24"
    className="fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8194 14.1385L29.6618 23.2918C29.768 23.4001 29.8525 23.529 29.9105 23.6712C29.9685 23.8133 29.9989 23.9659 30 24.1202C30.001 24.2745 29.9727 24.4275 29.9165 24.5705C29.8604 24.7135 29.7777 24.8436 29.673 24.9535L29.0242 25.6228C28.8418 25.8206 28.601 25.9497 28.3397 25.9897C28.1672 26.0136 27.9917 25.9958 27.8269 25.9377C27.6621 25.8797 27.5126 25.7829 27.3899 25.6551L16.5922 14.4778C16.4045 14.2838 16.2556 14.0534 16.1539 13.7997C16.0523 13.5461 16 13.2742 16 12.9996C16 12.725 16.0523 12.4531 16.1539 12.1994C16.2556 11.9458 16.4045 11.7153 16.5922 11.5213L27.3899 0.344062C27.4951 0.234991 27.62 0.148459 27.7576 0.0894208C27.8951 0.0303825 28.0425 0 28.1914 0C28.3403 0 28.4877 0.0303825 28.6253 0.0894208C28.7628 0.148459 28.8878 0.234991 28.993 0.344062L29.6618 1.04798C29.7672 1.15687 29.8508 1.2862 29.9078 1.42856C29.9648 1.57093 29.9942 1.72354 29.9942 1.87767C29.9942 2.03179 29.9648 2.1844 29.9078 2.32677C29.8508 2.46914 29.7672 2.59848 29.6618 2.70738L20.8194 11.8629C20.5294 12.1655 20.3667 12.5745 20.3667 13.0007C20.3667 13.427 20.5294 13.8359 20.8194 14.1385ZM9.18017 11.8726L0.341223 2.71698C0.233969 2.60853 0.148579 2.47911 0.0900066 2.33622C0.0314344 2.19333 0.000846637 2.03982 1.73272e-05 1.88459C-0.000811983 1.72936 0.0281358 1.5755 0.0851776 1.43194C0.142219 1.28839 0.226225 1.158 0.332313 1.04833L0.978629 0.376712C1.16268 0.180155 1.40373 0.0512975 1.66506 0.00975571C1.83749 -0.0133774 2.01275 0.00476068 2.17734 0.0627778C2.34194 0.120795 2.49149 0.217133 2.61448 0.344398L13.408 11.5218C13.5957 11.7158 13.7445 11.9463 13.8461 12.1999C13.9477 12.4536 14 12.7255 14 13.0001C14 13.2747 13.9477 13.5466 13.8461 13.8002C13.7445 14.0539 13.5957 14.2843 13.408 14.4783L2.61448 25.6557C2.50913 25.7649 2.38405 25.8515 2.24639 25.9105C2.10872 25.9696 1.96117 26 1.81215 26C1.66314 26 1.51558 25.9696 1.37792 25.9105C1.24025 25.8515 1.11517 25.7649 1.00983 25.6557L0.341223 24.9634C0.235829 24.8543 0.152224 24.7247 0.0951824 24.5822C0.038141 24.4396 0.00878432 24.2868 0.00878432 24.1325C0.00878432 23.9782 0.038141 23.8254 0.0951824 23.6828C0.152224 23.5402 0.235829 23.4107 0.341223 23.3016L9.18017 14.1483C9.47006 13.8457 9.63272 13.4367 9.63272 13.0104C9.63272 12.5842 9.47006 12.1752 9.18017 11.8726Z"
    />
  </svg>
);
