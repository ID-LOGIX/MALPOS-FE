import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar/";
import { DrawerContext } from "../context/RightDrawer";
import Section from "../components/elements/Section";
import data from "../data/rightSideBar.json";

export default function RightSidebar() {
  const { drawer, fromRight } = useContext(DrawerContext);

  const sideClass = fromRight ? "active-right" : "active";

  return (
    <Section
      as="aside"
      className={`mc-sidebar thin-scrolling ${drawer ? sideClass : ""}`}
    >
      <MultipleMenu data={data?.navs} />
      <Logout data={data?.button} />
    </Section>
  );
}
