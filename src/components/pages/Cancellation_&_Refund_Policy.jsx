import React from 'react'

const cancellationRefundPolicy = [
    {
        id: 1,
        heading: "General Terms",
        text: "This Cancellation & Refund Policy outlines the terms and conditions regarding transactions made through our web application using the Razorpay payment gateway. By using our services, you agree to this policy.",
        list: null
    },
    {
        id: 2,
        heading: "Transaction Responsibility",
        text: null,
        list: [
            {
                subheading: null,
                text: "All transactions on our platform are processed securely via Razorpay."
            },
            {
                subheading: null,
                text: "We do not take any responsibility for failed transactions, technical errors, or issues related to payment processing."
            },
            {
                subheading: null,
                text: "If a transaction is credited but not debited, or any other transaction-related issue occurs, we shall not be held liable."
            }
        ]
    },
    {
        id: 3,
        heading: "Cancellation Policy",
        text: null,
        list: [
            {
                subheading: null,
                text: "Once a transaction is successfully processed, it cannot be canceled."
            },
            {
                subheading: null,
                text: "Users are advised to carefully review transaction details before making payments."
            },
            {
                subheading: null,
                text: "Any cancellation request must be raised with Razorpay as per their policies."
            }
        ]
    },
    {
        id: 4,
        heading: "Refund Policy",
        text: null,
        list: [
            {
                subheading: null,
                text: "We do not entertain any refund requests directly."
            },
            {
                subheading: null,
                text: "Refunds, if applicable, will be handled solely by Razorpay as per their policies."
            },
            {
                subheading: null,
                text: "If Razorpay resolves an issue in favor of a refund, we will assist in the process if possible, but we hold no responsibility for the outcome."
            }
        ]
    },
    {
        id: 5,
        heading: "Technical Errors & Payment Failures",
        text: null,
        list: [
            {
                subheading: null,
                text: "If a payment fails due to technical reasons, users must contact Razorpay support for resolution."
            },
            {
                subheading: null,
                text: "We are not responsible for duplicate transactions, incorrect amounts, or any issues arising from the user’s end."
            }
        ]
    },
    {
        id: 6,
        heading: "Dispute Resolution",
        text: null,
        list: [
            {
                subheading: null,
                text: "Any disputes regarding payments must be directed to Razorpay."
            },
            {
                subheading: null,
                text: "We do not have control over refund approvals or chargeback processes."
            }
        ]
    },
    {
        id: 7,
        heading: "Contact & Support",
        text: null,
        list: [
            {
                subheading: null,
                text: "For any concerns, users may contact our support team for guidance."
            },
            {
                subheading: null,
                text: "However, our assistance will be limited to providing relevant information and directing users to Razorpay support."
            }
        ]
    },
    {
        id: null,
        heading: null,
        text: "By using our services, you acknowledge that you have read, understood, and agreed to this Cancellation & Refund Policy.",
        list: null
    }
];
  
const CancellationRefunPolicy = () => {
    return (
        <div className='w-full bg-[#C6ECCF] flext items-center line-height overflow-y-auto h-full  justify-center'>
          <div className='mb-10 mt-11 mx-5 sm:mx-40 md:mx-60 '>
            <h1 className='sm:text-center font-bold text-left text-xl text-glow sm:text-3xl pb-2 sm:pb-10 border-b-2 border-black'>Cancellation & Refund Policy</h1>
            {cancellationRefundPolicy.map((section, index) => (
            <div key={section.id} className="mb-8">
              <p className={`font-bold text-xl ${index === 0 ? 'mt-10' : 'mt-7'}`}>
                <span className='font-medium'>{section.id}</span>{section.id !== null ? '.' : ''} {section.heading}
              </p>
              {section?.text && (
                <p className="text-[#565656] mt-4 font-normal">{section.text}</p>
              )}
              {section.list && (
                <ul className="text-[#565656] list-disc">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="ml-7 mt-3">
                      <span className="font-medium text-lg text-black">
                        {item?.subheading}
                      </span>{' '}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          </div>
        </div>
      )
}

export default CancellationRefunPolicy;