import React, { useContext } from "react";
// import { MultipleMenu, Logout } from "../components/sidebar"
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";
import { Menu } from "../components/elements";
import { List } from "../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
export default function BackSidebar() {
  const { drawer } = useContext(DrawerContext);
  const navigate = useNavigate();

  return (
    <div>
      <Section
        as="aside"
        // className={`mc-sidebar thin-scrolling ${drawer ? "active" : ""}`}
        style={{ width: "55px", backgroundColor: "red" }}
      >
        <Menu className="mc-sidebar-menu">
          <List className="mc-sidebar-menu-list">
            <button
              style={{ marginLeft: "13px", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </List>
        </Menu>
      </Section>
    </div>
  );
}
