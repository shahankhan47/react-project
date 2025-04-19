import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const navigate = useNavigate();

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{booking?.id}</Heading>
                    <Tag type={statusToTagName[booking?.status]}>
                        {booking?.status?.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {booking?.status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${booking?.id}`)}>
                        Check In
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        disabled={isCheckingOut}
                        onClick={() => {
                            checkout(booking?.id);
                        }}
                    >
                        Check out
                    </Button>
                )}
                <Modal>
                    <Modal.Open opens="deleteBooking">
                        <Button variation="danger">Delete Booking</Button>
                    </Modal.Open>
                    <Modal.Window name="deleteBooking">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={() =>
                                deleteBooking(booking?.id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                            disabled={isDeleting}
                        ></ConfirmDelete>
                    </Modal.Window>
                </Modal>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
