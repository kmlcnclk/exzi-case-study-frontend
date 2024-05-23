import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import TradePage from "@/components/Trade/TradePage";

function Trade() {
  return (
    <RequireAuth>
      <Layout>
        <TradePage />
      </Layout>
    </RequireAuth>
  );
}

export default Trade;
