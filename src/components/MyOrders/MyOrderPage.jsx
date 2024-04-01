import "./MyOrderPage.css";
import Table from "../common/Table";
import useData from "../../hooks/useData";
import Loader from "../common/Loader";
const MyOrderPage = () => {
  const { data: orders, error, isLoading } = useData("/order");

  const getProductString = (order) => {
    const productStringARR = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productStringARR.join(", ");
  };

  return (
    <section className="align-center myorder-page">
      {isLoading && <Loader />}
      {error && <em className="form-error">{error}</em>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
