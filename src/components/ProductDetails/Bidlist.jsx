import React from "react";

const Bidlist = ({ bids, product }) => {
  console.log("inside the bid list page", bids);
  return (
    <div>
      <h2>
        Bids Data :{" "}
        <span className="text-blue-600 text-2xl">
          {bids.length < 10 ? "0" + bids.length : bids.length}
        </span>
      </h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Product</th>
            <th>Buyer</th>
            <th>Bid Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bids.map((bid, index) => (
            <tr key={bid._id}>
              {/* 1 */}
              <td>{index + 1}</td>
              {/* 2 */}
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="h-10 w-14 rounded object-cover"
                  />

                  <div>
                    <div className="font-medium">{product?.name}</div>

                    <div className="text-sm text-base-content/60">
                      ৳{product?.price_min}
                    </div>
                  </div>
                </div>
              </td>
              {/* 3 */}
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={bid.buyer_image}
                    alt={bid.buyer_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-medium">{bid.buyer_name}</div>

                    <div className="text-sm text-base-content/60">
                      {bid.buyer_email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Bid Price */}
              <td>
                <span className="font-semibold">৳{bid.bid_price}</span>
              </td>

              {/* Actions */}
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline btn-success">
                    Accept Offer
                  </button>

                  <button className="btn btn-sm btn-outline btn-error">
                    Reject Offer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bidlist;
