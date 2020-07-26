import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export type Pair<I, Y> = {
  first: I;
  second: Y;
};

export interface ISvgComponent extends XmlProps {
  fillAll?: string | null;
  replaceAttr?: Array<Pair<string, string>> | Pair<string, string> | null;
  xml: string;
}

export const SvgXmlComponent: React.FC<ISvgComponent> = ({
  replaceAttr,
  fillAll,
  xml,
  ...props
}) => {
  let fillXml = xml;
  if (fillAll) {
    fillXml = xml.replace(
      new RegExp(/fill="(?:[^"\\]+|\\.)*[^none]"/, "gum"),
      `fill=\"${fillAll}\"`
    );
  } else if (Array.isArray(replaceAttr)) {
    replaceAttr?.map((item) => {
      fillXml = fillXml.replace(new RegExp(item.first, "gum"), item.second);
    });
  } else if (
    typeof replaceAttr === "object" &&
    replaceAttr.hasOwnProperty("first") &&
    replaceAttr.hasOwnProperty("second")
  ) {
    fillXml = fillXml.replace(
      new RegExp(replaceAttr.first, "gum"),
      replaceAttr.second
    );
  }
  return <SvgXml {...props} xml={fillXml} />;
};
