/* eslint-disable react/prop-types */
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// React Portal : But yeah, as I was saying, let's now improve this here using something called a React portal. So a React portal is a feature that essentially allows us to render an element outside of the parent component's DOM structure while still keeping the element in the original position of the component tree. So in other words, with a portal we can basically render a component in any place that we want inside the DOM tree but still leave the component at the same place in the React component tree. And so then things like props keep working normally. And so this is great and generally used for all elements that we want to stay on top of other elements. So things like modal windows, tool tips, menus and so on. And since we are building a modal right now I thought it was a good idea to show you this feature.

// So let me quickly show you how. So it's actually really easy. So instead of just returning this JSX here we return the results of calling createPortal. So, createPortal. And this one is actually not part of React but of React DOM, which actually makes sense because this really is about placing some JSX in the DOM. Now then this function here receives as the first argument the JSX that we want to render. And then as the second argument, a DOM note where we want to render this JSX. And so let's just do this in the document body. And so that we can select simply by writing document.body. All right. But it could of course be also any other element as well and we could select it, for example, using document.querySelector or any other way. But anyway, let's now go back to just attaching this to the document body, even though some developers say that this is not ideal, but actually it does work just fine.

// So let's just reload here, then let's open the form. And now notice how the modal window is actually a direct child element of the body element. And so that's because we selected that body right here. And so the reason for that is that here we selected that body element to be the parent element of whatever we want to render. All right. And so this now essentially lives completely outside of the DOM structure of the application itself, which lives right here inside this root div. Now, what's nice about this, as I was saying, is that inside the component tree the modal is still at the exact same place. And so that's why we can still pass all the props into it that we want. So it's still a child element here off AddCabin even though in the DOM it no longer is. So this portal basically is called a portal because it allows us to create an invisible tunnel, so like a portal, from the place where the component is in the component tree to another place in the DOM tree.

// But now you might be wondering, this worked really great already in the beginning with just regular CSS positioning, so without the portal. And so why do we even need to use this portal? Well, the main reason why a portal becomes necessary is in order to avoid conflicts with the CSS property overflow set to hidden. So many times we build a component like a modal and it works just fine, but then some other developer will reuse it somewhere else and that somewhere else might be a place where the modal will get cut off by a overflow hidden set on the parent. So this is basically all about reusability and making sure that the component will never be cut off by an overflow property set to hidden on some parent element. So in order to avoid this kind of situation we simply render the modal completely outside of the rest of the DOM. So basically on top of the DOM tree as we just did here. All right, so hopefully this made sense. And with this, we finished our first version of the modal.

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
