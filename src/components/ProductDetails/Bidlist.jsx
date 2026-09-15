import React from "react";

const Bidlist = ({ bids }) => {
  console.log("inside the bid list page", bids);
  return (
    <div>
      <h2>
        Bids Data :{" "}
        <span className="text-blue-600">
          {bids.length < 10 ? "0" + bids.length : bids.length}
        </span>
      </h2>
    </div>
  );
};

export default Bidlist;
