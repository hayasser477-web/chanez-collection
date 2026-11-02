
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      const adminId = "3989b286-eaab-47d5-8a5c-8b7b719a7cfc";

      if (data.user.id !== adminId) {
        await supabase.auth.signOut();
        throw new Error("هذا الحساب ليس لديه صلاحية الدخول إلى لوحة الإدارة.");
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "تعذر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" style={{ maxWidth: 420, margin: "80px auto", padding: 24 }}>
      <h1>لوحة إدارة CHANEZ COLLECTION</h1>
      <p>سجّل الدخول لإدارة منتجات المتجر</p>

      <form onSubmit={handleLogin}>
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 18px" }}
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 18px" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ padding: 12, width: "100%" }}>
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </main>
  );
}
