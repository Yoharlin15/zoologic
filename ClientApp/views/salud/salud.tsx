import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import TratamientosAplicadosList from "./tratamientosAplicados/tratamientoAplicado-list";

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
          <TratamientosAplicadosList />
        </TabPanel>
        
      </TabView>
    </div>
  );
};

export default Salud;
