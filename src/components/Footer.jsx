// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/Logo.png";

// function Footer() {
//   return (
//     <footer className="bg-white dark:bg-gray-800 w-full py-16">
//       <div className="w-full max-w-full mx-auto px-5 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Section - Logo and Vision */}
//           <div className="max-w-md">
//             <Link to="/">
//               <h1 className="text-[#3563E9] text-[32px] font-bold mb-4">
//                 MORENT
//               </h1>
//             </Link>
//             <p className="text-[#13131399] dark:text-gray-400 text-base">
//               Our vision is to provide convenience and help increase your sales
//               business.
//             </p>
//           </div>

//           {/* Right Section - Links Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
//             {/* About Section */}
//             <div>
//               <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
//                 About
//               </h3>
//               <ul className="space-y-4">
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     How it works
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Featured
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Partnership
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Bussiness Relation
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Community Section */}
//             <div>
//               <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
//                 Community
//               </h3>
//               <ul className="space-y-4">
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Events
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Podcast
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Invite a friend
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Socials Section */}
//             <div>
//               <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
//                 Socials
//               </h3>
//               <ul className="space-y-4">
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Discord
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Instagram
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Twitter
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
//                   >
//                     Facebook
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//             <p className="text-black font-[500] dark:text-gray-400">
//               ©2022 MORENT. All rights reserved
//             </p>
//             <div className="flex gap-4 space-x-8 mr-24">
//               <Link
//                 to="#"
//                 className="text-black font-[500] dark:text-gray-400 hover:text-[#3563E9]"
//               >
//                 Privacy & Policy
//               </Link>
//               <Link
//                 to="#"
//                 className="text-black font-[500] dark:text-gray-400 hover:text-[#3563E9]"
//               >
//                 Terms & Condition
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-16">
      <div className="w-full max-w-full mx-auto px-5 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Logo and Vision */}
          <div className="mb-8">
            <Link to="/">
              <h1 className="text-[#3563E9] text-[32px] font-bold mb-4">
                MORENT
              </h1>
            </Link>
            <p className="text-[#13131399] dark:text-gray-400 text-base">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {/* About Section */}
            <div className="mb-8 ">
              <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-4">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Featured
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Bussiness Relation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Section */}
            <div className="mb-8">
              <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-4">
                Community
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Invite a friend
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials Section */}
            <div className="mb-8">
              <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-4">
                Socials
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom for Mobile */}
          <div className="pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <Link
                to="#"
                className="text-black text-sm font-[500] dark:text-gray-400 hover:text-[#3563E9]"
              >
                Privacy & Policy
              </Link>
              <Link
                to="#"
                className="text-black text-sm font-[500] dark:text-gray-400 hover:text-[#3563E9]"
              >
                Terms & Condition
              </Link>
            </div>
            <p className="text-black text-sm font-[500] dark:text-gray-400">
              ©2022 MORENT. All rights reserved
            </p>
          </div>
        </div>

        {/* Original Desktop Layout - Preserved Exactly as Original */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section - Logo and Vision */}
            <div className="max-w-md">
              <Link to="/">
                <h1 className="text-[#3563E9] text-[32px] font-bold mb-4">
                  MORENT
                </h1>
              </Link>
              <p className="text-[#13131399] dark:text-gray-400 text-base">
                Our vision is to provide convenience and help increase your
                sales business.
              </p>
            </div>

            {/* Right Section - Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {/* About Section */}
              <div>
                <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
                  About
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      How it works
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Featured
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Partnership
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Bussiness Relation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community Section */}
              <div>
                <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
                  Community
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Podcast
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Invite a friend
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Socials Section */}
              <div>
                <h3 className="text-[#1A202C] dark:text-white text-xl font-semibold mb-6">
                  Socials
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#13131399] dark:text-gray-400 hover:text-[#3563E9]"
                    >
                      Facebook
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-black font-[500] dark:text-gray-400">
                ©2022 MORENT. All rights reserved
              </p>
              <div className="flex gap-4 space-x-8 mr-24">
                <Link
                  to="#"
                  className="text-black font-[500] dark:text-gray-400 hover:text-[#3563E9]"
                >
                  Privacy & Policy
                </Link>
                <Link
                  to="#"
                  className="text-black font-[500] dark:text-gray-400 hover:text-[#3563E9]"
                >
                  Terms & Condition
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;