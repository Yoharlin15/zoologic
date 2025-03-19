import React from "react";

export const RadioGroupContainer = ({ children }: React.PropsWithChildren) => (
  <div className="card flex">
    <div className="flex flex-wrap gap-3">{children}</div>
  </div>
);
