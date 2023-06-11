import Web3 from 'web3';
import {useState, useEffect} from 'react';

let web3;

export  function get_web3(){
    return web3;
}

export async function set_web3(){
    await window.ethereum.request({method:'eth_requestAccounts'});
    web3 = new Web3(window.ethereum);
    return;
}
export async function get_Address(Addr_web3){
    try{
        const accounts= await Addr_web3.eth.getAccounts();
        return accounts[0];
    }catch{}
    
}
