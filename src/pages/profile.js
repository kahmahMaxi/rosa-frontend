import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { icons } from "../utilities/icn";
import { images } from "../utilities/img";

// components
import BackDrop from "../components/backdrop";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";
import { setgtMessage } from "../redux/gtmsgSlice";
import { gtError, gtSuccess } from "../redux/gtstatusSlice";

// hooks
import { useAppuserout } from "../hooks/general/useAppuserout";
import { useWallet } from "../hooks/general/useWallet";
import { useUpgrade } from "../hooks/patch/useUpgrade";

import { transferRosaTokens } from "../utilities/transferToken";
import { setUser } from "../redux/userSlice";
import { useWallet as useWalletFromAdapter } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { startLoading, stopLoading } from "../redux/loadingSlice";
import { formatSmartDate } from "../utilities/formatDates";


// Put these in a separate file for configs and constants
const SOLANA_RPC = process.env.REACT_APP_RPC_URL;
const connection = new Connection(SOLANA_RPC);
const ROSA_TOKEN_MINT = new PublicKey(
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" // replace
);
const DESTINATION_WALLET = new PublicKey(
  "3g4uL9VzyEsgWRYgP4BXxrnH4qaDDVm3ysLrVudHG7MG" // replace
);

// Function to fetch ROSA price from CoinGecko
async function getRosaPrice() {
  try {
    const priceResponse = await fetch(
      'https://lite-api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' // replace the ca here
    );
  
    const priceData = await priceResponse.json();
  
    // console.log(priceData);
    console.log(priceData.data['JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'].price); // replace

    return priceData.data['JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'].price; // replace
  } catch (error) {
    console.error('Error fetching ROSA price:', error);
    throw error;
  }
}

// Function to fetch token decimals
async function getTokenDecimals(mintAddress) {
  try {
    const mintInfo = await connection.getParsedAccountInfo(mintAddress);
    if (mintInfo.value && mintInfo.value.data) {
      const parsedData = mintInfo.value.data.parsed;
      console.log(parsedData.info.decimals)
      return parsedData.info.decimals;
    } else {
      throw new Error('Failed to get mint info');
    }
  } catch (error) {
    console.error('Error fetching token decimals:', error);
    throw error;
  }
}

// Put these in a separate file for utility functions
const getSolBalance = async (walletAddress) => {
  const lamports = await connection.getBalance(walletAddress);
  return lamports / 10 ** 9;
};

const getTokenBalance = async (
  walletAddress,
  mintAddress,
  adjustForDecimals = false // i had to set this one to false so getTokenbalance will return raw units
) => {
  try {
    const ata = await getAssociatedTokenAddress(
      mintAddress,
      walletAddress,
      false,
      TOKEN_PROGRAM_ID
    );

    // console.log("Associated Token Account:", ata.toBase58());

    try {
      const tokenAccount = await getAccount(connection, ata);

      if (adjustForDecimals) {
        try {
          const mintInfo = await connection.getParsedAccountInfo(mintAddress);

          if (mintInfo.value && mintInfo.value.data) {
            const parsedData = mintInfo.value.data.parsed;
            const decimals = parsedData.info.decimals;
            const adjustedAmount =
              Number(tokenAccount.amount) / Math.pow(10, decimals);
            console.log(
              `Token Balance: ${adjustedAmount} (${tokenAccount.amount} raw)`
            );
            return adjustedAmount;
          }
        } catch (error) {
          console.warn(
            "Could not get mint decimals, returning raw amount:",
            error
          );
          return Number(tokenAccount.amount);
        }
      }
      return Number(tokenAccount.amount);
    } catch (err) {
      if (err.message?.includes("TokenAccountNotFoundError")) {
        console.log("No token account found - user likely has 0 tokens");
      } else {
        console.error("Error fetching token account:", err);
      }
      return 0;
    }
  } catch (error) {
    console.error("Error in getTokenBalance:", error);
    return 0;
  }
};

