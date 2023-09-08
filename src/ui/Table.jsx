/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Compound Component Pattern in Table: So basically, right now, this table is really not reusable, like we have, for example, like, these grid columns hardcoded right in the header, and I guess also in the row. So, but we just closed. So here we have the exact same columns again, so in both places and they are really this hardcoded. So this is going to make it really hard to reuse this table for something else. For example, for the bookings. So instead of having this table here, instead it would be really nice to simply pass the column definition like this one into the table, and then all of the rows in there, and also the header would automatically get access to the size of the columns. So how could we do something like this? Well, we can actually once again use a compound component.

// Let's go there, and so indeed, here is where the grid template rows are defined, and so they will come from props.columns. So it's going to be that string that we pass here, so we pass this into the table, then that table receives it as the prop and passes it into the context, so then all the child elements can read that value from the context and then pass it into their styled component. Okay, so hopefully that makes sense.

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader $columns={columns} role="row" as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow $columns={columns} role="row">
      {children}
    </StyledRow>
  );
}

// Render Prop Pattern
function Body({ data, render }) {

  if(!data.length) return <Empty>No data to show at the moment</Empty>

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
