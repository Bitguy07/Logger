import axios from 'axios';
import LoggerLogo from '../assets/Logo.png';
const origin =  window.location.hostname === "localhost"
                ? import.meta.env.VITE_API_LOCAL
                : import.meta.env.VITE_API_PROD;

//Loads the Razorpay checkout script if not already loaded 
function loadRazorpayScript() {
    return new Promise ((resolve, reject) => {
        if(window.Razorpay){
            return resolve();
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
    });
}

export async function finalPaymentStep(amountInPaise, payerName, payerMobileNo){
    // console.log('Final Payment Step called:', amountInPaise, payerName, payerMobileNo);
    try {
            // 1. Load the Razorpay Script
            await loadRazorpayScript();
            // 2. Create a temporary Razorpay instance to fetch the methods
            const temp = new window.Razorpay({key: import.meta.env.VITE_RAZORPAY_KEY_ID});
            const {methods} = await new Promise ((resolve, reject) => {
                temp.once('ready', resolve);
            });
            
            if(!methods || !methods.upi){
                alert('UPI method is not available. Please try again later.');
                return;
            }

            // 3. Create an order on your backend
            const orderResp = await axios.post(`${origin}/transection/create-order`, {amount: amountInPaise * 100});
            const order = orderResp.data;
            console.log('Order created <-> _ <->:', order);
            // 4. Configure the checkout options
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Logger',
                description: 'Purchase Plan',
                image: LoggerLogo,  // show logo in popup
                order_id: order.id,
                notes:       { payerName, payerMobileNo },
                method:      { upi: true, card: false, netbanking: false, wallet: false },
                handler: async (response) => {
                    // 5. Verify the payment signature on your backend
                    const verifyResp = await axios.post(`${origin}/transection/verify-payment`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });
                    if(verifyResp.data.Status === 'success'){
                        alert('Payment Successful!');
                    } else {
                        alert('Payment Verification Failed!');
                    }
                },
                prefill: {
                    name: payerName,
                    contact: payerMobileNo
                },
                theme: {
                    color: '#F37254'
                }

            }

            // 5. Open Razorpay checkout which deep-links to UPI apps on mobile
            const rzp  = new window.Razorpay(options);
            rzp.open();
    } catch (error) {
        console.error('Payment init error:', error);
        alert('❌ Unable to initiate payment. Please try again later.');
    }
}