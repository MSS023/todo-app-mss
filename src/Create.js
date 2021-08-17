function Create(props) {
	return <div className={"Create "+props.theme}>
		<input type="button" className={"create check "+props.theme} onClick={props.handleCreate} value=" "/>
        <input className={"create-input "+props.theme} type="text" placeHolder={props.placeholder} value={props.create} onFocus={() => props.setCreate([props.create,"Currently typing ",props.list,props.active])} onChange={props.handleChange} onKeyDown={props.handleKey} />
    </div>
}
	
export default Create;