import { useRef,useState,useReducer   }from 'react';
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
    init_price=(init_price*objednavka.select_0)+(init_price*objednavka.radioGroup_0)
    if (render == true){
      setFinalPrice(init_price)
      setShowFinalPrice(init_price)
      document.querySelector("#finalniCena").value = init_price }
    console.log(init_price)
    // return init_price
  }
  
  
  function check_money(objednavka=objednavka) {
    checkPrice(objednavka,false)
    let zadanasuma = document.querySelector('#zadanasumaid').value
    console.log(finalPrice,zadanasuma)
    if (finalPrice > zadanasuma) {set_vysledek_zustatku_num("Nem???? dost pen??z");
  objednavka['suma_dostacujici']="Nem???? dost pen??z"} 
    else if (finalPrice < zadanasuma) { set_vysledek_zustatku_num("M???? dost pen??z") }
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
            });console.log(e.target.value);})} HORSKE - toto je horske kolo | cena: 100 <br />

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
            });console.log(e.target.value);})} detske - toto je detske kolo | cena: 50<br />

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
            });console.log(e.target.value);})} silni??ka - toto je kolo pro frajery (nepraktick??) | cena: 500<br />

{select_form("select1","abc",[{desc:"5 Dn??",value:5},{desc:"T??den",value:7},
{desc:"14 Dn??",value:14},{desc:"M??s??c",value:31}])}

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},1.05)} St??e??n?? nosi?? +5% |  

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},1.1)} Nosi?? na sn????n?? sk??tr +10% |

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},1)} ????dn?? p??islu??enstv?? <br />



M???? ke?? ? Zadej ????stku:  
{input_form("number", "zadanasuma" ,"zadanasumaid", (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "zadanasuma",
            });console.log(e.target.value);})}<br />

<button onClick={check_money}>Zjistit!</button> <input type="text" id="zustatek" placeholder={vysledek_zustatku_num} disabled/> <p id='#vypiszustatku'></p> <br></br><br></br>

<label>Fin??ln?? cena:</label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />
          <button onClick={() => {
            checkPrice(objednavka,true);
            console.log(finalPrice);
          }}>
            Vypo??ti
          </button>

          

          {/* <GiftAlert checked={gift}>
            <b>D??KUJEME ZA OBJEDN??VKU V HODNOT?? NAD 2000K??!</b>
            <p>K objedn??vce V??m p??ibal??me mal?? d??rek.</p>
          </GiftAlert> */}

      {/* <button> Vypo??ti </button> */}
    </>
  );
}

export default App;
