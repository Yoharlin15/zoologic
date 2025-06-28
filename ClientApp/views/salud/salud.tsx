import React, { useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import TratamientosAplicadosList from "./tratamientosAplicados/tratamientoAplicado-list";
import NecropsiasList from "./necropsias/necropsias-list";

const SaludMenu = () => {
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
        <TabPanel contentClassName="overflow-auto h-full" header="🧪Tratamientos">
          <TratamientosAplicadosList />
        </TabPanel>

        <TabPanel contentClassName="overflow-auto h-full" header="Necropsias">
          <NecropsiasList />
        </TabPanel>

      </TabView>
    </div>
  );
};

export default SaludMenu;
