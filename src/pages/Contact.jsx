function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section data-anim="reveal" className="bg-gradient-to-r from-ms-orange to-ms-purple text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Have questions? Want to join us? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section data-anim="reveal" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ms-blue rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">microsoftclub@college.edu</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ms-green rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700">+91 1234567890</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ms-purple rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-700">Computer Science Department<br />Main Campus Building</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-ms-orange rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Follow Us</h3>
                    <div className="flex space-x-3">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                         className="text-ms-blue hover:text-blue-700 transition-colors">
                        LinkedIn
                      </a>
                      <span className="text-gray-400">•</span>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                         className="text-ms-purple hover:text-purple-700 transition-colors">
                        Instagram
                      </a>
                      <span className="text-gray-400">•</span>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                         className="text-gray-900 hover:text-gray-700 transition-colors">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Form Embed */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Microsoft Club</h2>
              <div className="bg-white rounded-lg shadow-md p-8">
                <p className="text-gray-700 mb-6">
                  Fill out this form to join our club and stay updated with all our events and activities!
                </p>
                
                {/* Placeholder for Google Form */}
                <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600 font-semibold mb-2">Google Form Placeholder</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Replace this with your actual Google Form embed code
                  </p>
                  <a 
                    href="https://forms.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-block btn-animate"
                  >
                    Open Form
                  </a>
                </div>

                {/* Instructions for updating the form */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>To add your Google Form:</strong><br />
                    1. Create a form in Google Forms<br />
                    2. Click "Send" → Embed HTML<br />
                    3. Copy the iframe code<br />
                    4. Replace the placeholder div above with your iframe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
