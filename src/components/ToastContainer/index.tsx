import {
    Bounce,
    ToastContainer as ToastContainerComponent,
} from "react-toastify";

export const ToastContainer = () => {
    return (
        <ToastContainerComponent
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    );
};
