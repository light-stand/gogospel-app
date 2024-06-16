import React from 'react';
import { render } from '@testing-library/react-native';

import Text from './Text';

describe('Text Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Text>Hello, Jest!</Text>);
    const textElement = getByText('Hello, Jest!');
    expect(textElement).toBeDefined();
  });
  /* 
  it('applies the correct size style', () => {
    const { getByText } = render(
      <Text size="h3">This is a text with h3 size</Text>,
    );
    const textElement = getByText('This is a text with h3 size');
    expect(textElement.props.style).toContainEqual({ fontSize: 20 });
  });

  it('applies the bold style when bold prop is true', () => {
    const { getByText } = render(<Text bold>This is a bold text</Text>);
    const textElement = getByText('This is a bold text');
    expect(textElement.props.style).toContainEqual({ fontWeight: 'bold' });
  });

  it('applies the custom color style', () => {
    const { getByText } = render(
      <Text color="red">This is a text with red color</Text>,
    );
    const textElement = getByText('This is a text with red color');
    expect(textElement.props.style).toContainEqual({ color: 'red' });
  }); */

  // Add more test cases as needed
});
