/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import useUrl from "../hooks/useUrl";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const {getUrl, updateUrl} = useUrl(filterField, options.at(0).value);
  const currentFilter = getUrl();

  function handleClick(value) {
    // So the way this works is that we first actually need to set the state on search params itself, like this. Then here the first value is the name of the state. So of the field in the URL. And so that's gonna be called discount. And then second is the value itself. And so that's the one that we are receiving in the function. And so that can be either the discount set to all, to no discount, or to with discount. And so then we can take this new search params, and pass it into search or into set search params.
    // searchParams.set(filterField, value);
    // setSearchParams(searchParams);
    // console.log(searchParams);
    updateUrl(value);

  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
