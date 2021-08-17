import './App.css';
import Background from "./Background";
import sun from "./Images/icon-sun.svg";
import moon from "./Images/icon-moon.svg";
import check from "./Images/icon-check.svg";
import cross from "./Images/icon-cross.svg";
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
        <div className={"header "+theme}>
          <div className={"header-cell logo "+theme}>
            T O D O
          </div>
          <div className={"header-cell theme-selector "+theme}>
            <button className={"theme-button moon-"+theme}><img src={moon} alt="toggle dark" onClick={toggleTheme} /></button>
            <button className={"theme-button sun-"+theme}><img src={sun} alt="toggle light" onClick={toggleTheme} /></button>
          </div>
        </div>
        <div className={"Create "+theme}>
          <input type="button" className={"create check "+theme} onClick={handleCreate} value=" "/>
          <input className={"create-input "+theme} type="text" placeHolder={placeholder} value={create} onFocus={() => setCreate([create,"Currently typing ",list,active])} onChange={handleChange} onKeyDown={handleKey} />
        </div>
        <div className={"List "+theme}>
          {list.map(function(element,i) {
              if(def==="all")
                return <div id={i} className={"List-item "+theme}>
                  <button name={i} type="button" className={"check "+element.check+" "+theme} onClick={handleCheck}><img name={i} className={element.check} src={check} alt="check" onclick={handleCheck} /></button>
                  <div className={"note "+theme+" "+element.check}>
                    {element.message}
                  </div>
                  <button name={i} className={"cross "+theme} onClick={handleDelete}><img name={i} className="delete" src={cross} alt="delete" /></button>
                </div>
              else if(def==="active" && element.check==="unchecked")
                return <div id={i} className={"List-item "+theme}>
                  <button name={i} type="button" className={"check "+element.check+" "+theme} onClick={handleCheck}><img name={i} className={element.check} src={check} alt="check" onclick={handleCheck} /></button>
                  <div className={"note "+theme+" "+element.check}>
                    {element.message}
                  </div>
                  <button name={i} className={"cross "+theme} onClick={handleDelete}><img name={i} className="delete" src={cross} alt="delete" /></button>
                </div>
              else if(def==="completed" && element.check==="checked")
                return <div id={i} className={"List-item "+theme}>
                  <button name={i} type="button" className={"check "+element.check+" "+theme} onClick={handleCheck}><img name={i} className={element.check} src={check} alt="check" onclick={handleCheck} /></button>
                  <div className={"note "+theme+" "+element.check}>
                    {element.message}
                  </div>
                  <button name={i} className={"cross "+theme} onClick={handleDelete}><img name={i} className="delete" src={cross} alt="delete" /></button>
                </div>
              return "";
          })}
          <div className={"Footer-nav "+theme}>
            <div className={"nav items-left "+theme}> 
                {active+" items left"}
            </div>
            <div className={"nav category-menu "+theme}>
              <button className={"nav-button category all-"+def+" "+theme} name="all" onClick={changeDefault} >All</button>
              <button className={"nav-button category active-"+def+" "+theme} name="active" onClick={changeDefault}>Active</button>
              <button className={"nav-button category completed-"+def+" "+theme} name="completed" onClick={changeDefault}>Completed</button>
            </div>
            <div className={"nav clear-completed "+theme}>
              <button className={"nav-button "+theme} onClick={clearCompleted}>Clear Completed</button>
            </div>
          </div>
        </div>
        <div className={"nav category-menu-mini "+theme}>
          <button className={"nav-button category all-"+def+" "+theme} name="all" onClick={changeDefault}>All</button>
          <button className={"nav-button category active-"+def+" "+theme} name="active" onClick={changeDefault}>Active</button>
          <button className={"nav-button category completed-"+def+" "+theme} name="completed" onClick={changeDefault}>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
