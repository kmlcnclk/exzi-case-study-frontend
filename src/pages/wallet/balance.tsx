import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import BalancePage from "@/components/Wallet/BalancePage";

function Balance() {
  return (
    <RequireAuth>
      <Layout>
        <BalancePage />
      </Layout>
    </RequireAuth>
  );
}

export default Balance;
