import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import BuyAndSellPage from "@/components/Trade/BuyAndSellPage";

function BuyAndSale() {
  return (
    <RequireAuth>
      <Layout>
        <BuyAndSellPage />
      </Layout>
    </RequireAuth>
  );
}

export default BuyAndSale;
