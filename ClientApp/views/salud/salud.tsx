import React from "react";
import { AppQueryHooks } from "#hooks";
import { renderTooltip } from "#utils";
import { Icon } from "@nubeteck/icons";
import { Reducers, Constants } from "#core";
import { EventUtils } from "@nubeteck/utils";
import { useParams } from "react-router-dom";
import { useAuth, TaskFilterProvider } from "#contexts";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import {
  
  CollaboratorDialog,
  TaskFilterControls,
} from "#components";

import { Tasks } from "../tasks";
import { IdeasView } from "../ideas";

interface IIconAddCollaboratorProps {
  projectId: number;
  collaboratorDispatch: React.Dispatch<Reducers.DialogAction>;
}

const ProjectDetails = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { id: projectId } = useParams();
  const { hasRoles } = useAuth();
  const canAddCollaborator = hasRoles([
    Constants.Roles.ADMIN,
    Constants.Roles.PROJECT_MANAGER,
  ]);
  const project = AppQueryHooks.useFetchOneProject(Number(projectId ?? 0));
  const Archivos = AppQueryHooks.useFetchUserDocuments();
  const { isPending, data: currentCollaborators } =
    AppQueryHooks.useFetchProjectCurrentColaborators(Number(projectId ?? 0));
  const [collaboratorState, collaboratorDispatch] = React.useReducer(
    Reducers.DialogsReducer,
    {
      id: 0,
      visible: false,
    },
  );

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <TaskFilterProvider>
      <div className="relative" style={{ height: "calc(100% - 4rem)" }}>
        {canAddCollaborator && (
          <IconAddCollaborator
            projectId={Number(projectId ?? 0)}
            collaboratorDispatch={collaboratorDispatch}
          />
        )}
        {activeIndex === 1 && (
          <div
            style={{ top: 7, gap: 13, right: 73 }}
            className="absolute z-1 flex align-items-center"
          >
            <TaskFilterControls
              isPending={isPending}
              currentCollaborators={currentCollaborators}
            />
          </div>
        )}
        <TabView
          className="h-full"
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          panelContainerClassName="p-0 h-full w-full"
        >
          <TabPanel
            contentClassName="overflow-auto h-full"
            header={<span className="px-2">💡Ideas</span>}
          >
            <IdeasView />
          </TabPanel>
          <TabPanel
            contentClassName="overflow-auto h-full"
            header={<span className="px-2">📌 Tareas</span>}
          >
            <Tasks projectId={Number(projectId ?? 0)} />
          </TabPanel>
          <TabPanel header="📄 Detalle" contentClassName="overflow-auto h-full">
            <ProjectDetail project={project.data} />
          </TabPanel>
          <TabPanel
            header="💱 Finanzas"
            contentClassName="overflow-auto h-full"
          >
            <ProjectFinance
              documentos={{ proyecto: project.data, archivos: Archivos.data }}
            ></ProjectFinance>
          </TabPanel>
        </TabView>
        <CollaboratorDialog
          id={Number(projectId ?? 0)}
          visible={!!collaboratorState.visible}
          onHide={EventUtils.callEvent(collaboratorDispatch, {
            type: "CLOSE_DIALOG",
          })}
        />
      </div>
    </TaskFilterProvider>
  );
};

const IconAddCollaborator = ({
  projectId,
  collaboratorDispatch,
}: IIconAddCollaboratorProps) => (
  <>
    {renderTooltip("Agregar colaboradores", "users-plus", "left")}
    <Icon
      size={28}
      name="user-plus"
      style={{ top: 14, right: 32 }}
      className="absolute z-1 users-plus text-gray-600"
      onClick={EventUtils.callEvent(collaboratorDispatch, {
        type: "OPEN_DIALOG",
        payload: Number(projectId ?? 0),
      })}
    />
  </>
);

export default ProjectDetails;
