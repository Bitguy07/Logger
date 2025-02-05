import React from 'react'

const termsConditions = [
  {
    id: 1,
    heading: 'Introduction',
    text: 'Welcome to "Logger". By using our web app (the “Logger”), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these Terms, you must refrain from using the App.',
    list: null,
  },
  {
    id: 2,
    heading: 'Use of the App',
    text: null,
    list: [
      {
        subheading: 'Eligibility:',
        text: 'You must be at least 18 years old or have parental consent to use the App.',
      },
      {
        subheading: 'Purpose:',
        text: 'The App is designed for mess management, subscription tracking, and payment handling.',
      },
      {
        subheading: 'Accuracy:',
        text: 'You agree to provide accurate information while using the App and are responsible for maintaining the confidentiality of your account credentials.',
      },
    ],
  },
  {
    id: 3,
    heading: 'Subscriptions and Payments',
    text: null,
    list: [
      {
        subheading: 'Subscription Plans:',
        text: 'Subscriptions are created based on details provided by the mess owner (e.g., price, days, number of meals).',
      },
      {
        subheading: 'Pause/Resume Subscriptions:',
        text: 'Customers may pause/resume their subscriptions. We are not responsible for any misunderstandings between the mess owner and the customer regarding this process.',
      },
      {
        subheading: 'Automatic Adjustments:',
        text: 'Subscriptions may automatically adjust based on special circumstances (e.g., Ramadan).',
      },
      {
        subheading: 'Payment Handling:',
        text: 'Payments are processed through Razorpay. Any issues related to failed transactions, delays, or incorrect processing are the sole responsibility of Razorpay.',
      },
      {
        subheading: 'In-App Wallet:',
        text: 'Payments are recorded in the App’s wallet system. Owners must provide accurate information to withdraw funds. Any errors caused by the owner are their responsibility.',
      },
      {
        subheading: 'Manual Payments:',
        text: 'Physical payments are recorded but are not reflected in the in-app wallet.',
      },
    ],
  },
  {
    id: 4,
    heading: 'Data Management',
    text: null,
    list: [
      {
        subheading: 'Customer Records:',
        text: 'Customer records are created automatically upon payment matching.',
      },
      {
        subheading: 'Record Editing:',
        text: 'Owners may edit records in the app for unmatched payments.',
      },
      {
        subheading: 'Data Retention:',
        text: 'If the owner is logged out or inactive, customer records will be retained for a specific period. Owners can access these records upon logging back in.',
      },
    ],
  },
  {
    id: 5,
    heading: 'Platform Fees and Charges',
    text: null,
    list: [
      {
        subheading: null,
        text: 'The App may introduce platform fees after an initial free period.',
      },
      {
        subheading: null,
        text: 'Any transaction fees or GST imposed by Razorpay or other entities are the responsibility of the user.',
      },
    ],
  },
  {
    id: 6,
    heading: 'Limitations of Liability',
    text: null,
    list: [
      {
        subheading: 'Transaction Issues:',
        text: 'We are not responsible for transaction issues caused by Razorpay or third-party services.',
      },
      {
        subheading: 'Subscription Disputes:',
        text: 'We are not liable for misunderstandings between mess owners and customers.',
      },
      {
        subheading: 'Special Cases:',
        text: 'For special subscription adjustments (e.g., during Ramadan), we are not liable for extra charges, misunderstandings, or record discrepancies.',
      },
    ],
  },
  {
    id: 7,
    heading: 'Intellectual Property',
    text: null,
    list: [
      {
        subheading: null,
        text: 'All content, features, and functionality in the App are our property or licensed to us. Unauthorized reproduction is prohibited.',
      },
    ],
  },
  {
    id: 8,
    heading: 'Termination',
    text: 'We reserve the right to suspend or terminate access to the App for any user who violates these Terms.',
    list: null,
  },
  {
    id: 9,
    heading: 'Governing Law',
    text: 'These Terms are governed by the laws of India. Any disputes will be resolved exclusively in the courts of Lucknow, Uttar Pradesh.',
    list: null,
  },
  {
    id: 10,
    heading: 'Changes to Terms',
    text: 'We may update these Terms from time to time. Your continued use of the App signifies your acceptance of the updated Terms.',
    list: null,
  },
  {
    id: 11,
    heading: 'Contact Us',
    text: 'For any questions or concerns, contact us at "logger4647@gmail.com".',
    list: null,
  },
];

const TermsConditions = () => {
  return (
    <div className='w-full bg-[#C6ECCF] line-height flext items-center overflow-y-auto h-full  justify-center'>
      <div className='mb-10 mt-11 mx-5 sm:mx-40 md:mx-60'>
        <h1 className='sm:text-center font-bold text-left text-xl sm:text-3xl pb-2 sm:pb-8 border-b-2 text-glow border-black'>Terms and Conditions</h1>
        {termsConditions.map((section, index) => (
        <div key={section.id} className="mb-8">
          <p className={`font-bold text-xl ${index === 0 ? 'mt-10' : 'mt-7'}`}>
            <span className='font-medium'>{section.id}</span>. {section.heading}
          </p>
          {section.text && (
            <p className="text-[#565656] mt-4 font-normal">{section.text}</p>
          )}
          {section.list && (
            <ul className="text-[#565656] list-disc">
              {section.list.map((item, idx) => (
                <li key={idx} className="ml-7 mt-3">
                  <span className="font-medium text-lg text-black">
                    {item.subheading}
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

export default TermsConditions;