import axios from "axios";
import { UserNFT } from "../../pages/Wallet";

export default async function GetNFTs({ pubkey } : { pubkey : string }) {
    const URL = `http://127.0.0.1:8080/nft/get/${pubkey}`;
    if (!pubkey) {
        console.error("No public key provided.");
        return;
    }
    try {
        const response = await axios.get<UserNFT[]>(URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch NFTs:", error);
        console.error("Failed to fetch NFTs. Please try again.");
    }
}