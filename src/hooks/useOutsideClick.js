import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  // Detecting Clicks outside Window : So basically, what I mean is that when this is open, and then when we click out here, that modal window should close, which is a pretty common pattern in websites and applications. So of course, right now, as I click here, that doesn't happen, and so what we want to do now, again, is to detect whenever a click happens outside of the modal window or one of its children, so basically, in this case, out here.

  // All right, so let's come here to our window, and then add some global event listeners for a click event. So now, we will basically go back, so to say, to some more primitive DOM manipulation. So we need to do that inside a useEffect, right? And so let's specify our effect function, and as always, our dependency array. So again, here, we will now attach right to the document an event listener for any click events, and then here, we will have a handleClick callback function, and it needs to be in this external function, because we also need to remove this. So handleClick, which will receive the click event, and so as I was saying earlier, we also now need to remove this event listener as the component unmounts, and so for that, remember, we need to return a callback function, so we return document.removeEventListener, .click, and then that same handleClick.

  // So basically, whenever the click event that we are handling here happens outside of this element right here, so outside of this StyledModal, so let's then manually select this element using a ref. So const ref will come from the useRef hook just like this, and now, we can add that here with the ref prop, and then we can use this selected element right here in our handler. So first of all, we need to check if that ref even exists, so for that, we can check ref.current, which is basically where the DOM node that references this element here will be stored. So if that exists, and now, comes basically the heart, or the solution of this whole thing. So I will just write it, and then I will explain it. So if the ref.current, so again, that's this window right there, so if that does not contain the element that was clicked, so e.target, then in that case, close the modal.

  // So remember that ref.current is now this element right here, so this white modal window. So it's a DOM element right now, and on DOM elements, we can call the contain methods, which will basically return true whenever this element right here contains the element that we pass in, and so in this case, the element we pass in is e.target, which is simply the element where the click happened. So if the click happens on one of these elements right here, then that, of course, is inside the modal, and so then this whole thing here becomes false, and then nothing happens, but if a click happens out here, then that is no longer contained here in the ref, and so then this function here should get called.

  //   So we get click outside, but the window doesn't show up, so what strange thing is happening here? Well, the reason for this is actually the way that events work in JavaScript, and in particular, the fact that events bubble up. So whenever I click here on this button, the modal window will be attached to the DOM, right? And it will be attached right here as a direct child of the body, and so if I click on the button, that event will bubble up all the way through the DOM until it also reaches that modal window, and so then the click is basically detected outside the modal window, which will immediately close that window again, so our logic is actually working just fine. So again, when we click here, the modal window basically gets opened for a millisecond, but then it immediately detects a click outside of it, and so then it will immediately close again, and so the way that we fix this is to not listen for these events on the bubbling phase, but on the capturing phase, so basically, as the event moves down the DOM tree and not up the DOM tree but in any case, we can change this default behavior by here, passing in a third argument, which is simply to set this to true. And so if we use true here, then again, the event will actually be handled in the capturing phase, so as the event moves down the tree.
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
        //   console.log("click outside");
          handler?.();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
