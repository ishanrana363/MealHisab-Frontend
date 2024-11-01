import Swal from "sweetalert2";

export const createAlert = async () => {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't to sure registration!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to registration!"
    })
};



// .then((result) => {
//     if (result.isConfirmed) {
//         Swal.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success"
//         });
//     }
// });



