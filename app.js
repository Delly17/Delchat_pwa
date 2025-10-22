
// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker enregistré ✅'))
    .catch((err) => console.error('Erreur Service Worker:', err));
}


const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");
const loginScreen = document.getElementById("login");
const chatScreen = document.getElementById("chat");
const userDisplay = document.getElementById("userDisplay");

let username = localStorage.getItem("delchat_user");

if(username) showChat(username);

loginBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if(name) { localStorage.setItem("delchat_user", name); showChat(name); }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("delchat_user");
  localStorage.removeItem("delchat_messages");
  showLogin();
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => { if(e.key==="Enter") sendMessage(); });

function showChat(name){
  username = name;
  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  userDisplay.textContent = `👋 ${name}`;
  const saved = JSON.parse(localStorage.getItem("delchat_messages")) || [];
  messagesDiv.innerHTML = "";
  saved.forEach(m => addMessage(m.user, m.text));
}

function showLogin(){ chatScreen.classList.add("hidden"); loginScreen.classList.remove("hidden"); }

function sendMessage(){
  const text = messageInput.value.trim();
  if(!text) return;
  const msg = {user:username,text};
  addMessage(username,text);
  const saved = JSON.parse(localStorage.getItem("delchat_messages")) || [];
  saved.push(msg);
  localStorage.setItem("delchat_messages",JSON.stringify(saved));
  messageInput.value="";
}

function addMessage(user,text){
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.innerHTML = `<strong>${user}:</strong> ${text}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Gestion de l'installation PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Empêche Chrome d'afficher la bannière automatique
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block'; // Affiche le bouton
});

installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none'; // Cache le bouton
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Résultat de l'installation : ${outcome}`);
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', () => {
  console.log('DelChat Lite installée avec succès 🎉');
});
