import React from 'react'

const messDetails = {
    "messOwners": {
      "title": "For Mess Owners:",
      "features": [
        {
          "title": "Menu and Pricing Management",
          "description": ["Easily set up menu details, including meal prices, subscription durations, and meal timings (morning, evening, and night)."]
        },
        {
          "title": "QR Code Generation",
          "description": ["A one-time, reusable QR code simplifies payment collection. Display the QR code prominently, and customers can make payments multiple times effortlessly."]
        },
        {
          "title": "Automated Record Creation",
          "description": ["Payments made by customers through Razorpay are automatically processed and matched to specific subscription plans based on the amount paid. This ensures accurate and real-time record-keeping."]
        },
        {
          "title": "Subscription Management",
          "description": [
            "Pause and resume subscriptions based on customer requests (e.g., if a student goes home temporarily).",
            "Automatic tracking and countdown of remaining subscription days, with notifications to both parties when subscriptions end.",
            "Handle special cases, such as unique subscription changes during Ramadan, with seamless adjustment to plans and balances."
          ]
        },
        {
          "title": "Manual Payment Handling",
          "description": ["Support for manual or physical payments with a dedicated page for record-keeping outside the in-app wallet system."]
        }
      ]
    },
    "customers": {
      "title": "For Customers:",
      "features": [
        {
          "title": "Flexible Subscription Plans",
          "description": [
            "Subscribe to meal plans based on your preference for days and meal timings.",
            "Pause and resume subscriptions at your convenience."
          ]
        },
        {
          "title": "Transparent Payment Records",
          "description": ["All payments are tracked, including detailed records of unpaid amounts or overpayments, which can be adjusted by the mess owner."]
        },
        {
          "title": "Notifications",
          "description": ["Stay informed about your subscription status, payments, and any changes made by the mess owner."]
        }
      ]
    },
    "keyFeatures": {
      "title": "Key Features:",
      "features": [
        {
          "title": "Payment Integration with Razorpay",
          "description": ["Payments are securely processed through Razorpay, with all transaction records stored in the app’s wallet. Note: In case of payment failures or delays caused by Razorpay, we are not liable."]
        },
        {
          "title": "Owner’s Wallet System",
          "description": ["Mess owners can withdraw funds from the in-app wallet after submitting authenticated details. Any errors in withdrawal due to incorrect information are the responsibility of the owner."]
        },
        {
          "title": "Subscription History and Edit Options",
          "description": ["Payments not matching specific subscriptions are logged in the history section, allowing owners to edit and reallocate records as needed."]
        },
        {
          "title": "RAMADAN Subscription Adjustments",
          "description": [
            "Automatic subscription pauses before Ramadan, with the option to resume based on the special meal plans for the month.",
            "Adjustments to balances and days are made automatically, ensuring accurate tracking of customer subscriptions."
          ]
        }
      ]
    },
    "termsConditions": {
      "title": "Terms and Conditions:",
      "features": [
        {
          "title": "Platform Charges",
          "description": ["Initially free, the platform may introduce a nominal fee after 1-2 months of operation."]
        },
        {
          "title": "Taxes and Gateway Charges",
          "description": ["GST and Razorpay transaction fees must be borne by the user."]
        },
        {
          "title": "Data Retention",
          "description": ["Customer and owner details will be retained for a specific period if the owner logs out without withdrawing funds, ensuring continuity upon re-login."]
        },
        {
          "title": "Liability Disclaimer",
          "description": [
            "We are not responsible for:",
            "Misunderstandings between owners and customers.",
            "Issues arising from Razorpay’s payment system.",
            "Errors caused by incorrect information submitted by the owner."
          ]
        }
      ]
    }
  };

const AboutUs = () => {
  return (
    <div className='h-full overflow-y-auto w-full line-height bg-[#EEC573]'>
        <div className='sm:mx-52 mx-4 sm:mb-20 mb-10 sm:mt-36 mt-16'>
            <h1 className='text-xl font-medium'>About US</h1>
            <p className=' mt-5 text-gray-700'>
                Welcome to our innovative Mess Management System, a comprehensive web 
                application designed to streamline the daily operations of mess and dining
                facilities, especially catering to students from schools and universities.
                We aim to provide a seamless and efficient platform for mess owners to manage
                their subscriptions, menus, payments, and customer records.
            </p>
            <h1 className='text-2xl mt-10 font-semibold'>What We Offer:</h1>
            {Object.entries(messDetails).map(([key, section]) => (
            <div key={key} className="mb-8 mt-5 border-b pb-4">
                <h2 className={`${["For Mess Owners:", "For Customers:"].includes(section.title) ? `text-lg font-bold` :`text-2xl font-semibold` } mb-4`}>{section.title}</h2>
                {section.features.map((feature, index) => (
                <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 "><span className='font-normal'>{index+1}</span>{'. '}<span className='mx-2'>{feature.title}</span></h3>
                {Array.isArray(feature.description) && (
                    <ul className="list-disc list-outside ml-10 text-gray-600">
                    {feature.description.map((desc, idx) => (
                        <li className='mt-2' key={idx}>{desc}</li>
                    ))}
                    </ul>
                )}
                </div>
            ))}
            </div>
        ))}
        <h1 className='font-semibold text-2xl pt-10'>Why Choose Us:</h1>
        <p className='text-gray-700 mt-2 pb-36'>
            Our platform is designed to be user-friendly, flexible, and reliable,
            catering to the unique needs of mess owners and their customers. 
            Whether it’s managing subscriptions, handling payments, or maintaining records, 
            our system ensures smooth operations and enhances efficiency.
        </p>
        </div>
    </div>
  )
}

export default AboutUs