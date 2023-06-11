import React from 'react';
import {useState, useEffect} from 'react';
import newPetrolContract from './contract/newPetrolContract';
import { get_web3,set_web3,get_Address } from '../login/Set_web3.js';
function Trade_page (){
  const [web3, setWeb3] = useState (null);
  const [address, setAddress]= useState(null);
  const [petrolContract, setPeteolContract]= useState(null);
  const [amount, setAmount]=useState(null);
  const [shop_account, setShop_account]=useState(null);
  const [buyCount, setBuyCount]=useState(null);
  const [text_error,setError]=useState(null);
  async function initialization(){
    //抓取我的帳號地址s
    const accounts= await web3.eth.getAccounts();
    console.log(accounts[0]);
    setAddress(accounts[0]);
    //抓取我的智能合約
    if(petrolContract==null){
      setPeteolContract(newPetrolContract(web3)); 
    }
  }

  useEffect(()=>{
    if(web3===null){
      setWeb3(get_web3);
      console.log("web3int",web3);
    }
    console.log("web3out",web3);
    if(web3!=null){
      initialization();
    }
    })

  useEffect(()=>{

    if(petrolContract) getAmount();
    },[petrolContract,address])

    const get_shop_account=async(event)=>{ 
    await setShop_account(event.target.value);
    console.log("廠商",shop_account);
    }

    const getAmount=async() =>{
    const amount = await petrolContract.methods.balances(address).call();
    setAmount(amount);
    console.log("錢",amount);
    }
    const newNumber=(event)=>{  
    console.log(event.target.value);
    setBuyCount(event.target.value);
    console.log(shop_account);
    
  }

  const buyHandler=async() =>{
    try{
      console.log("要給的廠商",shop_account);
      await petrolContract.methods.send(shop_account,buyCount).send({
        from:address
      })
      setError(null);
    }catch{setError("請輸入正確地址");}
    
  }
  return <>
    <div className="App">
      <div className='card'>
        <h3>我的地址(address)：{address}</h3>
        <section>
          <div>
            <p>我的錢包(wallet)：{amount}</p>
          </div>
        </section>
        <div className='buy-div'>
          <input onChange={get_shop_account} className='input' type='type' placeholder='請輸入廠商的account'/>
        </div>
        <section>
          <div className='buy-div'>
            <input onChange={newNumber} className='input' type='type' placeholder='請輸入商品價錢'/>
          </div>
          <div className='buy-div'>
            <button className="button" onClick={buyHandler} >Sent</button>
            <p>{text_error}</p>
          </div>
        </section>
      </div>
    </div>
    </>
        
 
}
export default Trade_page;