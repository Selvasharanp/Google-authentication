import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/api/google-login", {
        token: response.credential,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!user ? (
          <>
            <h1 style={styles.title}>Welcome 👋</h1>
            <p style={styles.subtitle}>Sign in with your Google account</p>

            <div style={{ marginTop: 25 }}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              src={user.picture}
              alt="profile"
              style={styles.avatar}
            />

            <h2 style={{ marginTop: 15 }}>{user.name}</h2>
            <p style={{ color: "#666" }}>{user.email}</p>

            <button
              onClick={() => setUser(null)}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4e73df, #1cc88a)",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "8px",
    fontWeight: "600",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  avatar: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },

  logoutBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#e74a3b",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default App;