import React from 'react';
import {useState, useEffect} from 'react';
import Web3 from 'web3';
import newPetrolContract from '../blockchain_page/contract/newPetrolContract.js';
import { get_web3,set_web3,get_Address } from '../login/Set_web3.js';
function Search_page(){
    const [web3, setWeb3] = useState (null);
    const [address, setAddress]= useState(null);
    const [petrolContract, setPeteolContract]= useState(null);
    const [amount, setAmount]=useState(null);
    const [Received_index, set_Received_index]=useState(null);
    const [Sent_index, set_Sent_index]=useState(null);
    const [sentRecords, setSentRecords] = useState([]);
    const [ReceivedRecords, setReceivedRecords] = useState([]);

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
        if(petrolContract) get_ReceivedRecord_index();
        if(petrolContract) get_SentRecord_index();
      },[petrolContract,address])
    
      useEffect(() => {
        if (petrolContract && address) {
          fetchSentRecords();
        }
      }, [petrolContract, address]);
      
      useEffect(() => {
        if (petrolContract && address) {
          fetchReceivedRecords();
        }
      }, [petrolContract, address]);

      const getAmount=async() =>{
        const amount = await petrolContract.methods.balances(address).call();
        setAmount(amount);
        console.log("錢",amount);
        }

      const get_ReceivedRecord_index=async() =>{
        const Received_index = await petrolContract.methods.getReceivedRecordCount(address).call();
        set_Received_index(Received_index);
        console.log("Received_index",Received_index);
      }
    
      const get_SentRecord_index=async() =>{
        const Sent_index = await petrolContract.methods.getSentRecordCount(address).call();
        set_Sent_index(Sent_index);
        console.log("Sent_index",Sent_index);
      }
    
      const fetchSentRecords = async () => {
        const sentRecordCount = await petrolContract.methods.getSentRecordCount(address).call();
        const records = [];
      
        for (let i = 0; i < sentRecordCount; i++) {
          const record = await petrolContract.methods.getSentRecord(address, i).call();
          records.push(record);
        }
      
        setSentRecords(records);
      };
      
      const fetchReceivedRecords = async () => {
        const ReceivedRecordCount = await petrolContract.methods.getReceivedRecordCount(address).call();
        const records = [];
      
        for (let i = 0; i < ReceivedRecordCount; i++) {
          const record = await petrolContract.methods.getReceivedRecord(address, i).call();
          records.push(record);
        }
      
        setReceivedRecords(records);
      };
      return (
        <div className="App">
          <div className='card'>
            <h3>地址(address)：{address}</h3>
            <section>
              <div>
                <p>我的錢包(wallet)：{amount}</p>
              </div>
              
              <div>
                <p>test(Sent)：{Sent_index}</p>
              </div>
              <div>
                <p>test(Received)：{Received_index}</p>
              </div>
              <div>
                <h2>Sent Records:</h2>
                <ul>
                  {sentRecords.map((record, index) => (
                    <li key={index}>
                      Sender: {record.sender}, 
                      Receiver: {record.receiver}, 
                      Amount: {record.amount}, 
                      Timestamp: {record.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Received Records:</h2>
                <ul>
                  {ReceivedRecords.map((record, index) => (
                    <li key={index}>
                      Sender: {record.sender}, 
                      Receiver: {record.receiver}, 
                      Amount: {record.amount}, 
                      Timestamp: {record.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      );
    
}
export default Search_page;