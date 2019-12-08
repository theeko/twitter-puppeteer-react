import React from "react";
import { Layout, BackTop } from "antd";
import { animated, useTransition } from "react-spring";
import usePrevious from "../../helpers/usePrevious";
import { useLocation, Switch, Route } from "react-router-dom";

import About from "../About/About";
import Home from "../Home/Home";

export default function Content() {
  const location = useLocation();
  const paths = ["/", "/profile", "/about"];
  const prevPath = usePrevious(location.pathname);

  const transitions = useTransition(location, location => location.pathname, {
    from: item => {
      console.log("transition from", item);
      if (!prevPath)
        return {
          opacity: 0,
          transform: "translate3d(0,0,0)",
          position: "absolute",
          width: "100%"
        };
      let currentPath = item.pathname;
      let isRight = paths.indexOf(currentPath) > paths.indexOf(prevPath);
      const styles = isRight
        ? { opacity: 0, transform: "translate3d(100%,0,0)" }
        : { opacity: 0, transform: "translate3d(-100%,0,0)" };
      return Object.assign({}, styles, { position: "absolute", width: "100%" });
    },
    enter: () => {
      console.log("transition enter");
      return { opacity: 1, transform: "translate3d(0,0,0)" };
    },
    leave: item => {
      let previousPath = item.pathname;
      // if previousPath index is lower, we should go to left
      let isLeft =
        paths.indexOf(previousPath) < paths.indexOf(location.pathname);
      const styles = isLeft
        ? { opacity: 0, transform: "translate3d(-100%,0,0)" }
        : { opacity: 0, transform: "translate3d(100%,0,0)" };
      console.log("leave styles", styles);
      console.log(
        `prevPath ${prevPath}, previousPath ${previousPath}, currentPath ${location.pathname}`
      );
      return styles;
    }
  });

  return (
    <Layout.Content className="content">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div style={props} key={key} className="app">
            <Switch location={item}>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </animated.div>
        );
      })}
      <BackTop visibilityHeight={300} />
    </Layout.Content>
  );
}
