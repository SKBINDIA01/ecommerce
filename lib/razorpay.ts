import Razorpay from 'razorpay';

// Initialize Razorpay with API credentials
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Create a new Razorpay order
export const createRazorpayOrder = async (amount: number, orderId: string) => {
  try {
    // Amount in paise (100 paise = 1 INR)
    const amountInPaise = Math.round(amount * 100);
    
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: orderId,
      notes: {
        orderId
      },
      // Enable payment methods including UPI
      payment_capture: 1,
    };
    
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Verify Razorpay payment signature
export const verifyPaymentSignature = (
  razorpayOrderId: string, 
  razorpayPaymentId: string, 
  signature: string
) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    const crypto = require('crypto');
    
    // Create an HMAC SHA256 hash using the secret
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    
    // Compare the generated signature with the one received from Razorpay
    return generatedSignature === signature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
};

// Create payment preferences for UPI
export const createPaymentPreferences = (
  customerName: string,
  customerEmail: string,
  customerPhone?: string
) => {
  return {
    // Default prefill data for customer
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone || '',
    },
    // Enable specific payment methods 
    config: {
      display: {
        blocks: {
          upi: {
            // Show UPI payment option
            name: 'Pay via UPI',
            instruments: [
              {
                method: 'upi',
                apps: ['google_pay', 'phonepe', 'paytm', 'bhim', 'other'],
                flow: 'intent'
              }
            ]
          },
          card: {
            name: 'Pay via Card',
            instruments: [
              {
                method: 'card'
              }
            ]
          },
          netbanking: {
            name: 'Pay via Netbanking',
            instruments: [
              {
                method: 'netbanking'
              }
            ]
          }
        },
        sequence: ['block.upi', 'block.card', 'block.netbanking'],
        preferences: {
          show_default_blocks: false
        }
      }
    },
    // Limit payment methods
    handler: {
      notifyMerchant: function(eventName: string, data: any) {
        console.log('Merchant notified about:', eventName, data);
      }
    },
    // Theme customization
    theme: {
      color: '#3399cc'
    }
  };
};
