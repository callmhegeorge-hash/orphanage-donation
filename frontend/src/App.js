import React from "react";
import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Orphanage Donation</h1>
      <DonationForm />
      <DonationList />
    </div>
  );
}

export default App;
