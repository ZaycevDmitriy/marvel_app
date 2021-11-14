import './appHeader.scss';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                      <NavLink style={({isActive}) => ({color: isActive ? '#9f0013' : null})}
                               to="/"
                      >
                        Characters
                      </NavLink>
                    </li>
                    /
                    <li>
                      <NavLink style={({isActive}) => ({color: isActive ? '#9f0013' : null})}
                               to="/comics"
                      >
                        Comics
                      </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
