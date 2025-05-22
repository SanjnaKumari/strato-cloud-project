import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock fetch API before test
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'User A', createdAt: '2022-01-01', passwordChanged: '2023-01-01', lastAccess: '2023-12-01', mfaEnabled: 'Yes' },
          { name: 'User B', createdAt: '2021-01-01', passwordChanged: '2021-05-01', lastAccess: '2024-01-01', mfaEnabled: 'No' },
        ]),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe('App', () => {
  it('filters users correctly by MFA status', async () => {
    render(<App />);

    // Wait for data to load
    expect(await screen.findByText('User A')).toBeInTheDocument();
    expect(await screen.findByText('User B')).toBeInTheDocument();

    // Select 'Yes' from the dropdown
    fireEvent.change(screen.getByLabelText(/filter by mfa/i), {
      target: { value: 'Yes' },
    });

    // Should only show User A now
    expect(screen.getByText('User A')).toBeInTheDocument();
    expect(screen.queryByText('User B')).not.toBeInTheDocument();
  });
});


