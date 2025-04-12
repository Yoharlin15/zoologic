import React, { useState } from "react";
import { AppQueryHooks } from "#hooks";
import { renderTooltip } from "#utils";
import { Reducers } from "#core";
import { useParams } from "react-router-dom";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import EspeciesList from "../especies/especie-list";
import AnimalesList from "../animales/animal-list";

const Ejemplares = () => {
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
        <TabPanel contentClassName="overflow-auto h-full" header="Animales">
          <AnimalesList />
        </TabPanel>

        <TabPanel contentClassName="overflow-auto h-full" header="Especies">
          <EspeciesList/>
        </TabPanel>
        
      </TabView>
    </div>
  );
};

export default Ejemplares;