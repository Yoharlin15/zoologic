import React, { useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import Clases from "./clase/clase";
import Familias from "./familia/familia";
import Procedencias from "./procedencia/procedencia";

const Especie = () => {
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
        <TabPanel header="🦁Familias" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <Familias />
          </div>
        </TabPanel>
        
        <TabPanel header="📚Clases" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <Clases />
          </div>
        </TabPanel>

        <TabPanel header="🌍Procedencias" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <Procedencias />
          </div>
        </TabPanel>

      </TabView>
    </div>
  );
};

export default Especie;
