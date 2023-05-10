import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Summary from '../pages/summary';

describe('Summary Page', () => {
  // Test if the Summary component is rendered and contains the text 'Purchases'
  test('renders Summary component', () => {
    render(<Summary />);
    expect(screen.getByText('Purchases')).toBeInTheDocument();
  });

  // Test if the tables are displayed by default
  test('displays tables by default', () => {
    render(<Summary />);
    expect(screen.getByText('Purchases')).toBeInTheDocument();
    expect(screen.getByText('Current Stock')).toBeInTheDocument();
    expect(screen.getByText('Waste Management')).toBeInTheDocument();
    expect(screen.getByText('Soon to Expire')).toBeInTheDocument();
  });

  // Test if the chart is hidden by default
  test('hides chart by default', () => {
    render(<Summary />);
    expect(screen.queryByText('Visualized Data')).not.toBeInTheDocument();
  });

  // Test if the chart is shown and the tables are hidden when the 'Chart' button is clicked
  test('shows chart and hides tables when chart button is clicked', () => {
    render(<Summary />);
    const chartButton = screen.getByText('Chart');
    fireEvent.click(chartButton);

    expect(screen.getByText('Visualized Data')).toBeInTheDocument();
    expect(screen.queryByText('Purchases')).not.toBeInTheDocument();
    expect(screen.queryByText('Current Stock')).not.toBeInTheDocument();
    expect(screen.queryByText('Waste Management')).not.toBeInTheDocument();
    expect(screen.queryByText('Soon to Expire')).not.toBeInTheDocument();
  });

  // Test if the tables are shown and the chart is hidden when the 'Table' button is clicked
  test('shows tables and hides chart when table button is clicked', () => {
    render(<Summary />);
    const chartButton = screen.getByText('Chart');
    fireEvent.click(chartButton);
    const tableButton = screen.getByText('Table');
    fireEvent.click(tableButton);

    expect(screen.getByText('Purchases')).toBeInTheDocument();
    expect(screen.getByText('Current Stock')).toBeInTheDocument();
    expect(screen.getByText('Waste Management')).toBeInTheDocument();
    expect(screen.getByText('Soon to Expire')).toBeInTheDocument();
    expect(screen.queryByText('Visualized Data')).not.toBeInTheDocument();
  });
});
