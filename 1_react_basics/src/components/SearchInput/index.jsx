import './styles.css';

export const SearchInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className='search-input'
      type="search"
      value={searchValue}
      onChange={handleChange}
      placeholder='Type your search'
    />
  );
};