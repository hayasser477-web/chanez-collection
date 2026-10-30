
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Check,
  X,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";
import "./Collection.css";

import image1 from "../../images/img.webp";
import image2 from "../../images/img (2).webp";
import image3 from "../../images/img (3).webp";
import image4 from "../../images/img (4).webp";
import image5 from "../../images/img (5).webp";
import image6 from "../../images/img (6).webp";
import image7 from "../../images/img (7).webp";
import image8 from "../../images/img (8).webp";
import image9 from "../../images/img (9).webp";
import image10 from "../../images/img (10).webp";
import image11 from "../../images/img (11).webp";
import image12 from "../../images/img (12).webp";
import image13 from "../../images/img (13).webp";
import image14 from "../../images/img (14).webp";
import image15 from "../../images/img (15).webp";
import image16 from "../../images/img (16).webp";
import image17 from "../../images/img (17).webp";
import image18 from "../../images/img (18).webp";
import image19 from "../../images/img (19).webp";
import image20 from "../../images/img (20).webp";
import image21 from "../../images/img (21).webp";
import image22 from "../../images/img (22).webp";
import image23 from "../../images/img (23).webp";
import image24 from "../../images/img (70).jpg";
import image25 from "../../images/img (71).jpg";
import image26 from "../../images/img (72).jpg";
import image27 from "../../images/img (73).jpg";
import image28 from "../../images/img (74).jpg";
import image29 from "../../images/img (75).jpg";
import image30 from "../../images/img (76).jpg";
import image31 from "../../images/img (77).jpg";
import image32 from "../../images/img (78).jpg";
import image33 from "../../images/img (79).jpg";
import image34 from "../../images/img (80).jpg";
import image35 from "../../images/img (81).jpg";
import image36 from "../../images/img (82).jpg";
import image37 from "../../images/img (83).jpg";
const imageList = [
  image1, image2, image3, image4, image5,
  image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15,
  image16, image17, image18, image19, image20,
  image21, image22, image23,image24,
  image25, image26, image27,
  image28, image29, image30,image31,
  image32, image33, image34,
  image35, image36, image37,
];

// بيانات أولية قابلة للتعديل.
// كل صورة مستقلة إلى أن نحدد الصور التي تخص اللون نفسه.
const products = [
  {
    id: "chanez-1",
    model: "1 Ensemble katrin",
    color: "jean clair",
    price: 5600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل. robe jean 100%",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image1, image4, image5],
  },
  {
    id: "chanez-2",
    model: "1 Ensemble katrin",
    color: "jean fonce",
    price: 5600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل. robe jean 100%",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image8, image6, image7, image9],
  },
  {
    id: "chanez-3",
    model: "2 Robe en jean chinoise",
    color: "jean clair",
    price: 4600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل. robe jean 100%",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image12, image11, image10],
  },
  {
    id: "chanez-4",
    model: "2 Robe en jean chinoise",
    color: "jean fonce",
    price: 4600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل.robe en jean chinoise",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image13, image14],
  },
  {
    id: "chanez-5",
    model: "3 Robe 100 % jean",
    color: "jean clair",
    price: 4600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل. robe jean 100%",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image21, image22],
  },
  {
    id: "chanez-6",
    model: "3 Robe 100 % jean",
    color: "jean fonce",
    price: 4600,
    description:
      "قطعة أنيقة من CHANEZ COLLECTION تجمع بين جمال التصميم والاهتمام بالتفاصيل. robe jean 100%",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image15, image16, image17,image18],
  },
  {
    id: "chanez-7",
    model: "4 Ensemble Maria" ,
    price: 5000,
    description:
      "ensemble 3 pieces",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image24, image25, image26,image27],
  },
  {
    id: "chanez-8",
    model: "5 ensemble ruby",
    color: "Burgundy",
    price: 4800,
    description:
      "ensemble ruby",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image28, image29, image30],
  },
  {
    id: "chanez-9",
    model: "5 ensemble ruby",
    color: "bleu nuit",
    price: 4800,
    description:
      "ensemble ruby",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image31, image32, image33],
  },
  {
    id: "chanez-7",
    model: "5 ensemble ruby",
    color: "noir",
    price: 4800,
    description:
      "ensemble ruby",
    sizes: ["38-40", "42-44", "46-48"],
    images: [image34, image35, image36, image37],
  },
];

