import React, { Suspense } from "react";
import { LoadingAnimate } from "#components";

const RouterLazy = React.lazy(
  () => import("../../contexts/router-context/router-context"),
);

interface SuspenseRouterProps {
  onLoad: () => void;
}

const SuspenseRouter = ({ onLoad }: SuspenseRouterProps) => {
  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  const renderLoading = React.useCallback(
    () => (
      <LoadingAnimate
        imgAlt="Loading"
        imgSrc="https://cms.nubeteck.com/uploads/Logo_6340ceb1de.webp"
      />
    ),
    [],
  );

  return (
    <Suspense fallback={renderLoading()}>
      <RouterLazy />
    </Suspense>
  );
};

export default SuspenseRouter;
