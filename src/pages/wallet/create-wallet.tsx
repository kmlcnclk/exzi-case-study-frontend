import RequireAuth from "@/components/RequireAuth";
import Layout from "../../components/Layout/index";
import CreateWalletPage from "@/components/Wallet/CreateWalletPage";

function Wallet() {
  return (
    <RequireAuth>
      <Layout>
        <CreateWalletPage />
      </Layout>
    </RequireAuth>
  );
}

export default Wallet;
