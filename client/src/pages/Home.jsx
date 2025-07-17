import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Hements from "../components/Hements";

function Home() {
  return (
    <>
      <Hements title="Home">
        <Navbar />
        <Header />
        <BlogList />
        <Newsletter />
        <Footer />
      </Hements>
    </>
  );
}

export default Home;
