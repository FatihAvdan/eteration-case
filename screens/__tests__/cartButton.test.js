import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CartButton from '../components/CartButton';

describe('CartButton', () => {
  const product = {
    id: '1',
    name: 'Product 1',
    price: '10.99',
  };

  it('renders correctly when quantity is 0', () => {
    const {getByText} = render(<CartButton product={product} />);
    const addButton = getByText('Add to Cart');
    expect(addButton).toBeTruthy();
  });

  it('renders correctly when quantity is greater than 0', () => {
    const {getByText} = render(
      <CartButton product={{...product, quantity: 2}} />,
    );
    const minusButton = getByText('-');
    const quantityText = getByText('2');
    const plusButton = getByText('+');
    expect(minusButton).toBeTruthy();
    expect(quantityText).toBeTruthy();
    expect(plusButton).toBeTruthy();
  });
});
