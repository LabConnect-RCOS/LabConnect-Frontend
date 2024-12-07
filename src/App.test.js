import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import CreatePost from './components/CreatePost';
import Staff from './components/Staff';
import Jobs from './components/Jobs';

// Testing the App component
describe('App Component', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders header correctly', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { name: /welcome to react app/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<App />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);
  });
});

// Testing the CreatePost component
describe('CreatePost Component', () => {
  test('renders form inputs', () => {
    render(<CreatePost />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  test('validates title input length', () => {
    render(<CreatePost />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    fireEvent.change(titleInput, { target: { value: 'Hi' } });
    const errorMessage = screen.getByText(/title must be at least 5 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<CreatePost />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a valid description.' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText(/post created successfully/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});

// Testing the Staff Component
describe('Staff Component', () => {
  test('renders staff list', () => {
    const mockStaff = [
      { id: '1', name: 'John Doe', role: 'Professor' },
      { id: '2', name: 'Jane Smith', role: 'Assistant' },
    ];
    render(<Staff staff={mockStaff} />);
    const staffItems = screen.getAllByRole('button');
    expect(staffItems.length).toBe(mockStaff.length);
  });

  test('filters staff by role', () => {
    const mockStaff = [
      { id: '1', name: 'John Doe', role: 'Professor' },
      { id: '2', name: 'Jane Smith', role: 'Assistant' },
    ];
    render(<Staff staff={mockStaff} />);
    const roleDropdown = screen.getByLabelText(/role/i);
    fireEvent.change(roleDropdown, { target: { value: 'Professor' } });

    const filteredStaff = screen.getAllByRole('button');
    expect(filteredStaff.length).toBe(1);
    expect(filteredStaff[0]).toHaveTextContent(/john doe/i);
  });
});

// Testing the Jobs Component
describe('Jobs Component', () => {
  test('renders job list', () => {
    const mockJobs = [
      { id: '1', title: 'Frontend Developer' },
      { id: '2', title: 'Backend Engineer' },
    ];
    render(<Jobs jobs={mockJobs} />);
    const jobItems = screen.getAllByText(/developer|engineer/i);
    expect(jobItems.length).toBe(mockJobs.length);
  });

  test('filters jobs by title', () => {
    const mockJobs = [
      { id: '1', title: 'Frontend Developer' },
      { id: '2', title: 'Backend Engineer' },
    ];
    render(<Jobs jobs={mockJobs} />);
    const searchInput = screen.getByPlaceholderText(/search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });

    const filteredJobs = screen.getAllByText(/frontend developer/i);
    expect(filteredJobs.length).toBe(1);
  });

  test('shows saved jobs only', () => {
    const mockJobs = [
      { id: '1', title: 'Frontend Developer', saved: true },
      { id: '2', title: 'Backend Engineer', saved: false },
    ];
    render(<Jobs jobs={mockJobs} />);
    const savedOnlyCheckbox = screen.getByLabelText(/show saved only/i);
    fireEvent.click(savedOnlyCheckbox);

    const savedJobs = screen.getAllByText(/frontend developer/i);
    expect(savedJobs.length).toBe(1);
  });
});

// Additional Utility Tests
describe('Utility Functions', () => {
  test('formats date correctly', () => {
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US');
    const formattedDate = formatDate('2024-07-01T12:00:00');
    expect(formattedDate).toBe('7/1/2024');
  });

  test('filters array by search term', () => {
    const filterArray = (arr, term) =>
      arr.filter((item) => item.toLowerCase().includes(term.toLowerCase()));
    const result = filterArray(['apple', 'banana', 'grape'], 'ap');
    expect(result).toEqual(['apple', 'grape']);
  });
});
