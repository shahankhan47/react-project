import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

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
        props.active === "true" &&
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

function Filter({ fiteredField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams?.get(fiteredField) || options[0]?.value;
    function handleClick(value) {
        searchParams.set(fiteredField, value);
        if (searchParams.get("page")) {
            searchParams.set("page", 1);
        }
        setSearchParams(searchParams);
    }
    return (
        <StyledFilter>
            {options?.map((option) => (
                <FilterButton
                    key={option?.value}
                    active={option?.value === currentFilter ? "true" : "false"}
                    disabled={option?.value === currentFilter}
                    onClick={() => {
                        handleClick(option?.value);
                    }}
                >
                    {option?.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}

export default Filter;
