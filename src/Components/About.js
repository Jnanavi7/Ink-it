import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-4 text-center mb-4">Welcome to Ink-it</h1>
          <p className="lead text-center">
            A modern note-taking web app designed to simplify your life.
          </p>
          <div className="mb-4">
            <h2 className="h4">Why Choose Ink-it?</h2>
            <ul className="list-unstyled">
              <li><i className="bi bi-check2"></i> Quick and easy note creation</li>
              <li><i className="bi bi-check2"></i> Organize notes into categories or tags</li>
              <li><i className="bi bi-check2"></i> User-friendly and intuitive interface</li>
              <li><i className="bi bi-check2"></i> Accessible from any device</li>
              <li><i className="bi bi-check2"></i> Secure and private</li>
            </ul>
          </div>
          <p>
            Get started today and let  Ink-it be your go-to companion for capturing ideas on the fly. We value
            simplicity and functionality, making it a breeze to use for all your note-taking needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
