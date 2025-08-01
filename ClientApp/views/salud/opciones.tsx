import React, { useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import Tratamientos from "./tratamiento/tratamiento";
import TratamientosEspecies from "./tratamientoEspecie/tratamientoEspecie";

const Alimentacion = () => {
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
        <TabPanel header="🩺Tratamientos" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <Tratamientos />
          </div>
        </TabPanel>
        
        <TabPanel header="Tratamiento&Especies" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <TratamientosEspecies />
          </div>
        </TabPanel>

      </TabView>
    </div>
  );
};

export default Alimentacion;
