"use client";

import PageContainer from "@/components/shared/layout/page-container";
import PageHeader from "@/components/shared/layout/page-header";
import EmptyState from "@/components/shared/feedback/empty-state";

export default function JobsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Jobs"
        description="Browse and manage job opportunities."
      />

      <EmptyState
        title="No Jobs Found"
        description="Jobs will appear here once loaded from API."
      />
    </PageContainer>
  );
}