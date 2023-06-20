import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: 'What is My Real Estate App?',
      answer: 'My Real Estate App is a property management system for landlords and property managers in Kenya. My Real Estate App helps landlords and property managers save time and money by leveraging technology.',
    },
    {
      question: 'Does the system have downtimes?',
      answer: 'The system has no downtimes. We have backups for every part of our system so that there will be no interruption in service.',
    },
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button and fill out the registration form.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Your data is safe. All data transmitted is SSL encrypted and all data is password protected so that only you and your authorized users have access to your data. We also hold backups on your data so that you never loose your data.',
    },
    {
      question: 'How can I add a new property?',
      answer: 'To add a new property, go to your dashboard and click on the "Create Estate or Create House" button. Fill out the required details and save the property.',
    },
    {
      question: 'How do I manage tenant payments?',
      answer: 'You can manage tenant payments by going to the "Rent Payments" section. Here you can track and record payments made by tenants.',
    },
    {
      question: 'What if I forgot my password?',
      answer: 'If you forgot your password, click on the "Forgot Password" link on the login page. Follow the instructions to reset your password.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'For any inquiries or issues, you can reach out to our customer support team via email or phone. Visit the "Chat page" page for more information.',
    },
  ];

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};


export default FAQs;
