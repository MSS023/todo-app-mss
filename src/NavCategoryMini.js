function NavCategoryMini(props) {
	return <div className={"nav category-menu-mini "+props.theme}>
        <button className={"nav-button category all-"+props.def+" "+props.theme} name="all" onClick={props.changeDefault}>All</button>
        <button className={"nav-button category active-"+props.def+" "+props.theme} name="active" onClick={props.changeDefault}>Active</button>
        <button className={"nav-button category completed-"+props.def+" "+props.theme} name="completed" onClick={props.changeDefault}>Completed</button>
    </div>
}

export default NavCategoryMini;