import { ThirdBox } from "thirdbox";
import { chain, metadata } from "./src/metadata.js";
import { TheBox } from "./src/smartcontract.js";

console.log("The Box Running...");

const thirdbox = new ThirdBox(chain, metadata);

// การอ่านค่ากล่องที่เคยมิ้น #สมมติ
// Account User : bot_10
// Account Password : 12345678
// Account Address: 0x1FE009CD20134dBed9a289DdCA3FF51f2F0f5aF2

async function getAccountMintedBOX() {

    const box_reader = thirdbox.createWeb3Contract(TheBox);
    const walletAddress = "0x1FE009CD20134dBed9a289DdCA3FF51f2F0f5aF2";

    const getAccountBOX = await box_reader.methods.getAccountBOX(walletAddress).call();

    function convertHashToObject(box_object) {
        const id = box_object.id;
        const minter = box_object.minter;
        const hash = box_object.hash;
        const percentage = Number(hash % 10000n) / 100;
        const name = getNameFromPercentage(percentage);
        return { id, minter, percentage, name }
    }

    let result = [];

    getAccountBOX.forEach(element => {
        const converted = convertHashToObject(element);
        result.push(converted);
    });

    console.log("This Wallet Was Mint", result);
}

function getNameFromPercentage(percentage) {
    if (percentage < 39.5) {
        return "Scrap Metals";
    } else if (percentage < 79) {
        return "Gears";
    } else if (percentage < 82) {
        return "Space Jamer";
    } else if (percentage < 85) {
        return "Booster Gear";
    } else if (percentage < 88) {
        return "Shock Absorber";
    } else if (percentage < 92) {
        return "Plasma Core";
    } else if (percentage < 95) {
        return "Red Order";
    } else if (percentage < 98) {
        return "Refine Gear";
    } else if (percentage < 100) {
        return "Relic";
    }
}

await getAccountMintedBOX();
