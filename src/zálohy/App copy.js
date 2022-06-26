import { useRef,useState   }from 'react';
import logo from './logo.svg';
import './App.css';
import {objs} from "./objekty.js"
// import SelectGEN0 from './components/Home';

function App() {
  // const SelectGEN = (popisky) => {
  //   let result="<select>";

  // for (let index = 0; index < popisky.length; index++) {
  //   const element = popisky[index];
  //   result= result + ("<option>"+element+"</option>");
  // }
  // result=result+"</select>"
  // return result
  //}

  

  // const select_0 = <select>{objs.select_0.data.map(p => <option>{p}</option>)}</select>
  // const input_number_0 = <input type={objs.input_num_0.type}/>
  
  function input_form(type="",name="",id="",value="",onchange=()=>{}) {
    return <input type={type} name={name} id={id} value={value} onChange={onchange}/>
  };
  
  const [objekty, setobjekty] = useState(objs);

  const select_form = (name="",id="",descs=[],values=[],onchange=()=>{}) => {
    return (<select name={name} id={id} onChange={onchange}>{descs.map(descs => <option value={descs.value}>{descs.desc}</option>)}</select>)};

  let [htmlcode,set_htmlcode]=useState(null);

  // const iterate_form_FROM2 = (from,to,where=objekty) =>  {
  //   let newcode="";
  //   for (let index = 0; index < where.length; index++) {
  //     if (from<=index<=to) {
  //       if (objekty[index].tag==="input") {
  //         newcode+=JSON.stringify(input_form(objekty[index].type))}
  //       if (objekty[index].tag==="select") {
  //         newcode+=JSON.stringify(select_form("selectTyp","typKrmivaID",objekty[index].descs))}
          
  //       }
  //       }
  //   return (newcode);
  //   }


  return (
    <>
    
    {select_form("select1","abc",objekty[0].items)} typ <br />
    {input_form(objekty[1].type)} kg <br />
    {input_form(objekty[2].type)}<br/>
    {input_form(objekty[3].type)} kg <br />
    {input_form(objekty[4].type)}<br/>
    {input_form(objekty[5].type)} kg <br />
    <form>
    {input_form(objekty[6].type)}<br/>
    {input_form(objekty[7].type)}<br/>
    {input_form(objekty[8].type)}<br/>
    </form>
    {input_form(objekty[9].type)}<br/>
    {input_form(objekty[10].type)}<br/>

    <button>Submit</button>
    {/* <div dangerouslySetInnerHTML={{__html:iterate_form_FROM2(0,6)}}></div> */}

    </>
  );
}

export default App;
