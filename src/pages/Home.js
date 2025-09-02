
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Student Dashboard</h2>
      <Link to="/writing"><button>Writing Training</button></Link>
      <Link to="/reading"><button>Reading Training</button></Link>
      <Link to="/learningtraining"><button>Learning Activities</button></Link>
    </div>
  );
}
