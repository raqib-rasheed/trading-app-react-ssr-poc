import { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

import useNavOnKeyRelease from "@shared/hooks/useNavOnKeyRelease";

import { WatchListNavObject } from "@watch-list/WatchList.constants";
import { AppName } from "@shared/constants";

import { ILinkAriaProps } from "@shared/types";

import "./Layout.scss";
import Icon from "@components/atoms/icon";

export default function Layout() {
  const location = useLocation();
  const navigateOnKeyRelease = useNavOnKeyRelease();

  const [showSiderInMob, setShowSiderInMob] = useState(false);

  const navItems = [
    {
      key: WatchListNavObject.path,
      icon: <Icon iconKey={WatchListNavObject.linkIconKey} />,
      label: WatchListNavObject.linkLabel,
    },
  ];

  const toggleShowSiderInMob = () => {
    setShowSiderInMob((prev) => !prev);
  };

  return (
    <section className="layout">
      <aside
        className={`layout__sider ${showSiderInMob ? "layout__sider--visible" : "layout__sider--hidden"}`}
      >
        <header className="layout__sider__header">
          <Icon iconKey="app-logo" />
          {/* <img src={AppLogo} alt="application logo icon image" /> */}
          <h1 className="layout__sider__header__app-name">{AppName}</h1>
          <button
            className={`layout__sider__show__btn ${showSiderInMob ? "" : "layout__sider__show__btn--hidden"}`}
            onClick={toggleShowSiderInMob}
          >
            {/* <img
              src={HamburgerIcon}
              alt="hamburger icon for toggling application's side navigation bar collapse"
            /> */}
            <Icon iconKey="hamburger" />
          </button>
        </header>
        <div className="layout__sider__divider" />
        <nav className="layout__sider__nav">
          <ul className="layout__sider__nav__list">
            {navItems.map((navObj) => {
              const active = navObj.key === location.pathname;
              const ariaProps: ILinkAriaProps = {
                "aria-label": navObj.label,
                "aria-current": false,
              };
              if (active) {
                ariaProps["aria-current"] = "page";
              }
              return (
                <li className="layout__sider__nav__list__item" key={navObj.key}>
                  <Link
                    tabIndex={0}
                    role="button"
                    to={navObj.key}
                    onKeyUp={navigateOnKeyRelease(navObj.key)}
                    className={`layout__sider__nav__btn ${active ? "layout__sider__nav__btn--active" : ""}`}
                    {...ariaProps}
                  >
                    <div
                      className={`layout__sider__nav__btn__icon-wrapper ${active ? "layout__sider__nav__btn__icon-wrapper--active" : ""}`}
                    >
                      {navObj.icon}
                    </div>
                    {navObj.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="layout__content">{<Outlet />}</main>
    </section>
  );
}
