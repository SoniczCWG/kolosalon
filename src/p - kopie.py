# from asyncio import events
# from click import option
import json

print("ůf")

musthave_tags=["obj_id"]

events=["onClick","onChange"] #all

props={"select":{"id":""},
"option":{"value":0},
"button":{"id":""},
"input":{"type":[],"name":"","id":"","value":0},
"textarea":{}
}

props_occurunce_count={"select":0,
"option":"0",
"button":"0",
"input":"0",
"radio":"0",
"textarea":"0"
}

all_attrs=musthave_tags+events+list(props.keys())
all_attrs.remove("input")
all_attrs.remove("select")
all_attrs.append("tag")
all_attrs.append("items")
all_attrs.append("desc")
all_attrs.append("value")
all_attrs.append("type")

variables_4use = []

def gen_html(var_name,action,dict_like_temp,fused_temp=""):
    result=""
    if "input" in fused_temp and "radio" in fused_temp:
        return "{input_form("+dict_like_temp["type"]+", id=\""+var_name+"\" ,value={objednavka."+var_name+"""}, onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: \""""+var_name+"""\",
            });}})}"""
    if "select" in fused_temp:
        return "{input_form("+dict_like_temp["type"]+", id=\""+var_name+"\" ,value={objednavka."+var_name+"""}, onChange={(e) => {
            dispatch({
              type: "update_text",
              value: e.target.value,
              key: \""""+var_name+"""\",
            });}})}"""
    if "input" in fused_temp and "radio" not in fused_temp:            
        
        if dict_like_temp["type"] == "number":
            return "{input_form("+dict_like_temp["type"]+", id=\""+var_name+"\" ,value={objednavka."+var_name+"""}, onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: \""""+var_name+"""\",
            });}})}"""
        elif dict_like_temp["type"] == "checkbox":
            return "{input_form(type=\"checkbox\",name=\"\",id=\""+var_name+"\",value=\"\",onchange="+"""{(e) => {
            dispatch({\ntype: \""""+action+"""\",});}})}"""
        else:
            return "{input_form("+dict_like_temp["type"]+", id=\""+var_name+"\" ,value={objednavka."+var_name+"""}, onChange={(e) => {
            dispatch({
              type: "update_text",
              value: e.target.value,
              key: \""""+var_name+"""\",
            });}})}"""

#must enclose select items keys in double quotes
must_format = """[
    {obj_id: 0, tag:"select", items: [{desc:"text1",value:100},{desc:"text2",value:200},{desc:"text3",value:0}]},
    {obj_id: 1, tag:"input", type: "number"},
    {obj_id: 2, tag:"input", type:"checkbox"},
    {obj_id: 3, tag:"input",  type:"checkbox"},
    {obj_id: 4, tag:"input", type:"checkbox"},
    {obj_id: 5, tag:"input", type:"checkbox"},
    {obj_id: 7, tag:"input" , type:"radio"},
    {obj_id: 8, tag:"input" , type:"radio"},
    {obj_id: 9, tag:"input" , type:"radio"},
    {obj_id: 10, tag:"input" , type:"text"},
    {obj_id: 11, tag:"input" , type:"number"},
  ]""".split("\n")

py_format=[]

defaultObjednavka={}

html_elems=[]

use_reducer_fce=["""// reducer funkce pro useReducer
function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "update_text":
      return { ...objednavka, [action.key]: action.value };
    case "update_number":
      return { ...objednavka, [action.key]: parseFloat(action.value) };"""]

wasRadio=False
radioGroup=""

