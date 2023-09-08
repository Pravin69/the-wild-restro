import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new Cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

// Compound Component Pattern : So let's convert the first version of the modal component that we just built to a compound component. And the reason why that is necessary is that this modal that we have built is really not ideal when it comes to the state management and to the way in which we actually render this modal. So remember how we render the modal right here based on this isOpenModal state. Now the problem with this is that we really do not want the component who uses the modal to be responsible for creating this piece of state and to keep track of whether the modal is open or not. So again, it shouldn't be the task of the AddCabin component here to track whether right now the modal should be displayed or not. So instead, the modal component itself should actually know whether it is currently open or not, and so it should keep this state internally. So it should track this basically encapsulated inside the component. And then the component should give us simply a way to open the modal and also a way to pass in the content that we actually want to display inside the modal. So basically we want some button to open the modal, and we want the window itself. So these two components together should form the modal component. And if this sounds a lot like the compound component pattern, that is because, in fact, a compound component is perfect for a situation like this.

// So now we have no more state needed here inside this AddCabin component. And instead we will keep that state whether the window is open or not right inside the modal. Now just one more thing, which is that we actually want to allow multiple windows. So let's say, for example, we also want one to show a table. So we can then do this. So we have another button to open and another window. So we want the user of the modal component to be able to do this, so basically having multiple modal windows. However, of course, only one of them can be open at the same time. And so therefore each of these buttons needs to know which window it should actually open. And so therefore here, let's pass an prop called opens. And let's say this one opens the cabin form. And so then we simply give this window here exactly this name. So this was just to show you that we can have multiple windows inside the same modal component. And so since we have that additional flexibility, then we need to give each window a name. And then we associate each open component here to that name now. All right, and as we also just mentioned, then the modal basically needs to keep track which one is currently open.

function AddCabin() {
  return (
    <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
    </div>
  );
}

export default AddCabin;