function getVisitorId() {
  const storageKey = "chanez_visitor_id";
  let id = localStorage.getItem(storageKey);

  if (!id) {
    id = window.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(storageKey, id);
  }

  return id;
}

function formatPrice(price) {
  return `${price.toLocaleString("fr-DZ")} دج`;
}

export default function Collection() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [likes, setLikes] = useState({});
  const [likedProducts, setLikedProducts] = useState([]);
  const [popularCounts, setPopularCounts] = useState({});
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chanez_cart") || "[]");
    } catch {
      return [];
    }
  });
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCommunityData() {
      const [{ data: likeRows, error: likeError },
        { data: popularRows, error: popularError }] = await Promise.all([
        supabase.rpc("get_product_like_counts"),
        supabase.rpc("get_popular_products"),
      ]);

      if (!active) return;

      if (!likeError && likeRows) {
        const nextLikes = {};
        likeRows.forEach((row) => {
          nextLikes[row.product_id] = Number(row.likes_count);
        });
        setLikes(nextLikes);
      }

      if (!popularError && popularRows) {
        const nextPopular = {};
        popularRows.forEach((row) => {
          nextPopular[row.product_id] = Number(row.orders_count);
        });
        setPopularCounts(nextPopular);
      }

      try {
        const visitorId = getVisitorId();
        const { data, error } = await supabase
          .from("product_likes")
          .select("product_id")
          .eq("visitor_id", visitorId);

        if (active && !error && data) {
          setLikedProducts(data.map((row) => row.product_id));
        }
      } catch (error) {
        console.error("Could not load visitor likes:", error);
      }
    }

    loadCommunityData();

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (filter === "popular") {
      return products
        .filter((product) => (popularCounts[product.id] || 0) > 0)
        .sort(
          (a, b) =>
            (popularCounts[b.id] || 0) -
            (popularCounts[a.id] || 0)
        );
    }

    return products;
  }, [filter, popularCounts]);

  const groupedProducts = useMemo(() => {
    return visibleProducts.reduce((groups, product) => {
      const key = product.model;

      if (!groups[key]) groups[key] = [];
      groups[key].push(product);

      return groups;
    }, {});
  }, [visibleProducts]);

  async function toggleLike(productId) {
    if (loadingLikes) return;

    setLoadingLikes(true);

    try {
      const visitorId = getVisitorId();
      const isLiked = likedProducts.includes(productId);

      if (isLiked) {
        const { error } = await supabase
          .from("product_likes")
          .delete()
          .eq("product_id", productId)
          .eq("visitor_id", visitorId);

        if (error) throw error;

        setLikedProducts((previous) =>
          previous.filter((id) => id !== productId)
        );

        setLikes((previous) => ({
          ...previous,
          [productId]: Math.max(0, (previous[productId] || 0) - 1),
        }));
      } else {
        const { error } = await supabase
          .from("product_likes")
          .insert({
            product_id: productId,
            visitor_id: visitorId,
          });

        if (error) throw error;

        setLikedProducts((previous) => [...previous, productId]);

        setLikes((previous) => ({
          ...previous,
          [productId]: (previous[productId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Like action failed:", error);
      setNotice("تعذر تحديث الإعجاب. حاولي مرة أخرى.");
    } finally {
      setLoadingLikes(false);
    }
  }

 function openProduct(product) {
  setSelectedProduct(product);
  setSelectedImage(0);
  setSelectedSize("");
  setNotice("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

  async function addToCart(product) {
     if (!selectedSize) {
    setNotice("يرجى اختيار المقاس أولًا قبل إضافة القطعة إلى السلة.");
    return;
  }
    const cartItem = {
      productId: product.id,
      model: product.model,
      color: product.color,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
      quantity: 1,
    };

    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(
      (item) =>
        item.productId === cartItem.productId &&
        item.size === cartItem.size
    );

    if (existingIndex >= 0) {
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + 1,
      };
    } else {
      updatedCart.push(cartItem);
    }

    localStorage.setItem("chanez_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    try {
      const { error } = await supabase.rpc("record_cart_addition", {
        p_product_id: product.id,
      });

      if (error) {
        console.error("Could not record cart addition:", error);
      } else {
        setPopularCounts((previous) => ({
          ...previous,
          [product.id]: (previous[product.id] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Could not record cart addition:", error);
    }

    navigate("/cart");
  }

  return (
    <main className="collection" dir="rtl">
      <div className="collection__ambient" aria-hidden="true" />

      <header className="collection__hero">
        <span className="collection__eyebrow">
          CHANEZ COLLECTION · ÉDITION EXCLUSIVE
        </span>

        <span className="collection__ornament" aria-hidden="true">
          ✦
        </span>

        <h1 className="collection__title">
          عالم من الأناقة
        </h1>

        <p className="collection__subtitle">
          اختاري القطعة التي تعبّر عنكِ، ودعي التفاصيل تحكي قصتكِ.
        </p>

        <div className="collection__hero-bottom">
          <span>أناقة تنبع من التفاصيل</span>
          <span className="collection__hero-line" />
          <span>اكتشفي مجموعتنا</span>
        </div>
      </header>

      <section className="collection__catalog">
        <div className="collection__toolbar">
          <div>
            <span className="collection__section-kicker">
              THE COLLECTION
            </span>
            <h2 className="collection__section-title">
              اختياراتكِ المميزة
            </h2>
          </div>

          <div className="collection__filters" aria-label="ترتيب المنتجات">
            <button
              type="button"
              className={`collection__filter ${
                filter === "popular" ? "is-active" : ""
              }`}
              onClick={() => setFilter("popular")}
            >
              <span className="collection__filter-dot" />
              الأكثر طلبًا
            </button>

            <button
              type="button"
              className={`collection__filter ${
                filter === "all" ? "is-active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              الكل
            </button>
          </div>
        </div>

        {filter === "popular" && visibleProducts.length === 0 && (
          <div className="collection__empty">
            <ShoppingBag size={28} strokeWidth={1.3} />
            <h3>رحلة الاختيارات تبدأ هنا</h3>
            <p>
              ستظهر هنا المنتجات الأكثر إضافة إلى السلة عندما يبدأ
              زبائننا باكتشاف المجموعة.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="collection__empty-button"
            >
              اكتشفي جميع المنتجات
              <ArrowLeft size={16} />
            </button>
          </div>
        )}

        {Object.entries(groupedProducts).map(([model, modelProducts]) => (
          <section className="collection__model" key={model}>
            <div className="collection__model-heading">
              <span className="collection__model-side">
                <span className="collection__model-line" />
                CHANEZ
              </span>

              <div className="collection__model-center">
                <span className="collection__model-kicker">
                  LA SÉLECTION
                </span>
                <h3>الموديل {model}</h3>
                <span className="collection__model-description">
                  تفاصيل صُنعت لتلفت الأنظار
                </span>
              </div>

              <span className="collection__model-side collection__model-side--end">
                {String(modelProducts.length).padStart(2, "0")} PIÈCES
                <span className="collection__model-line" />
              </span>
            </div>

            <div className="collection__grid">
              {modelProducts.map((product, index) => {
                const isLiked = likedProducts.includes(product.id);

                return (
                  <article
                    className="product-card"
                    key={product.id}
                    style={{ "--card-index": index }}
                  >
                    <button
                      type="button"
                      className="product-card__image-button"
                      onClick={() => openProduct(product)}
                      aria-label={`عرض الموديل ${product.model} - ${product.color}`}
                    >
                      <div className="product-card__image-wrap">
                        <img
                          src={product.images[0]}
                          alt={`الموديل ${product.model} - ${product.color}`}
                          className="product-card__image"
                          loading="lazy"
                        />

                        <span className="product-card__image-index">
                          N° {String(Number(product.id.split("-")[1])).padStart(2, "0")}
                        </span>

                        <span className="product-card__view">
                          اكتشفي التفاصيل
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </button>

                    <div className="product-card__info">
                      <button
                        type="button"
                        className="product-card__name"
                        onClick={() => openProduct(product)}
                      >
                        <span className="product-card__model">
                          الموديل {product.model}
                        </span>
                        <span className="product-card__color">
                          {product.color}
                        </span>
                      </button>

                      <span className="product-card__price">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="product-card__bottom">
                      <button
                        type="button"
                        className={`product-card__like ${
                          isLiked ? "is-liked" : ""
                        }`}
                        onClick={() => toggleLike(product.id)}
                        aria-label={isLiked ? "إلغاء الإعجاب" : "أعجبني المنتج"}
                        aria-pressed={isLiked}
                        disabled={loadingLikes}
                      >
                        <Heart
                          size={19}
                          strokeWidth={1.6}
                          fill={isLiked ? "currentColor" : "none"}
                        />
                        <span>{likes[product.id] || 0}</span>

                        {isLiked && (
                          <span className="product-card__like-spark" aria-hidden="true">
                            ✦
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        className="product-card__quick-add"
                        onClick={() => {
  setSelectedProduct(product);
  setSelectedImage(0);
  setSelectedSize("");
  setNotice("");
}}
                      >
                        اكتشفي القطعة
                        <ArrowLeft size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        <div className="collection__endnote">
          <span className="collection__endnote-star">✦</span>
          <p>كل قطعة تحمل حكاية من الأناقة</p>
          <span>CHANEZ COLLECTION</span>
        </div>
      </section>

      {selectedProduct && (
        <div
          className="product-detail"
          role="dialog"
          aria-modal="true"
          aria-label="تفاصيل المنتج"
        >
          <button
            type="button"
            className="product-detail__close"
            onClick={() => setSelectedProduct(null)}
            aria-label="إغلاق تفاصيل المنتج"
          >
            <X size={22} />
          </button>

          <div className="product-detail__layout">
            <div className="product-detail__gallery">
              <div className="product-detail__main-image">
                <img
                  key={selectedProduct.images[selectedImage]}
                  src={selectedProduct.images[selectedImage]}
                  alt={`الموديل ${selectedProduct.model} - ${selectedProduct.color}`}
                />
              </div>

              <div className="product-detail__thumbnails">
                {selectedProduct.images.map((image, index) => (
                  <button
                    type="button"
                    key={`${selectedProduct.id}-image-${index}`}
                    className={`product-detail__thumbnail ${
                      selectedImage === index ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`الصورة ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail__content">
              <span className="product-detail__eyebrow">
                CHANEZ COLLECTION
              </span>

              <span className="product-detail__model">
                الموديل {selectedProduct.model}
              </span>

              <h2>{selectedProduct.color}</h2>

              <span className="product-detail__price">
                {formatPrice(selectedProduct.price)}
              </span>

              <div className="product-detail__divider" />

              <p className="product-detail__description">
                {selectedProduct.description}
              </p>

              <span className="product-detail__label">
                المقاس
              </span>

              <div className="product-detail__sizes">
                {selectedProduct.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={`product-detail__size ${
                      selectedSize === size ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="product-detail__add"
                onClick={() => addToCart(selectedProduct)}
              >
                <ShoppingBag size={18} />
                أضيفي إلى السلة
                <ArrowLeft size={17} />
              </button>

              <p className="product-detail__note">
                <Check size={15} />
                اختاري المقاس المناسب قبل الإضافة إلى السلة
              </p>

              <div className="product-detail__reference">
                <span>المرجع</span>
                <span>{selectedProduct.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div className="collection__notice" role="status">
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="إغلاق">
            <X size={16} />
          </button>
        </div>
      )}

      <button
        type="button"
        className="collection__cart-float"
        onClick={() => navigate("/cart")}
        aria-label={`السلة، ${cart.reduce((sum, item) => sum + item.quantity, 0)} منتجات`}
      >
        <ShoppingBag size={19} />
        <span>
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </button>
    </main>
  );
}
