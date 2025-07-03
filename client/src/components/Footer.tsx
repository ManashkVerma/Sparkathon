import React from 'react';

const footerLinks = [
  [
    'All Departments',
    'Store Directory',
    'Careers',
    'Our Company',
    'Sell on Walmart.com',
    'Help',
    'Product Recalls',
    'Accessibility',
    'Tax Exempt Program',
    'Get the Walmart App',
    'Safety Data Sheet',
    'Terms of Use',
    'Privacy Notice',
    'California Supply Chain Act',
    'Your Privacy Choices',
    'Notice at Collection',
    'AdChoices',
    'Consumer Health Data Privacy Notices',
    'Brand Shop Directory',
    'Pharmacy',
    'Walmart Business',
    '#IYWYK',
    'Delete Account',
  ],
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002d58] text-white pt-8 pb-4 mt-8">
      <div className="container mx-auto px-4">
        {/* Feedback section */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-gray-100 text-lg mb-2">We'd love to hear what you think!</div>
          <button className="btn btn-outline border-white text-white hover:bg-white hover:text-[#002d58] font-semibold px-6 py-2 rounded-full">Give feedback</button>
        </div>
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
          {footerLinks[0].map((link) => (
            <a key={link} href="#" className="hover:underline text-gray-200 px-2 py-1 whitespace-nowrap">
              {link}
            </a>
          ))}
        </div>
        <div className="text-center text-xs text-gray-300 mt-4">
          © 2025 Walmart. The trademarks Walmart and the Walmart Spark design are registered with the US Patent and Trademark Office. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 