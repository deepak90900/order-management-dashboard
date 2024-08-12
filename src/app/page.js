// src/app/page.js or pages/index.js
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <SignedOut>
        <h1>Welcome to the Order Management Dashboard</h1>
        <p>Please sign in to continue.</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <h1>Welcome back!</h1>
        <p>
          You are signed in. Go to your <a href="/dashboard">dashboard</a>.
        </p>
      </SignedIn>
    </div>
  );
}
