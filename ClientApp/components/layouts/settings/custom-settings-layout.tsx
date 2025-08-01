"use client"

import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "#core"
import { LayoutUtils } from "#utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SettingsLayout } from "."

const CustomMainLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const activeTabMap: Record<string, number> = React.useMemo(
    () => ({
      [Routes.ROLES_ROUTE]: 0,
      [Routes.ESTADOS_ROUTE]: 1,
      [Routes.CARGOS_ROUTE]: 2,
      [Routes.DEPARTAMENTOS_ROUTE]: 3,
      [Routes.ZONAS_ROUTE]: 4,
    }),
    [],
  )

  return (
    <SettingsLayout
      
      activeTabIndex={LayoutUtils.getTabIndexFromPathname(pathname, activeTabMap)}
      headerProps={{
        title: "Configuraciones generales del sistema",
      }}
      sideBarItems={[
        {
          icon: <FontAwesomeIcon icon="users" />,
          label: "Roles",
          onClick: () => navigate(`${Routes.ROLES_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="flag" />,
          label: "Estados",
          onClick: () => navigate(`${Routes.ESTADOS_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="briefcase" />,
          label: "Cargos",
          onClick: () => navigate(`${Routes.CARGOS_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="building" />,
          label: "Departamentos",
          onClick: () => navigate(`${Routes.DEPARTAMENTOS_ROUTE}`),
        },
        {
          icon: <FontAwesomeIcon icon="location-dot" />,
          label: "Zonas",
          onClick: () => navigate(`${Routes.ZONAS_ROUTE}`),
        },
      ]}
    >
      {children}
    </SettingsLayout>
  )
}

export default CustomMainLayout
