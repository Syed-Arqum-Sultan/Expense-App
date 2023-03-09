

import { useState, useEffect } from 'react';

import './App.css';

function App() {

  const app_url ="http://localhost:4040/api";
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions]= useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions);
    
  },[]);
  async function getTransactions(){
    const url = app_url+'/transactions';
  const response = await fetch(url);
   const json = await response.json();
   return json;
  }

function addNewTransaction(ev){
  ev.preventDefault()
  const url = app_url+'/transactions';
  const price = name.split(' ')[0];
   fetch(url,{
    method: 'POST',
    body: JSON.stringify(
      { price,
        name : name.substring(price.length+1), 
        description,
        datetime}),
    headers: {'Content-Type': 'application/json'},
   }).then(response => {
    response.json().then(json => { 
      setName("");
      setDateTime("");
      setDescription("");

      console.log('result', json);
    });
   });
}

 let balance = 0;
 for(const transaction of transactions){
  balance = balance + transaction.price
 }
 balance = balance.toFixed(2);
 const fraction = balance.split(".")[1];
 balance = balance.split('.')[0]; 
;
  return (
   <main className='main-content'> 
    <h1 className='main-heading'>{balance}
      <span>.00</span>
        </h1>
        <form className='main-form' onSubmit={addNewTransaction}>
          <div className='basic'>
          <input  className='form-input' 
          type="text"
           placeholder={'+200 new samsung tv'} 
          value={name}
          onChange={ev => setName(ev.target.value)}
          ></input>
          <input className='form-input1'
           type="datetime-local"
           value={datetime} 
           onChange={(ev => setDateTime(ev.target.value))}
           ></input>
          </div>
          <div className='description'>
            <input type="text"
             placeholder={'description'} 
             value={description} 
             onChange={ev => {setDescription(ev.target.value)}}
             ></input>
          </div>
          <button  className="form-btn" type="submit">Add New Transaction</button>
        </form>
        <div className='transactions'>
          {transactions.length> 0  && transactions.map(transaction =>  (
             <div className='transaction' key={transaction.datetime}>
             <div className='left'>
               <div className='name'> {transaction.name}</div>
               <div className='description1'>{transaction.description}</div>
             </div>
             <div className='right'>
               <div className={'price-'+(transaction.price<0 ?'red' : 'green')}>{transaction.price}</div>
               <div className='datetime'>{transaction.datetime}</div>
             </div>
             
         </div>
          ))}
         
        </div>
       
            
        
   </main>
  );
}

export default App;
