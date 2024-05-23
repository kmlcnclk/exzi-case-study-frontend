import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import BuyAndSalePage from "@/components/Trade/BuyAndSalePage";

function BuyAndSale() {
  return (
    <RequireAuth>
      <Layout>
        <BuyAndSalePage />
      </Layout>
    </RequireAuth>
  );
}

export default BuyAndSale;
