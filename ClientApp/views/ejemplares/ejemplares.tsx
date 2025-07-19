import React, { useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import EspeciesList from "../especies/especie/especie-list";
import AnimalesList from "../animales/animal-list";

const Ejemplares = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="flex flex-column h-full overflow-hidden">
      <TabView
        className="flex flex-column h-full"
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        panelContainerClassName="flex-grow-1 overflow-hidden"
        renderActiveOnly={false}
      >
        <TabPanel header="🐾Animales" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <AnimalesList />
          </div>
        </TabPanel>

        <TabPanel header="🧬Especies" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <EspeciesList />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Ejemplares;
