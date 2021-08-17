import "./Background.css";

function Background(props) {
	return <div className="Background">
		<div className={"Upper "+props.theme} />
	</div>
}

export default Background;