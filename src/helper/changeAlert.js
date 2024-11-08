import Swal from "sweetalert2";

export const changeAlert = async () => {
    return Swal.fire({
        title: "Are you sure?",
        text: "You sure change password!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to change password!"
    })
};
