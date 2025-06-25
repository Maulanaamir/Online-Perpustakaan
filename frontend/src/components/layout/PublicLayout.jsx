import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-full max-w-md p-6 e rounded">
        <Outlet />
      </main>
    </div>
  );
}
