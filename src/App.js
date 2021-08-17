import Background from "./Background";
import Header from "./Header";
import Create from "./Create";
import ListItem from "./ListItem";
import FooterNav from "./FooterNav";
import NavCategoryMini from "./NavCategoryMini";
import React,{useState} from "react";

function App() {
  const [theme,setTheme]=useState("dark");
  const [[create,placeholder,list,active], setCreate]=useState(["","Create a new todo...",[
  {
      message: "Welcome to TODO App",
      check: "unchecked"
  },
  {
      message: "Click on Sun/Moon above to toggle theme ^",
      check: "unchecked"
  },
  {
      message: "<- Click on this button to mark as completed",
      check: "unchecked"
  },
  {
      message: "Click on this button to delete this note ->",
      check: "unchecked"
  }
  ],4]);
  const [def,setDefault]=useState("all");
  if(localStorage.getItem("visited")===null)
  {
      localStorage.setItem("visited","yes");
      localStorage.setItem("list",JSON.stringify(list));
      localStorage.setItem("active",JSON.stringify(active));
      localStorage.setItem("theme",theme);
  }
  else if(JSON.stringify(list)!==localStorage.getItem("list"))
  {
      setCreate([create,placeholder,JSON.parse(localStorage.getItem("list")),JSON.parse(localStorage.getItem("active"))]);
  }
  if(theme!==localStorage.getItem("theme"))
  {
      setTheme(localStorage.getItem("theme"));
  }
  
  function handleCreate() {
    if(create==="")
    {
        return;
    }
    list.unshift({
      message: create,
      check: "unchecked"
    });
    localStorage.setItem("list",JSON.stringify(list));
    localStorage.setItem("active",JSON.stringify(active+1));
    setCreate(["","Create a new todo...",list,active+1]);
  }
  
  function toggleTheme() {
    var t;
    if(theme==="light")
      t="dark";
    else
      t="light";
    localStorage.setItem("theme",t);
    setTheme(t);
  }
  
  function handleChange(e) {
    var value=e.target.value;
    setCreate([value,placeholder,list,active]);
  }
  
  function handleKey(e) {
    var key=e.key;
    if(key==="Enter")
    {
        list.unshift({
          message: create,
          check: "unchecked"
        });
        localStorage.setItem("list",JSON.stringify(list));
        localStorage.setItem("active",JSON.stringify(active+1));
        setCreate(["","Create a new todo...",list,active+1]);
    }
    else
        setCreate([create,"Currently typing ",list,active])
  }  
  
  function handleCheck(e){
      var id=e.target.name;
      var act;
      if(list[id].check==="checked")
      {
        act=active+1;
        list[id].check="unchecked";
      }
      else
      {
        act=active-1;
        list[id].check="checked";
      }
      localStorage.setItem("list",JSON.stringify(list));
      localStorage.setItem("active",JSON.stringify(act));
      setCreate([create,placeholder,list,act]);
  }
  
  function handleDelete(e) {
      var id=e.target.name;
      var el=list.splice(id,1);
      var act=active;
      if(el[0].check==="unchecked")
          act-=1;
      localStorage.setItem("list",JSON.stringify(list));
      localStorage.setItem("active",JSON.stringify(act));
      setCreate([create,placeholder,list,act]);
  }
  
  function clearCompleted() {
    var temp=list,i=0;
    while(i<temp.length)
    {
        if(temp[i].check==="checked")
          temp.splice(i,1);
        else
          i++;
    }
    localStorage.setItem("list",JSON.stringify(temp));
    localStorage.setItem("active",JSON.stringify(active));
    setCreate([create,placeholder,temp,active]);
  }
  
  function changeDefault(e) {
    var value=e.target.name;
    setDefault(value);
  }
  
  return (
    <div className="App">
      <Background theme={theme} />
      <div className={"body "+theme}></div>
      <div className={"todo "+theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Create theme={theme} handleCreate={handleCreate} placeholder={placeholder} create={create} setCreate={setCreate} list={list} active={active} handleChange={handleChange} handleKey={handleKey} />
        <div className={"List "+theme}>
          {list.map(function(element,i) {
              if(def==="all")
                return <ListItem i={i} theme={theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              else if(def==="active" && element.check==="unchecked")
                return <ListItem i={i} theme={theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              else if(def==="completed" && element.check==="checked")
                return <ListItem i={i} theme={theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              return "";
          })}
          <FooterNav theme={theme} active={active} def={def} changeDefault={changeDefault} clearCompleted={clearCompleted} />
        </div>
        <NavCategoryMini theme={theme} def={def} changeDefault={changeDefault} />
      </div>
    </div>
  );
}

export default App;
