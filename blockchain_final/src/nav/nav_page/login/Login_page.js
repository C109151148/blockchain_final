import {auth,provide} from "./firebase";
import { signInWithPopup } from "firebase/auth";
import {useState, useEffect} from 'react';
import {get_web3,set_web3,get_Address} from './Set_web3';
import newPetrolContract from "../blockchain_page/contract/newPetrolContract";

function Login_page(){
    const [web3, setWeb3] = useState (null);
    const [email,setEmail]=useState(null);
    const [address,setAddress]=useState(null);
    const [buyCount, setBuyCount]=useState(null);
    const [petrolContract, setPeteolContract]= useState(null);
    const [email_state,setEmail_state]=useState(true);
    const [state,setState]=useState('none');
    const [state1,setState1]=useState('none');
    const [text_error,setError]=useState(null);
    const administrator="lienfa@nkust.edu.tw";
    useEffect(()=>{
        try{
            check_email();
            web3_addr();
            
        }
        catch (error) {
            console.error('Error:', error);
        }
    })
    function check_email(){
        let email_addr=auth.currentUser.email;
        let email_addr1=auth.currentUser.email;

        email_addr=email_addr.substring(email_addr.indexOf("@",0)+1,email_addr.length);

        if(email_addr1===administrator){
            setState('block');
           }
           else{
            setState('none');
        }
        
        if(email_addr==="nkust.edu.tw"){
         setEmail(auth.currentUser.displayName);
         setEmail_state(false);
        }
        else{
         setEmail("請登入高科EMAIL");
         setEmail_state(true);
        }
    }
    async function login(){
        try{
           await signInWithPopup(auth,provide);
           check_email();
        }catch(error) {
            console.error('Error:', error);
        }
    }
    async function web3_addr(){
        setWeb3(get_web3);
        const addressResult = await get_Address(web3);
        setAddress(addressResult);
        console.log("addr",address);
        console.log(web3);
        if(web3!=null&&petrolContract==null){
            setPeteolContract(newPetrolContract(web3)); 
        }
    }
    const handleClick = async () => {
        try {
          await set_web3();
          web3_addr();
          
        } catch (error) {
          console.error('Error:', error);
        }
    }
    function aa(){
        setState1('block');
      
    }
    //管理者模式
    const newNumber=(event)=>{  
        console.log(event.target.value);
        setBuyCount(event.target.value);
    }

    const buyHandler=async() =>{
        try{
            await petrolContract.methods.mint(address,buyCount).send({
                from:address
            })
            setError(null);
        }catch{}
        }

    return<>
    <div>
        <button onClick={login}>登入高科email</button>
        <h1>{email}</h1>
        <button onClick={handleClick} disabled={email_state}>錢包連接</button>
        <h1>{address}</h1>
        <div style={{display:state}} onClick={aa}><button>管理員模式</button></div>
        <div style={{display:state1}}>
            <div className='buy-div'>
                <input onChange={newNumber} className='input' type='type' placeholder='設定管理員帳號金額'/>
            </div>
            <div className='buy-div'>
                <button className="button" onClick={buyHandler} >Sent</button>
                <p>{text_error}</p>
            </div>
        </div>
    </div>
    </>

}
export default Login_page;