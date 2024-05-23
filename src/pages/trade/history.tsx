import Layout from "@/components/Layout/index";
import RequireAuth from "@/components/RequireAuth";
import HistoryPage from "@/components/Trade/HistoryPage";

function History() {
  return (
    <RequireAuth>
      <Layout>
        <HistoryPage />
      </Layout>
    </RequireAuth>
  );
}

export default History;
