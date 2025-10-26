import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {AppRouter} from "./routes/AppRouter.jsx";

const stripePromise = loadStripe("pk_test_51SGhvJGdP7ffK66pndelvAVhMo5uL7qnkjrKNk2B59VSxrf7zqlDnJl212A6EbfAOGmu9CBUfPUyjimMX0xoAi4h00sfSqrVND");

function App() {
    return (
        <Elements stripe={stripePromise}>
            <AppRouter />
        </Elements>
    );
}


export default App;
