import React from 'react'

const privacyPolicy = [
    {
      id: 1,
      heading: "Introduction",
      text: "At 'Logger', we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.",
      list: null
    },
    {
      id: 2,
      heading: "Information We Collect",
      text: null,
      list: [
        {
          subheading: "Personal Information:",
          text: "Name, mobile number, UPI ID, and payment details (as provided via Razorpay or other means)."
        },
        {
          subheading: "Usage Data:",
          text: "Information about how you use the App, including IP address and activity logs."
        },
        {
          subheading: "Third-Party Data:",
          text: "We may use third-party services to fetch customer details based on UPI ID or mobile number."
        }
      ]
    },
    {
      id: 3,
      heading: "How We Use Your Information",
      text: null,
      list: [
        {
          subheading: null,
          text: "To process payments and manage subscriptions."
        },
        {
          subheading: null,
          text: "To notify users about subscription status, payment records, and other updates."
        },
        {
            subheading: null,
            text: "To maintain customer records for the mess owner."
        }
      ]
    },
    {
      id: 4,
      heading: "Data Sharing",
      text: null,
      list: [
        {
          subheading: null,
          text: "We do not sell your personal data."
        },
        {
          subheading: null,
          text: "Data may be shared with third-party payment processors (e.g., Razorpay) and other services necessary to operate the App."
        },
        {
          subheading: null,
          text: "Data may also be disclosed if required by law or to resolve disputes."
        }
      ]
    },
    {
      id: 5,
      heading: "Data Retention",
      text: "We retain data for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by law.",
      list: null
    },
    {
      id: 6,
      heading: "Data Security",
      text: "We implement robust security measures to protect your data. However, no system is completely secure, and we cannot guarantee the absolute security of your data.",
      list: null
    },
    {
      id: 7,
      heading: "Your Rights",
      text: null,
      list: [
        {
          subheading: "Access and Correction:",
          text: "You may request access to your data or corrections to inaccurate information."
        },
        {
          subheading: "Data Deletion:",
          text: "You may request deletion of your personal data, subject to legal or contractual obligations."
        },
        {
          subheading: "Opt-Out:",
          text: "You may opt out of receiving notifications, though this may limit your use of certain features."
        }
      ]
    },
    {
      id: 8,
      heading: "Children’s Privacy",
      text: "Our App is not intended for individuals under the age of 18 without parental consent. We do not knowingly collect data from children.",
      list: null
    },
    {
      id: 9,
      heading: "Third-Party Services",
      text: "We are not responsible for the privacy practices of third-party services used in the App (e.g., Razorpay).",
      list: null
    },
    {
      id: 10,
      heading: "Changes to This Policy",
      text: "We may update this Privacy Policy from time to time. Your continued use of the App signifies your acceptance of the updated Privacy Policy.",
      list: null
    },
    {
      id: 11,
      heading: "Contact Us",
      text: "For questions about this Privacy Policy, contact us at 'logger4647@gmail.com'.",
      list: null
    }
  ];
  
const PrivacyPolicy = () => {
    return (
        <div className='w-full bg-[#C6ECCF] flext items-center line-height overflow-y-auto h-full  justify-center'>
          <div className='mb-10 mt-11 mx-5 sm:mx-40 md:mx-60 '>
            <h1 className='sm:text-center font-bold text-left text-xl text-glow sm:text-3xl pb-2 sm:pb-10 border-b-2 border-black'>Privacy Policy</h1>
            {privacyPolicy.map((section, index) => (
            <div key={section.id} className="mb-8">
              <p className={`font-bold text-xl ${index === 0 ? 'mt-10' : 'mt-7'}`}>
                <span className='font-medium'>{section.id}</span>. {section.heading}
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

export default PrivacyPolicy;