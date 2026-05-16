import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

const setup = () => {
  render(<App />);
  const input  = screen.getByLabelText(/enter a password/i);
  const toggle = screen.getByRole('button', { name: /show password/i });
  return { input, toggle };
};

describe('App rendering', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /password strength/i })).toBeInTheDocument();
  });

  it('renders the requirements heading as h2', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /password has/i })).toBeInTheDocument();
  });

  it('renders all five requirement list items', () => {
    render(<App />);
    expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 1 lowercase/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 1 uppercase/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 1 numerical/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 1 special/i)).toBeInTheDocument();
  });

  it('renders the password input masked by default', () => {
    const { input } = setup();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('no requirement items have the met class on initial render', () => {
    render(<App />);
    screen.getAllByRole('listitem').forEach((item) =>
      expect(item).not.toHaveClass('text-emerald-600')
    );
  });
});

describe('Show/Hide password toggle', () => {
  it('reveals the password when the eye button is clicked', async () => {
    const { input, toggle } = setup();
    await userEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('button aria-label changes to Hide password when password is shown', async () => {
    const { toggle } = setup();
    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('masks the password again on second click', async () => {
    const { input, toggle } = setup();
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('button aria-label reverts to Show password on second click', async () => {
    const { toggle } = setup();
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });
});

describe('Password requirement: 12 characters', () => {
  it('is not satisfied with 11 characters', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghij1');
    expect(screen.getByText(/at least 12 characters/i)).not.toHaveClass('text-emerald-600');
  });

  it('is satisfied with exactly 12 characters', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghijk1');
    expect(screen.getByText(/at least 12 characters/i)).toHaveClass('text-emerald-600');
  });

  it('is satisfied with more than 12 characters', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghijklmno');
    expect(screen.getByText(/at least 12 characters/i)).toHaveClass('text-emerald-600');
  });
});

describe('Password requirement: lowercase letter', () => {
  it('is not satisfied without a lowercase letter', async () => {
    const { input } = setup();
    await userEvent.type(input, 'ABCDEFGH1!');
    expect(screen.getByText(/at least 1 lowercase/i)).not.toHaveClass('text-emerald-600');
  });

  it('is satisfied with at least one lowercase letter', async () => {
    const { input } = setup();
    await userEvent.type(input, 'ABCDEFGHa1!');
    expect(screen.getByText(/at least 1 lowercase/i)).toHaveClass('text-emerald-600');
  });
});

describe('Password requirement: uppercase letter', () => {
  it('is not satisfied without an uppercase letter', async () => {
    const { input } = setup();
    await userEvent.type(input, 'abcdefgh1!');
    expect(screen.getByText(/at least 1 uppercase/i)).not.toHaveClass('text-emerald-600');
  });

  it('is satisfied with at least one uppercase letter', async () => {
    const { input } = setup();
    await userEvent.type(input, 'abcdefghA1!');
    expect(screen.getByText(/at least 1 uppercase/i)).toHaveClass('text-emerald-600');
  });
});

describe('Password requirement: digit', () => {
  it('is not satisfied without a digit', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghij!');
    expect(screen.getByText(/at least 1 numerical/i)).not.toHaveClass('text-emerald-600');
  });

  it('is satisfied with at least one digit', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghij1!');
    expect(screen.getByText(/at least 1 numerical/i)).toHaveClass('text-emerald-600');
  });
});

describe('Password requirement: special character', () => {
  it('is not satisfied without a special character', async () => {
    const { input } = setup();
    await userEvent.type(input, 'Abcdefghij1');
    expect(screen.getByText(/at least 1 special/i)).not.toHaveClass('text-emerald-600');
  });

  it.each(['!', '#', '$', '%', '^', '&', '+', '-', '?'])(
    'is satisfied with special character "%s"',
    async (char) => {
      const { input } = setup();
      await userEvent.type(input, `Abcdefghij1${char}`);
      expect(screen.getByText(/at least 1 special/i)).toHaveClass('text-emerald-600');
    }
  );
});

describe('Strength meter', () => {
  it('shows no label when no criteria are met', () => {
    render(<App />);
    expect(screen.queryByTestId('strength-label')).not.toBeInTheDocument();
  });

  it('shows Very Weak with one criterion met', async () => {
    const { input } = setup();
    await userEvent.type(input, 'a');
    expect(screen.getByTestId('strength-label')).toHaveTextContent('Very Weak');
  });

  it('shows Strong when all criteria are met', async () => {
    const { input } = setup();
    await userEvent.type(input, 'StrongPass1!abc');
    expect(screen.getByTestId('strength-label')).toHaveTextContent('Strong');
  });
});

describe('All requirements met', () => {
  it('turns all items green for a strong password', async () => {
    const { input } = setup();
    await userEvent.type(input, 'StrongPass1!abc');
    expect(screen.getByText(/at least 12 characters/i)).toHaveClass('text-emerald-600');
    expect(screen.getByText(/at least 1 lowercase/i)).toHaveClass('text-emerald-600');
    expect(screen.getByText(/at least 1 uppercase/i)).toHaveClass('text-emerald-600');
    expect(screen.getByText(/at least 1 numerical/i)).toHaveClass('text-emerald-600');
    expect(screen.getByText(/at least 1 special/i)).toHaveClass('text-emerald-600');
  });
});
