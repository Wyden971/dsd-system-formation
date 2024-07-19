import * as React from "react";
import renderer from "react-test-renderer";
//import { render, screen, userEvent } from '@testing-library/react-native';
import { ThemedText } from "../ThemedText";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedText>Snapshot test!</ThemedText>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
