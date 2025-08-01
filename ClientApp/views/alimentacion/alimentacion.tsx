import React, { useState } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import AlimentosList from "./alimentos/alimento-list";
import InventarioList from "./inventario/inventario-list";
import AlimentosEspeciesList from "./alimentosEspecies/alimentoEspecie-list";

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
        <TabPanel header="🥩Alimentos" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <AlimentosList />
          </div>
        </TabPanel>
        
        <TabPanel header="📋Inventario" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <InventarioList />
          </div>
        </TabPanel>

        <TabPanel header="Alimentos&Especies" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <AlimentosEspeciesList />
          </div>
        </TabPanel>

      </TabView>
    </div>
  );
};

export default Alimentacion;
