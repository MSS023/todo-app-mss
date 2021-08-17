function FooterNav(props) {
	return <div className={"Footer-nav "+props.theme}>
        <div className={"nav items-left "+props.theme}> 
            {props.active+" items left"}
        </div>
		<div className={"nav category-menu "+props.theme}>
			<button className={"nav-button category all-"+props.def+" "+props.theme} name="all" onClick={props.changeDefault} >All</button>
            <button className={"nav-button category active-"+props.def+" "+props.theme} name="active" onClick={props.changeDefault}>Active</button>
            <button className={"nav-button category completed-"+props.def+" "+props.theme} name="completed" onClick={props.changeDefault}>Completed</button>
        </div>
        <div className={"nav clear-completed "+props.theme}>
            <button className={"nav-button "+props.theme} onClick={props.clearCompleted}>Clear Completed</button>
        </div>
    </div>
}
	
export default FooterNav;