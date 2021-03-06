import { useRef,useState,useReducer,useEffect   }from 'react';
import logo from './logo.svg';
import './App.css';
import {objs} from "./objekty.js"
import rightSideBike from './KolaImgs\\elektrokolo-bezior-x1500-zeleny-zepredu.png'
import leftSideBike from './KolaImgs\\elektrokolo-bezior-x1500-zeleny-zepredu-2.png'
import midBikeLogo from './KolaImgs\\62507035_1.png'
import kidBike from './KolaImgs\\96b607c56488370318074865955e4584.png'
import horskeKolo from './KolaImgs\\77.png'
// import SelectGEN0 from './components/Home';


 const defaultObjednavka={'select_0': 5, 'input_checkbox_0': false, 'input_number_1': 0, 'input_checkbox_2': false, 'input_number_3': 0, 'input_checkbox_4': false, 'input_number_5': 0, 'input_checkbox_6': false, 'input_number_7': 0, 'radioGroup_0': 0, 'zadanasuma': 0, 'suma_dostacujici': "*",}
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
    let init_price=0;
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
    if (init_price > objednavka.zadanasuma) {set_vysledek_zustatku_num("Nem???? dost pen??z");
  objednavka['suma_dostacujici']="Nem???? dost pen??z"} 
    else if (init_price < objednavka.zadanasuma) { set_vysledek_zustatku_num("M???? dost pen??z") }
    return(init_price)
    // return init_price
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
    <div id="headerLogoWrap">
    <div id='headerlogo'>
    <img src={leftSideBike}></img>
    <img src={midBikeLogo}></img>
    <img src={rightSideBike}></img></div></div> 
    <div id="content">
    <div className="cokolik">
  
  <div className="card"><div>
  <img src={horskeKolo} className="imgbike"></img>
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
              });console.log(e.target.value); })}</div> HORSKE <br></br> toto je horske kolo <br></br> <em>100</em> </div>
  
  
  
  
  <div className="card">

  <div>
    <img src={kidBike} className="imgbike"></img>
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
              });console.log(e.target.value); })}</div> detske <br></br> toto je detske kolo <br/> <em>50</em></div>
  
  <div className="card">
  <div>
  <img src={midBikeLogo} className="imgbike"></img>
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
              });console.log(e.target.value); })}</div> silni??ka <br/> toto je kolo pro frajery <br></br> <em>500</em></div>
  </div>
  
  <div className="cokolik">
  Vyberte dobu po kterou si kola zap??j????te - {select_form("select1","abc",[{desc:"5 Dn??",value:5},{desc:"T??den",value:7},
  {desc:"14 Dn??",value:14},{desc:"M??s??c",value:31}])}
  </div>
  
  <div className="cokolik">
  
  <div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "radioGroup_0",
              });console.log(e.target.value); },1.05)} <br /> <p>St??e??n?? nosi?? +5%</p></div>   
  
  <div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "radioGroup_0",
              });console.log(e.target.value); },1.1)} <br /> <p>Nosi?? na sn????n?? sk??tr +10%</p></div>
  
  <div className="card">{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "radioGroup_0",
              });console.log(e.target.value); },1)} <br /> <p>????dn?? p??islu??enstv??</p></div>
  </div>
  
  <div className="cokolik">
  <p>M???? ke?? ? Zadej ????stku:</p>  
  {input_form("number", "zadanasuma" ,"zadanasumaid", (e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "zadanasuma",
              });console.log(e.target.value);})}<br />
  
  <button onClick={checkPrice}>Zjistit!</button> <input type="text" id="zustatek" placeholder={vysledek_zustatku_num} disabled/> <p id='#vypiszustatku'></p> <br></br><br></br>
  </div>
  
  <div className="cokolik">
  
  <label><p>Fin??ln?? cena:</p></label>
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
  
        {/* <button> Vypo??ti </button> */}</div>
    </div>

    <script src="https://unpkg.com/react@15/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>

    </>
  );
}

export default App;
