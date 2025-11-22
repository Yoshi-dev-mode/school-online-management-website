"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Temporary list of allowed accounts for prototype
  const allowedUsers = [
    { id: "admin001", pass: "canteen123" },
    { id: "cashier01", pass: "foodserve" },
    { id: "teacher05", pass: "welcome" },
  ];

  const handleLogin = (e:any) => {
    e.preventDefault();

    // basic validation to prevent empty submit
    if (!userId.trim() || !password) {
      setError("Please enter both User ID and Password");
      return;
    }

    const match = allowedUsers.find(
      (u) => u.id === userId && u.pass === password
    );

    if (match) {
      // successful - redirect to owner (prototype)
      window.location.href = "/owner";
      setError("");
    } else {
      setError("Invalid ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">User ID</label>
                <Input
                  type="text"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }} disabled={!userId.trim() || !password}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
