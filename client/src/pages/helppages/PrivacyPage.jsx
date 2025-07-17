import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Hements from "../../components/Hements";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Hements title="Privacy-Policy">
        <Navbar />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <Link to="/" className="underline underline-offset-4 mb-4">
              Home
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-primary dark:text-emerald-400">
              Privacy Policy
            </h1>

            <p className="mb-6 dark:text-gray-300">
              TopBlog ("we", "us", or "our") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and
              disclose information about you when you use our blog platform
              located at https://topblog.com (the "Site"). By using the Site,
              you consent to our collection, use, and disclosure of information
              about you as described in this Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Information We Collect
            </h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                a. Information You Provide:
              </h3>
              <p className="mb-4 dark:text-gray-400">
                We collect information that you provide to us, such as when you
                create an account, post comments, or contact us. The types of
                information we collect may include your name, email address,
                profile picture, and any other information you choose to
                provide.
              </p>

              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                b. Automatic Information:
              </h3>
              <p className="dark:text-gray-400">
                We may automatically collect information about your use of the
                Site, such as your IP address, browser type, operating system,
                referring URLs, device information, pages visited, and the
                dates/times of your visits.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Use of Information
            </h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                a. We may use the information we collect for various purposes,
                including to:
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience on our Site</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage and trends</li>
                <li>
                  Detect, investigate, and prevent fraudulent or unauthorized
                  activities
                </li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
              </ul>

              <h3 className="font-medium mt-4 mb-2 text-gray-700 dark:text-gray-300">
                b. Marketing Communications:
              </h3>
              <p className="dark:text-gray-400">
                We may use your information to send you promotional emails about
                new features, blog posts, or other news. You can opt-out of
                receiving marketing emails from us by following the unsubscribe
                instructions in each email.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Disclosure of Information
            </h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                a. We may disclose information about you as follows:
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-400">
                <li>
                  To service providers who perform services on our behalf (e.g.,
                  hosting, analytics)
                </li>
                <li>
                  To comply with applicable laws, regulations, or legal
                  processes
                </li>
                <li>In response to valid requests by public authorities</li>
                <li>
                  If we believe disclosure is necessary to protect our rights,
                  your safety, or the safety of others
                </li>
                <li>
                  In connection with any merger, sale of company assets, or
                  acquisition
                </li>
              </ul>

              <h3 className="font-medium mt-4 mb-2 text-gray-700 dark:text-gray-300">
                b. Aggregated or Anonymized Data:
              </h3>
              <p className="dark:text-gray-400">
                We may share aggregated or anonymized information that does not
                directly identify you with third parties for analytics,
                research, or other purposes.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Cookies and Tracking Technologies
            </h2>

            <p className="mb-6 dark:text-gray-400">
              We use cookies and similar tracking technologies to track activity
              on our Site and hold certain information. Cookies are files with
              small amounts of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Data Retention
            </h2>

            <p className="mb-6 dark:text-gray-400">
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              policies.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Security
            </h2>

            <p className="mb-6 dark:text-gray-400">
              We implement appropriate technical and organizational measures to
              protect the security of your personal information. However, please
              be aware that no method of transmission over the Internet or
              method of electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Children's Privacy
            </h2>

            <p className="mb-6 dark:text-gray-400">
              Our Site is not directed to children under 13. We do not knowingly
              collect personal information from children under 13. If we become
              aware that a child under 13 has provided us with personal
              information, we will take steps to delete such information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Your Rights
            </h2>

            <p className="mb-6 dark:text-gray-400">
              Depending on your location, you may have certain rights regarding
              your personal information, including the right to access, correct,
              update, or delete the information we have about you. You may also
              have the right to object to or restrict certain processing of your
              information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Changes to This Privacy Policy
            </h2>

            <p className="mb-6 dark:text-gray-400">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-dark dark:text-emerald-300">
              Contact Us
            </h2>

            <p className="mb-6 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>

            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
              <p className="font-medium dark:text-gray-300">
                Email: privacy@topblog.com
              </p>
              <p className="mt-2 dark:text-gray-400">
                Mailing Address: TopBlog Privacy Team, 123 Blog Street, Digital
                City, 10001
              </p>
            </div>

            <p className="mt-8 italic dark:text-gray-400">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <Footer />
      </Hements>
    </div>
  );
}

export default PrivacyPage;