for i in must_format:
    temp=""
    if i != "[" and i != "]":
        temp=i
        # temp=temp[temp.find("{")+2:temp.find("}")]
        # temp.replace("},","").replace("{","")
        # temp=temp.split(",")[:-1]
        # print(repr(temp))
        # print("--temp--")
        # py_format_attributes_on_line=[]
        # for attr in temp:
        #     attr=attr.strip()
        #     attr_attr="\'"+(attr.split(":")[0])+"\'"
        #     try:
        #         attr_val=attr.split(":")[1]
        #     except:
        #         print(" aSTART "+attr+" aEND ")
        #     py_format_attributes_on_line.append((":".join([attr_attr,attr_val])))

        for att in all_attrs:
            if att in temp:
                temp=temp.replace(att,("\""+att+"\""))
                temp.replace("\"\"","\"")
        if temp != " " or temp != "  ":
            try:
                print("Temp>"+temp[:-1]+"<temp")
                dict_like_temp=json.loads(temp[:-1])
                fused_temp="".join(temp)

                if "input" in fused_temp and "radio" in fused_temp:
                    if wasRadio==False:
                        variables_4use.append("radioGroup"+"_"+str(props_occurunce_count["radio"]))
                        props_occurunce_count["radio"]=str(int(props_occurunce_count["radio"])+1)
                        defaultObjednavka[variables_4use[-1]]=0
                        wasRadio=True
                        radioGroup=variables_4use[-1]
                        py_format.append(dict_like_temp)
                        html_elems.append(gen_html(variables_4use[-1],"update_number",dict_like_temp,fused_temp))
                    else:
                        # variables_4use.append("radioGroup"+"_"+str(props_occurunce_count["radio"]))
                        props_occurunce_count["radio"]=str(int(props_occurunce_count["radio"])+1)
                        # defaultObjednavka[radioGroup]=0
                        wasRadio=True
                        py_format.append(dict_like_temp)
                        html_elems.append(gen_html(radioGroup,"update_number",dict_like_temp,fused_temp))
                if "select" in fused_temp:
                    variables_4use.append(("select"+"_"+str(props_occurunce_count["select"])))
                    props_occurunce_count["select"]=str(int(props_occurunce_count["select"])+1)
                    defaultObjednavka[variables_4use[-1]]=''
                    wasRadio=False
                    radioGroup=""
                    py_format.append(dict_like_temp)
                    html_elems.append(gen_html(variables_4use[-1],"update_text",dict_like_temp,fused_temp))
                if "input" in fused_temp and "radio" not in fused_temp:            
                    variables_4use.append("input"+"_"+dict_like_temp["type"]+"_"+str(props_occurunce_count["input"]))
                    props_occurunce_count["input"]=str(int(props_occurunce_count["input"])+1)
                    if dict_like_temp["type"] == "number":
                        defaultObjednavka[variables_4use[-1]]=0
                        html_elems.append(gen_html(variables_4use[-1],"update_number",dict_like_temp,fused_temp))
                    elif dict_like_temp["type"] == "checkbox":
                        defaultObjednavka[variables_4use[-1]]=False
                        use_reducer_fce.append("case \"toggle_"+variables_4use[-1]+"\": return { ...objednavka, "+variables_4use[-1]+": !objednavka."+variables_4use[-1]+" };")
                        html_elems.append(gen_html(variables_4use[-1],"toggle_"+variables_4use[-1],dict_like_temp,fused_temp))
                    else:
                        defaultObjednavka[variables_4use[-1]]=""           
                        html_elems.append(gen_html(variables_4use[-1],"update_text",dict_like_temp,fused_temp))
                    wasRadio=False
                    radioGroup=""
                    py_format.append(dict_like_temp)
                if "button" in fused_temp:            
                    variables_4use.append("button"+"_"+str(props_occurunce_count["button"]))
                    props_occurunce_count["button"]=str(int(props_occurunce_count["button"])+1)
                    # defaultObjednavka[variables_4use[-1]]=""
                    wasRadio=False
                    radioGroup=""
                    py_format.append(dict_like_temp)
                if "textarea" in fused_temp:            
                    variables_4use.append("textarea"+"_"+str(props_occurunce_count["textarea"]))
                    props_occurunce_count["textarea"]=str(int(props_occurunce_count["textarea"])+1)
                    defaultObjednavka[variables_4use[-1]]=""
                    wasRadio=False
                    radioGroup=""
                    py_format.append(dict_like_temp)
            except:
                pass
print(repr(py_format))
print(type(py_format[3]))
print("pyformat "+str(len(py_format)))
print("\n\n\n".join(variables_4use))
print("variables_4use "+str(len(variables_4use)))
use_reducer_fce.append("default: return objednavka;\n}\n};")


print("--- insert code below ABOVE app method")
print("defaultObjednavka="+repr(defaultObjednavka)+"\n\n")
print("\n".join(use_reducer_fce))
print("--- insert code below INTO app method")
print("const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);\n\n")
print("--- insert code below INTO return of App method")
print("\n\n".join((html_elems)))



"""


{select_form("select1","abc",objekty[0].items)}
{input_form(objekty[1].type)}
+
<input type="text" id="hmotnost" value={objednavka.hmotnost} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "hmotnost",
            });
          }} />
"""






# function setObjednavka(objednavka, action) {
#   switch (action.type) {
#     case "update_text":
#       return { ...objednavka, [action.key]: action.value };
#     case "update_number":
#       return { ...objednavka, [action.key]: parseFloat(action.value) };
#     case "toggle_bio": return { ...objednavka, bioKvalita: !objednavka.bioKvalita };
#     case "toggle_premium": return { ...objednavka, premiumKvalita: !objednavka.premiumKvalita };
#     case "toggle_chudi": return { ...objednavka, chudiKvalita: !objednavka.chudiKvalita };
#     case "toggle_darek": return { ...objednavka, darkoveBaleni: !objednavka.darkoveBaleni };
#     default: return objednavka;
#   }
# };

