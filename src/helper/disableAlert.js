import Swal from "sweetalert2";

export function disableAlert() {
    return Swal.fire({
        title: "Are you sure?",
        text: "Are you sure active user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, active!",
    })
}