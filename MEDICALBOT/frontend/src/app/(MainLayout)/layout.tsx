// export const metadata: Metadata = {
//   title: "Bank statement analyzer",
//   description: "Bank statement analyzer web aplication",
// };

import MainLayout from "@/MainLayout";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <MainLayout>{children}</MainLayout>
);

export default RootLayout;
