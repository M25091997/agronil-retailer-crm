import { Link } from "@inertiajs/react";

export default function FormSubmitButton({ isEditMode, cancelUrl }) {
    return (
        <>
            <button type="submit" name="submitButton"
                className="btn btn-success waves-effect waves-light mt-5 mb-3"> {isEditMode ? 'Update' : 'Create'} </button>
            <Link href={cancelUrl}> <button type="button" name="submitButton"
                className="btn btn-danger waves-effect waves-light mt-5 mb-3"> Cancel</button>
            </Link>
        </>
    )
}