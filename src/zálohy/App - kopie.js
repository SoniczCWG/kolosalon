import { useRef,useState,useReducer,useEffect   }from 'react';
import logo from './logo.svg';
import './App.css';
import {objs} from "./objekty.js"
// import SelectGEN0 from './components/Home';


 const defaultObjednavka={'select_0': '', 'input_checkbox_0': false, 'input_number_1': 0, 'input_checkbox_2': false, 'input_number_3': 0, 'input_checkbox_4': false, 'input_number_5': 0, 'input_checkbox_6': false, 'input_number_7': 0, 'radioGroup_0': 0, 'zadanasuma': 0, 'suma_dostacujici': "*",}
// h 100 | d 50 | s 500  ||| 5,7,14,31

 // reducer funkce pro useReducer
 function setObjednavka(objednavka, action) {
   switch (action.type) {
     case "update_text":
       return { ...objednavka, [action.key]: action.value };
     case "update_number":
       return { ...objednavka, [action.key]: parseFloat(action.value) };
 case "toggle_input_checkbox_0": return { ...objednavka, input_checkbox_0: !objednavka.input_checkbox_0 };
 case "toggle_input_checkbox_2": return { ...objednavka, input_checkbox_2: !objednavka.input_checkbox_2 };
 case "toggle_input_checkbox_4": return { ...objednavka, input_checkbox_4: !objednavka.input_checkbox_4 };
 case "toggle_input_checkbox_6": return { ...objednavka, input_checkbox_6: !objednavka.input_checkbox_6 };
 default: return objednavka;
 }
 };

function App() {

  const [finalPrice, setFinalPrice] = useState(0);
  const [showFinalPrice, setShowFinalPrice] = useState(0);

  const [vysledek_zustatku_num, set_vysledek_zustatku_num] = useState();

  
  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);    
  
  useEffect(() => {
    // let newFinalPrice = getFinalPrice(objednavka);
    // setShowFinalPrice(newFinalPrice);
    // let newGiftCheck = checkGift(showFinalPrice);
    let newFinalPrice = checkPrice(objednavka,false);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka, showFinalPrice]);

  function checkPrice(objednavka, render)  {
    let init_price=0
    if (objednavka.input_checkbox_0 == true) {
      init_price += (100*objednavka.input_number_1)
    }
    if (objednavka.input_checkbox_2 == true) {
      init_price += (50*objednavka.input_number_3)
    }
    if (objednavka.input_checkbox_4 == true) {
      init_price += (500*objednavka.input_number_5)
    }
    init_price=(init_price*objednavka.select_0*objednavka.radioGroup_0)
    if (render == true){
      setFinalPrice(init_price)
      setShowFinalPrice(init_price)
      document.querySelector("#finalniCena").value = init_price }
    console.log(init_price+"<last love>"+objednavka.zadanasuma)
    if (init_price > objednavka.zadanasuma) {set_vysledek_zustatku_num("Nemáš dost peněz");
  objednavka['suma_dostacujici']="Nemáš dost peněz"} 
    else if (init_price < objednavka.zadanasuma) { set_vysledek_zustatku_num("Máš dost peněz") }
    return(init_price)
    // return init_price
  }
  
  
  function check_money(objednavka=objednavka) {
    checkPrice(objednavka,false)
    let zadanasuma = document.querySelector('#zadanasumaid').value
    console.log(checkPrice(objednavka,true),zadanasuma)
    if (checkPrice(objednavka,true) > zadanasuma) {set_vysledek_zustatku_num("Nemáš dost peněz");
  objednavka['suma_dostacujici']="Nemáš dost peněz"} 
    else if (checkPrice(objednavka,true) < zadanasuma) { set_vysledek_zustatku_num("Máš dost peněz") }
    else {set_vysledek_zustatku_num("Nic ne nestalo")}
    // zadanasuma.innerHTML=
  }

  function input_form(type="",name="",id="a",onchange=()=>{},valuE=0) {
    if (valuE==0)
  {return <input type={type} name={name} id={id} onChange={onchange}/>}
  else {return <input type={type} name={name} id={id} onChange={onchange} value={valuE}/>}
};



const select_form = (name="",id="",descs=[],onchange=()=>{}) => {
  return (<select name={name} id={id} onChange={(e) => {
    dispatch({
      type: "update_text",
      value: e.target.value,
      key: "select_0",
    }); console.log(e.target.value);}}>{descs.map(descs => <option value={descs.value}>{descs.desc}</option>)}</select>)};


  return (
    <>
    <img src='Wooden-Explorer-natural-27.5.jpg'></img> #někde jsem to už používal ale jdu dom
<div className="cokolik">
  
<div className="card">
<input type="checkbox" id="input_checkbox_0" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_0",
              }); 
            }} />

{input_form("number", "input_number_1" ,objednavka.input_number_1, (e) => {      
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "input_number_1",
            });console.log(e.target.value); })} HORSKE - toto je horske kolo | cena: 100 </div>

<div className="card">
<input type="checkbox" id="input_checkbox_2" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_2",
              }); 
            }} />

{input_form("number", "input_number_3" ,objednavka.input_number_3, (e) => {      
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "input_number_3",
            });console.log(e.target.value); })} detske - toto je detske kolo | cena: 50</div>

<div className="card">
<input type="checkbox" id="input_checkbox_4" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_4",
              }); 
            }} />
{input_form("number", "input_number_5" ,objednavka.input_number_5, (e) => {      
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "input_number_5",
            });console.log(e.target.value); })} silnička - toto je kolo pro frajery (nepraktické) | cena: 500</div>
</div>

<div className="cokolik">
Vyberte dobu po kterou si kola zapůjčíte - {select_form("select1","abc",[{desc:"5 Dnů",value:5},{desc:"Týden",value:7},
{desc:"14 Dnů",value:14},{desc:"Měsíc",value:31}])}
</div>

<div className="cokolik">

<div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value); },1.05)} <br /> <p>Střešní nosič +5%</p></div>   

<div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value); },1.1)} <br /> <p>Nosič na sněžný skůtr +10%</p></div>

<div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value); },1)} <br /> <p>Žádné přislušenství</p></div>
</div>

<div className="cokolik">
<p>Máš keš ? Zadej částku:</p>  
{input_form("number", "zadanasuma" ,"zadanasumaid", (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "zadanasuma",
            });console.log(e.target.value);})}<br />

<button onClick={check_money}>Zjistit!</button> <input type="text" id="zustatek" placeholder={vysledek_zustatku_num} disabled/> <p id='#vypiszustatku'></p> <br></br><br></br>
</div>

<div className="cokolik">

<label><p>Finální cena:</p></label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <button onClick={() => {
            checkPrice(objednavka,true);
            console.log(finalPrice); 
          }}>
            Vypočti
          </button>

          

          {/* <GiftAlert checked={gift}>
            <b>DĚKUJEME ZA OBJEDNÁVKU V HODNOTĚ NAD 2000KČ!</b>
            <p>K objednávce Vám přibalíme malý dárek.</p>
          </GiftAlert> */}

      {/* <button> Vypočti </button> */}</div>
    </>
  );
}

export default App;
