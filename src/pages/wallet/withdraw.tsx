import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import WithdrawPage from "@/components/Wallet/WithdrawPage";

function Withdraw() {
  return (
    <RequireAuth>
      <Layout>
        <WithdrawPage />
      </Layout>
    </RequireAuth>
  );
}

export default Withdraw;
