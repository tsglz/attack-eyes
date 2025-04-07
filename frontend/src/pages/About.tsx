import React from "react";

const About: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <img
            src="/yog.jpeg"
            alt="个人头像"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <h1>About me</h1>
          <p>Hello, this is Tsglz, a reverse engineer.</p>
        </div>
      </div>
    </div>
  );
};

export default About;