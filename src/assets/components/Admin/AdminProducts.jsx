
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const ADMIN_ID = "3989b286-eaab-47d5-8a5c-8b7b719a7cfc";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    model: "",
    color: "",
    price: "",
    description: "",
    sizes: "",
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.id !== ADMIN_ID) {
      navigate("/admin");
      return;
    }

    await loadProducts();
  }

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  function updateField(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageSelection(e) {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }

    // إعادة ضبط الحقل للسماح باختيار نفس الصورة مرة أخرى
    e.target.value = "";
  }

  function removeSelectedImage(index) {
    setFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  }

  async function uploadImages() {
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const path = `products/${Date.now()}-${i}-${safeName}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);

      imageUrls.push(data.publicUrl);
    }

    return imageUrls;
  }

  async function addProduct(e) {
    e.preventDefault();
    setMessage("");

    if (!files.length) {
      setMessage("يرجى اختيار صورة واحدة على الأقل");
      return;
    }

    if (!form.model.trim()) {
      setMessage("يرجى إدخال اسم الموديل");
      return;
    }

    if (!form.price || Number(form.price) < 0) {
      setMessage("يرجى إدخال سعر صحيح");
      return;
    }

    setSaving(true);

    try {
      const imageUrls = await uploadImages();

      const sizes = form.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean);

      const { error } = await supabase
        .from("products")
        .insert({
          model: form.model.trim(),
          color: form.color.trim(),
          price: Number(form.price),
          description: form.description.trim(),
          sizes,
          images: imageUrls,
        });

      if (error) throw error;

      setMessage("تمت إضافة المنتج بنجاح");

      setForm({
        model: "",
        color: "",
        price: "",
        description: "",
        sizes: "",
      });

      setFiles([]);

      const fileInput = document.getElementById("product-images");
      if (fileInput) fileInput.value = "";

      await loadProducts();
    } catch (error) {
      setMessage(error.message || "حدث خطأ أثناء إضافة المنتج");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذا المنتج؟"
    );

    if (!confirmed) return;

    try {
      const product = products.find((item) => item.id === id);

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // حذف الصور من Storage أيضًا
      if (product?.images?.length) {
        const paths = product.images
          .map((url) => {
            const marker = "/product-images/";
            const index = url.indexOf(marker);

            return index !== -1
              ? decodeURIComponent(
                  url.slice(index + marker.length)
                )
              : null;
          })
          .filter(Boolean);

        if (paths.length) {
          const { error: storageError } = await supabase.storage
            .from("product-images")
            .remove(paths);

          if (storageError) {
            console.error("Image deletion failed:", storageError);
          }
        }
      }

      setMessage("تم حذف المنتج");
      await loadProducts();
    } catch (error) {
      setMessage(error.message || "حدث خطأ أثناء الحذف");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  return (
    <main
      dir="rtl"
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        <h1>إدارة منتجات CHANEZ COLLECTION</h1>

        <button onClick={logout}>
          تسجيل الخروج
        </button>
      </header>

      <section
        style={{
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <h2>إضافة منتج جديد</h2>

        <form onSubmit={addProduct}>
          <label>اسم الموديل</label>

          <input
            name="model"
            value={form.model}
            onChange={updateField}
            placeholder="مثال: Ensemble Ruby"
            required
            style={inputStyle}
          />

          <label>اللون</label>

          <input
            name="color"
            value={form.color}
            onChange={updateField}
            placeholder="مثال: Noir"
            style={inputStyle}
          />

          <label>السعر</label>

          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={updateField}
            required
            style={inputStyle}
          />

          <label>المقاسات</label>

          <input
            name="sizes"
            value={form.sizes}
            onChange={updateField}
            placeholder="38-40, 42-44, 46-48"
            style={inputStyle}
          />

          <label>الوصف</label>

          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="وصف المنتج..."
            style={{
              ...inputStyle,
              minHeight: 90,
            }}
          />

          <label>
            صور المنتج (يمكن اختيار عدة صور على دفعات)
          </label>

          <input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelection}
            style={{
              display: "block",
              margin: "12px 0 20px",
            }}
          />

          {files.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p>
                الصور المختارة: {files.length}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 12,
                }}
              >
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />

                    <p
                      style={{
                        fontSize: 12,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {file.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                      style={{
                        background: "#b42318",
                        color: "white",
                        border: 0,
                        padding: 7,
                        borderRadius: 5,
                        width: "100%",
                      }}
                    >
                      حذف الصورة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={saving}>
            {saving
              ? "جارٍ رفع الصور وإضافة المنتج..."
              : "إضافة المنتج"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 15 }}>
            {message}
          </p>
        )}
      </section>

      <section>
        <h2>
          المنتجات الحالية ({products.length})
        </h2>

        {loading ? (
          <p>جارٍ تحميل المنتجات...</p>
        ) : products.length === 0 ? (
          <p>لا توجد منتجات حاليًا</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((product) => (
              <article
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.model}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}

                <h3>{product.model}</h3>

                <p>
                  اللون: {product.color || "غير محدد"}
                </p>

                <p>السعر: {product.price}</p>

                <p>
                  عدد الصور: {product.images?.length || 0}
                </p>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    background: "#b42318",
                    color: "white",
                    padding: 10,
                    border: 0,
                    borderRadius: 6,
                  }}
                >
                  حذف المنتج
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 12,
  margin: "8px 0 18px",
  boxSizing: "border-box",
};