const Profile = () => {
  const { checkAppUser } = useAppuserout();
  const { walletAddress, connectWallet } = useWallet();
  const { upgradeUser } = useUpgrade();

  const { wallet, connected, publicKey } = useWalletFromAdapter();

  const user = useSelector((state) => state.user.value);
  const modalgeneral = useSelector((state) => state.modalgeneral.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dataSharing, setDatasharing] = useState(null);

  useEffect(() => {
    checkAppUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDataSharing = () => {
    if (!dataSharing) {
      setDatasharing(true);
    } else {
      setDatasharing(false);
    }
  };

  const handleTransferToken = async () => {
    dispatch(startLoading())
    console.log("Transfering Token", connected, publicKey);
    if (!connected || !publicKey) {
      dispatch(gtError());
      dispatch(setgtMessage("Connect your wallet to upgrade"));
      dispatch(stopLoading())
      return;
    }

    const solBalance = await getSolBalance(publicKey); // works fine
    const rosaBalance = await getTokenBalance(publicKey, ROSA_TOKEN_MINT);

    // Calculate dynamic AMOUNT_TO_SEND
    const pricePerRosa = await getRosaPrice();
    if (pricePerRosa <= 0) {
      throw new Error('Invalid ROSA price');
    }
    const decimals = await getTokenDecimals(ROSA_TOKEN_MINT);
    const tokens = 20 / pricePerRosa; // Number of ROSA tokens for 20 USD
    const amountToSend = Math.floor(tokens * Math.pow(10, decimals)); // Raw units
    

    console.log(
      "SOL Balance:",
      solBalance,
      "ROSA Balance:",
      rosaBalance,
      "amount to send:",
      amountToSend,
    );

    if (rosaBalance < amountToSend) {
      dispatch(gtError());
      dispatch(setgtMessage("Insufficient $ROSA tokens to upgrade"));
      dispatch(stopLoading())
      return;
    }

    // Optional: Calculate token amount for logging only
    const tokenAmount = amountToSend / Math.pow(10, decimals);
    console.log("Transfer starting", "Token amount:", tokenAmount, "Raw units:", amountToSend);

    try {
      const tx = await transferRosaTokens(
        SOLANA_RPC,
        wallet.adapter,
        DESTINATION_WALLET.toBase58(),
        amountToSend,
        ROSA_TOKEN_MINT.toBase58()
      );
  
      console.log(
        "Transfer TX:", tx.txid, 
        "confirmation object", tx.confirmation
      );
      if(!tx.confirmation.value.err) {
        dispatch(gtSuccess());
        dispatch(setgtMessage("tokens transferred, upgrading you..."));

        await upgradeUser()

      } else {
        dispatch(gtSuccess());
        dispatch(setgtMessage("tokens failed to send"));
        dispatch(stopLoading())
      }
      
      
    } catch (err) {
      console.log(err);
      dispatch(gtError());
      dispatch(setgtMessage("an error occured"));
      dispatch(stopLoading())
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/auth");
  };

  const setAlltoNull = () => {
    dispatch(setmodalgeneral(null));
  };

  return (
    <div className="profile">
      {modalgeneral ? <BackDrop dropPress={setAlltoNull} /> : null}

      <div
        className={`mgb-24 premium-level-box flex justify-space-between align-center ${
          !user?.upgraded ? "free" : ""
        }`}
      >
        <div
          className={`flex align-center ${
            windowWidth > 500 ? "gap-16" : "gap-7"
          }`}
        >
          <img
            src={
              !user?.upgraded ? icons.connect.smile_ot : icons.profile.crown_3d
            }
            alt=""
          />
          <div className="">
            <h3 className="inter mgb-10">Subscription Level</h3>
            <h2 className={`inter mgb-5 ${!user?.upgraded ? "free" : ""}`}>
              {!user?.upgraded ? "Free" : "Premium"}
            </h2>
            <h4 className="inter">
              Member since <span className="inter">{formatSmartDate(user?.createdAt)}</span>
            </h4>
          </div>
        </div>

          <h5 className="inter cursor-pointer" onClick={handleTransferToken}>
            Upgrade
          </h5>
        {/* {!user?.upgraded ? (
          <h5 className="inter cursor-pointer" onClick={handleTransferToken}>
            Upgrade
          </h5>
        ) : null} */}
      </div>

      <div
        className={`mgb-32 grid ${
          windowWidth > 500 ? "grid-column-2" : "grid-column-1"
        } row gap-24`}
      >
        <div className="profile-frames flex align-center justify-space-between">
          <div className="">
            <h2 className="inter mgb-7">Connected devices</h2>
            <h3 className="inter">0 devices</h3>
          </div>
          <div className=""></div>
        </div>

        <div className="profile-frames flex align-center justify-space-between">
          <h2 className="inter">Share Health Data</h2>
          <div
            className={`toggle-icon cursor-pointer ${
              dataSharing ? "active" : ""
            }`}
            onClick={handleDataSharing}
          >
            <div></div>
          </div>
        </div>
      </div>

      <div className="profile-frame-outer mgb-24">
        <h1 className="inter mgb-24">Account Settings</h1>

        <div className="grid grid-column-1 gap-12">
          <div className="profile-frames flex justify-space-between align-center">
            <div
              className={`flex row align-center ${
                windowWidth > 500 ? "gap-16" : "gap-6"
              }`}
            >
              <div className="icon-right flex justify-center align-center">
                <img src={icons.profile.shield_p} alt="" />
              </div>
              <div className="">
                <h2 className="inter mgb-5">Privacy Controls</h2>
                <h3 className="inter">Manage your data Privacy</h3>
              </div>
            </div>

            <div className="icon-angle">
              <img src={icons.general.angle_right} alt="" />
            </div>
          </div>

          <div className="profile-frames flex justify-space-between align-center">
            <div
              className={`flex row align-center ${
                windowWidth > 500 ? "gap-16" : "gap-6"
              }`}
            >
              <div className="icon-right flex justify-center align-center">
                <img src={icons.profile.bell_p} alt="" />
              </div>
              <div className="">
                <h2 className="inter mgb-5">Notification Preferences</h2>
                <h3 className="inter">
                  Control how and when you receive alerts
                </h3>
              </div>
            </div>

            <div className="icon-angle">
              <img src={icons.general.angle_right} alt="" />
            </div>
          </div>

          <div className="profile-frames flex justify-space-between align-center">
            <div
              className={`flex row align-center ${
                windowWidth > 500 ? "gap-16" : "gap-6"
              }`}
            >
              <div className="icon-right flex justify-center align-center">
                <img src={icons.profile.bars_p} alt="" />
              </div>
              <div className="">
                <h2 className="inter mgb-5">Data Management</h2>
                <h3 className="inter">Export or delete your personal data</h3>
              </div>
            </div>

            <div className="icon-angle">
              <img src={icons.general.angle_right} alt="" />
            </div>
          </div>

          <div className="profile-frames flex justify-space-between align-center">
            <div
              className={`flex row align-center ${
                windowWidth > 500 ? "gap-16" : "gap-6"
              }`}
            >
              <div className="icon-right flex justify-center align-center">
                <img src={icons.profile.link} alt="" />
              </div>
              <div className="">
                <h2 className="inter mgb-5">Integration Settings</h2>
                <h3 className="inter">
                  Connect with other health apps and services
                </h3>
              </div>
            </div>

            <div className="icon-angle">
              <img src={icons.general.angle_right} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="logout-btn flex justify-flex-end cursor-pointer"
        onClick={handleLogout}
      >
        <p className="inter">Logout</p>
      </div>
    </div>
  );
};

export default Profile;
