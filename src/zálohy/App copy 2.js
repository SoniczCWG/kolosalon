import { useRef,useState,useReducer   }from 'react';
import logo from './logo.svg';
import './App.css';
import {objs} from "./objekty.js"
// import SelectGEN0 from './components/Home';

const defaultObjednavka={'select_0': '', 'input_number_0': 0, 'input_checkbox_1': false, 'input_checkbox_2': false, 'input_checkbox_3': false, 'input_checkbox_4': false, 'radioGroup_0': 0, 'input_text_5': '', 'input_number_6': 0}


// reducer funkce pro useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "update_text":
      return { ...objednavka, [action.key]: action.value };
    case "update_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };
case "toggle_input_checkbox_1": return { ...objednavka, input_checkbox_1: !objednavka.input_checkbox_1 };
case "toggle_input_checkbox_2": return { ...objednavka, input_checkbox_2: !objednavka.input_checkbox_2 };
case "toggle_input_checkbox_3": return { ...objednavka, input_checkbox_3: !objednavka.input_checkbox_3 };
case "toggle_input_checkbox_4": return { ...objednavka, input_checkbox_4: !objednavka.input_checkbox_4 };
default: return objednavka;
}
};

function App() {
  
  // function input_form(type="",name="",id="",value="",onchange=()=>{}) {
  //   return <input type={type} name={name} id={id} value={value} onChange={onchange}/>
  // };

    function input_form(type="",name="",id="a",onchange=()=>{},valuE=0) {
      if (valuE==0)
    {return <input type={type} name={name} id={id} onChange={onchange}/>}
    else {return <input type={type} name={name} id={id} onChange={onchange} value={valuE}/>}
  };

  const select_form = (name="",id="",descs=[],values=[],onchange=()=>{}) => {
    return (<select name={name} id={id} onChange={onchange}>{descs.map(descs => <option value={descs.value}>{descs.desc}</option>)}</select>)};

  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  return (
    <>
  {select_form("select1","abc",objs[0].items)}

    {input_form("number", "input_number_0" ,objednavka.input_number_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "input_number_0",
            });console.log(e.target.value);})}

<input type="checkbox" id="input_checkbox_1" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_1",
              });
            }} />

<input type="checkbox" id="input_checkbox_2" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_2",
              });
            }} />

<input type="checkbox" id="input_checkbox_3" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_3",
              });
            }} />

<input type="checkbox" id="input_checkbox_4" onChange={(e) => {
              dispatch({
                type: "toggle_input_checkbox_4",
              });
            }} />

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},11)}

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},48)}

{input_form("radio", "radioGroup_0" ,objednavka.radioGroup_0, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "radioGroup_0",
            });console.log(e.target.value);},55)}

{input_form("text", "input_text_5" ,objednavka.input_text_5, (e) => {
            dispatch({
              type: "update_text",
              value: e.target.value,
              key: "input_text_5",
            });console.log(e.target.value);})}

{input_form("number", "input_number_6" ,objednavka.input_number_6, (e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "input_number_6",
            });console.log(e.target.value);})}
    </>
  );
}

export default App;
