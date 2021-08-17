import sun from "./Images/icon-sun.svg";
import moon from "./Images/icon-moon.svg";

function Header(props) {
	return <div className={"header "+props.theme}>
          <div className={"header-cell logo "+props.theme}>
            T O D O
          </div>
          <div className={"header-cell theme-selector "+props.theme}>
            <button className={"theme-button moon-"+props.theme}><img src={moon} alt="toggle dark" onClick={props.toggleTheme} /></button>
            <button className={"theme-button sun-"+props.theme}><img src={sun} alt="toggle light" onClick={props.toggleTheme} /></button>
          </div>
        </div>
}

export default Header;