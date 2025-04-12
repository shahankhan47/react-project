import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

// // Before converting to compound component
// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal((show) => !show)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={setIsOpenModal}>
//                     <CreateCabinForm />
//                 </Modal>
//             )}
//         </div>
//     );
// }

// Compound component implementation
function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>

                {/* User can be able to pass multiple modals at a time inside the modal but only one of them will be 
            actually open. So modal needs to know for which feature it has been opened e.g. cabin-form/table/etc */}
                {/* <Modal.Open opens="table">
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window> */}
            </Modal>
        </div>
    );
}
export default AddCabin;
