import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Company</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Support</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Help Center</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Legal</h5>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h5 className="text-xl font-bold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
