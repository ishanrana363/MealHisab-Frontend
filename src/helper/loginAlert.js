import Swal from "sweetalert2";

export function loginAlert() {
    return Swal.fire({
        title: "Are you sure?",
        text: "Are you sure login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to login!",
    })
}