import React, { useState } from "react";
import { AppQueryHooks } from "#hooks";
import { renderTooltip } from "#utils";
import { Reducers } from "#core";
import { useParams } from "react-router-dom";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import TratamientosList from "../tratamientos/tratamiento-list";
import NecropsiasList from "../necropsias/necropsia-list";

const Salud = () => {
  const { projectId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="h-full">
      <TabView
        className="h-full"
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        panelContainerClassName="p-0 h-full w-full"
      >
        <TabPanel contentClassName="overflow-auto h-full" header="🧪Tratamientos">
          <TratamientosList />
        </TabPanel>

        <TabPanel contentClassName="overflow-auto h-full" header="🩻 Necropsias">
          <NecropsiasList/>
        </TabPanel>
        
      </TabView>
    </div>
  );
};

export default Salud;
