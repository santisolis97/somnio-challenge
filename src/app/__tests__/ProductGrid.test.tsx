import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGrid } from '../_components/ProductGrid';
import { useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../_components/ProductCard', () => ({
  __esModule: true,
  default: ({ product }: { product: { title: string } }) => (
    <div>{product.title}</div>
  ),
}));

describe('ProductGrid', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', description: 'Description 1' },
    { id: 2, title: 'Product 2', description: 'Description 2' },
    { id: 3, title: 'Product 3', description: 'Description 3' },
    { id: 4, title: 'Product 4', description: 'Description 4' },
  ];

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(''),
    });
  });

  it('renders products correctly', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.queryByText('Product 4')).not.toBeInTheDocument();
  });

  it('loads more products when "VER MAS" button is clicked', () => {
    render(<ProductGrid products={mockProducts} />);
    const loadMoreButton = screen.getByText('VER MAS');
    fireEvent.click(loadMoreButton);
    expect(screen.getByText('Product 4')).toBeInTheDocument();
  });

  it('filters products based on search query', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('Product 2'),
    });

    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('shows a message when no products are found', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('Nonexistent'),
    });

    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
  });
});
