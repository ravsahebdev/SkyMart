import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Package, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { selectOrders } from "../store/ordersSlice";

function Orders() {
  const orders = useSelector(selectOrders);
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          My <span className="text-lime-400">Orders</span>
        </h1>

        {justPlaced && (
          <div className="flex items-center gap-3 bg-lime-400/10 border border-lime-400/30 text-lime-300 rounded-xl px-4 py-3 mb-6">
            <CheckCircle2 size={20} />
            <p className="text-sm">
              Order <span className="font-bold">{justPlaced}</span> placed successfully. Thanks
              for shopping with SkyMart!
            </p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            <Package size={40} className="mx-auto text-white/15" />
            <p className="text-lg font-medium mt-4">No orders yet</p>
            <p className="text-sm mt-1">Your placed orders will show up here</p>
            <Link
              to="/explore"
              className="inline-block mt-6 bg-lime-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-[#111111] border border-white/8 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold">{order.orderId}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {new Date(order.placedAt).toLocaleString()}
                      {order.apiRef ? ` · API ref #${order.apiRef}` : ""}
                    </p>
                  </div>
                  <span className="bg-lime-400/15 text-lime-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-11 h-11 shrink-0 bg-white rounded-lg flex items-center justify-center">
                        <img src={item.image} alt="" className="w-full h-full object-contain p-1.5" />
                      </div>
                      <p className="flex-1 text-sm line-clamp-1">{item.title}</p>
                      <p className="text-white/40 text-xs">x{item.qty}</p>
                      <p className="text-sm font-semibold w-20 text-right">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between flex-wrap gap-3 border-t border-white/10 mt-4 pt-4">
                  <div className="text-white/40 text-xs leading-relaxed">
                    <p className="text-white/60 font-medium">{order.customer?.fullName}</p>
                    <p>
                      {order.customer?.address}, {order.customer?.city} - {order.customer?.pincode}
                    </p>
                    <p>{order.customer?.phone}</p>
                  </div>
                  <p className="font-bold text-xl text-lime-400">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Orders;
