import React, { useRef } from "react";
import * as d3 from "d3";

export const useD3 = (renderChartFn, dependencies) => {
  const ref = React.useRef();
  const componentJustMounted = useRef(true);
  React.useEffect(() => {
    console.log(componentJustMounted.current);
    if (!componentJustMounted.current) {
      renderChartFn(d3.select(ref.current));
    }
    componentJustMounted.current = false;
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return ref;
};
