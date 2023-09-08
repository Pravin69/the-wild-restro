/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Compund Component Pattern for Menu: So what we want to do here is to give each of these cabin rows a button here that we can click. And then when we click that button, a small context menu appears, which ultimately will contain these three actions here, so duplicating, editing, and deleting. Now what's special about these menus is that only one of them can be open at the same time, which means that we need to wrap the entire table here into that menus component that we are going to build. And then inside each of the rows, we will have a menu child component. All right.

// So, a menu, as you have seen many times on the web already, is always composed of a button. And so then when you click on that toggle button, a list will open, and then that list itself is composed of many buttons. So let's do that. So we will have a Menus.Toggle, which we can use to open and close this menu right here. And then we will have a Menu.List, which will then contain a bunch of buttons. So, Menu.Button. So basically each of them will be one list element of the list.

// Now, just like before with the modal, we will have many of these menus on the page and therefore many toggles and many lists. And so therefore, we will have to connect this toggle with this list again so that we know that this exact toggle should then open up this list. So previously we used the name and the opens prop, but here let's make it a bit more simple and simply use an ID.

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {

    e.stopPropagation();

    // Now this position of the list needs to be calculated as soon as this button here is clicked. And so let's do that right here in handleClick. So first off, here let's receive the event that has been fired off, so that click event. And so then on that, we can do e.target, and then we want to get the closest button, so just to make sure that we really get the position of the button and not of the SVG icon here. So this then basically does some DOM traversing, finding the closest button parent. And then here we can then call another DOM function, which is getBoundingClientRect. It's a weird name, but basically what this will do is to give us some data about the element's position.
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    // And so here is where we will then decide whether we want to open or to close the menu, or actually the list. All right, and so here, let's now do the check. So if the openId is empty, meaning that there is no ID, or if the openId, so basically if the currently open menu is different from the ID of this exact button that is being clicked, then let's open the menu. And we do this by passing in the ID of exactly this button because this button is connected to that menu by this ID. And otherwise we just close the menu. So again, if right now none of the menus is open, which is what we have right here, so then open this one, so the one with the ID that has been clicked. Or also if there is currently an open menu already, but it's different than the one that's being clicked, then we also want to open this one, so the one that has been clicked. But in all other cases, then we just want to close it. So that other case is basically whenever the openId is equal to this id, or in other words, whenever the menu is already open. So if we then click again, we close that, and this will all make sense once we see this here actually working.
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close,false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
