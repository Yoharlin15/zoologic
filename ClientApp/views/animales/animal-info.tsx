import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import DietasList from "../dietas/dieta-list";
import TratamientosList from "../tratamientos/tratamiento-list";

const AnimalInfo = () => {
  const { projectId } = useParams();
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
        <TabPanel header="Dietas" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <DietasList />
          </div>
        </TabPanel>

        <TabPanel header="Tratamientos" contentClassName="h-full overflow-hidden">
          <div className="h-full overflow-hidden">
            <TratamientosList />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AnimalInfo;