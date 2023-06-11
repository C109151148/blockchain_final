import ABI from '../abi.json'

const petrol_addr="0xaCDCe2bD0d9f8923d0Bf936Ce87E495167b3D83e";
const newPetrolContract=web3=>{
    return new web3.eth.Contract(ABI,petrol_addr);
}
export default newPetrolContract;