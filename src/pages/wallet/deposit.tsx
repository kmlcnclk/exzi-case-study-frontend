import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import DepositPage from "@/components/Wallet/DepositPage";

function Deposit() {
  return (
    <RequireAuth>
      <Layout>
        <DepositPage />
      </Layout>
    </RequireAuth>
  );
}

export default Deposit;
