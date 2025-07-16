// ===== Firebase SDK =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyCpLscgzlbaIz6vwLZxrNg8s0IUpS-ls3s",
  authDomain: "resumesmartbuild.firebaseapp.com",
  projectId: "resumesmartbuild",
  storageBucket: "resumesmartbuild.appspot.com",
  messagingSenderId: "190620294122",
  appId: "1:190620294122:web:9a93a5763ddcf3e1c63093",
  measurementId: "G-HSTPGPKLPE",
};

// ===== Init Firebase =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth; // make global for use in template logic

// ===== Sidebar Toggle =====
document.getElementById("menuBtn").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebarNav");
  sidebar.classList.toggle("show");
});

// ===== ScrollReveal Animation =====
ScrollReveal().reveal(".tool-card, .article-card, .template-card", {
  delay: 200,
  distance: "30px",
  origin: "bottom",
  interval: 100,
  duration: 600,
});

// ===== Collapsible Tool Panels =====
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const content = document.getElementById(targetId);
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// ===== ATS Resume Scanner Simulation =====
document.getElementById("atsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("resumeFile");
  const resultDiv = document.getElementById("atsResult");

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "⚠️ Please upload a resume first.";
    return;
  }

  resultDiv.innerHTML = "🔍 Scanning your resume for ATS compatibility...";

  setTimeout(() => {
    resultDiv.innerHTML = `
      ✅ Your resume is 78% ATS-compatible.<br>
      📌 Tip: Use more job-related keywords.<br>
      💡 Consider reformatting headers for better parsing.
    `;
  }, 2000);
});

// ===== Login Modal Logic =====
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.querySelector(".close");

document.querySelectorAll(".login-btn").forEach((btn) =>
  btn.addEventListener("click", () => (loginModal.style.display = "block"))
);

closeLoginModal.onclick = () => (loginModal.style.display = "none");

window.onclick = (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
};

// ===== Firebase Email Login =====
document.getElementById("emailLoginBtn").onclick = () => {
  const email = document.getElementById("emailInput").value;
  signInWithEmailAndPassword(auth, email, "defaultpassword")
    .then(() => {
      alert("✅ Signed in successfully!");
      loginModal.style.display = "none";
    })
    .catch(() => {
      alert("⚠️ Use Google sign-in or a valid email/password.");
    });
};

// ===== Firebase Google Sign-In =====
document.getElementById("googleLoginBtn").onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("🎉 Welcome, " + result.user.displayName);
      loginModal.style.display = "none";
    })
    .catch((error) => console.error("Google Login Error:", error));
};

// ===== Signup Modal Logic =====
const signupPopup = document.getElementById("signupPopup");
const getStartedBtn = document.getElementById("getStartedModalBtn");
const closeSignup = document.getElementById("closeSignup");

getStartedBtn.addEventListener("click", () => {
  signupPopup.style.display = "flex";
});

closeSignup.addEventListener("click", () => {
  signupPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === signupPopup) {
    signupPopup.style.display = "none";
  }
});
