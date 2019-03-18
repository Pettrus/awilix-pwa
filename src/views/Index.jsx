import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

// sections for this page/view
import Filme from "views/Filme.jsx";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="main">
            <Filme />
          </div>
          <Footer />
        </div>

        <ToastContainer />
      </>
    );
  }
}

export default Index;
