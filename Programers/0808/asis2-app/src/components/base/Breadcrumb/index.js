import styled from "@emotion/styled";
import { element } from "prop-types";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";

// Breadcrumb 컴포넌트는 파일의 위치를 알려주는 컴포넌트이다.

const BreadcrumbContainer = styled.div`
  display: inline-block;
`;

const Breadcrumb = ({ children, ...props }) => {
  const items = React.Children.toArray(children)
    .filter((element) => {
      if (
        React.isValidElement(element) &&
        element.props.__TYPE === "BreadcrumbItem"
      ) {
        return true;
      }

      console.warn("Only accepts Breadcrumb.Item as it's children.");
      return false;
    })
    .map((element, index, elements) => {
      return React.cloneElement(element, {
        ...element.props,
        active: index === elements.length - 1,
      });
    });

  return <BreadcrumbContainer>{items}</BreadcrumbContainer>;
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
