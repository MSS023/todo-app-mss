import check from "./Images/icon-check.svg";
import cross from "./Images/icon-cross.svg";

function ListItem(props) {
	return <div id={props.i} className={"List-item "+props.theme}>
        <button name={props.i} type="button" className={"check "+props.check+" "+props.theme} onClick={props.handleCheck}><img name={props.i} className={props.check} src={check} alt="check" onclick={props.handleCheck} /></button>
        <div className={"note "+props.theme+" "+props.check}>
            {props.message}
        </div>
        <button name={props.i} className={"cross "+props.theme} onClick={props.handleDelete}><img name={props.i} className="delete" src={cross} alt="delete" /></button>
    </div>
}
	
export default ListItem;