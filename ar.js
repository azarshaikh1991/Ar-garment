// ====== CONSTANT RAW DATA BRAND DICTIONARY ======
// Saare file names aapke assets folder ke hisaab se update kar diye hain
const catalogData = [
    {
        name: "Orange T-Shirt",
        tagline: "Wear your Style with Comfort",
        price: "$29.99",
        image: "orange-tshirt.png",
        color: "#FF7043", // Vivid Orange theme
        whatsappMsg: "Hello! I am interested in buying the Orange T-Shirt. Please share available sizes."
    },
    {
        name: "Olive Shirt",
        tagline: "Stay Sharp, Stay Minimal",
        price: "$39.99",
        image: "olive-shirt.png",
        color: "#4E4E3B", // Aesthetic Olive Green theme
        whatsappMsg: "Hello! I would like to inquire about the Olive Shirt. Is it in stock?"
    },
    {
        name: "Lavender Jeans",
        tagline: "Premium Aesthetic Denim Look",
        price: "$49.99",
        image: "lavender-jeans.png",
        color: "#7E57C2", // Jeans dark pastel purple theme
        whatsappMsg: "Hello! I am interested in the Lavender Jeans. Please share size details."
    }
];

// Target Business Whatsapp Config (No '+' sign)
const businessPhone = "919876543210"; 

// ====== DOM ELEMENTS ======
const container = document.getElementById('hero-container');
const pName = document.getElementById('product-name');
const pTagline = document.getElementById('product-tagline');
const pPrice = document.getElementById('product-price');
const pImage = document.getElementById('main-product');
const whatsappBtn = document.getElementById('whatsapp-btn');
const controlsContainer = document.getElementById('color-controls');

const menuToggle = document.getElementById('mobile-menu');
const navLinksList = document.getElementById('nav-list');

// ====== INITIALIZE COLOR SELECTION DOTS DYNAMICALLY ======
catalogData.forEach((item, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.backgroundColor = item.color;
    if(index === 0) dot.classList.add('active'); 
    
    dot.addEventListener('click', () => {
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        changeProductEngine(index);
    });
    
    controlsContainer.appendChild(dot);
});

// ====== SMOOTH INTERPOLATION ANIMATION ENGINE ======
function changeProductEngine(index) {
    const targetProduct = catalogData[index];
    
    // Start CSS shrink transition
    pImage.classList.add('image-change');
    
    // Swap data mid-way smoothly
    setTimeout(() => {
        pName.innerText = targetProduct.name;
        pTagline.innerText = targetProduct.tagline;
        pPrice.innerText = targetProduct.price;
        pImage.src = targetProduct.image;
        container.style.backgroundColor = targetProduct.color;
        
        // Build Encoded WhatsApp URL
        const encodedText = encodeURIComponent(targetProduct.whatsappMsg);
        whatsappBtn.href = `https://wa.me/${businessPhone}?text=${encodedText}`;
        
        // Contact form button ka color theme ke sath badlega
        document.querySelector('.submit-btn').style.background = targetProduct.color;
        
        // Dynamic focus color update for input borders
        document.styleSheets[0].insertRule(`#contact-form input:focus, #contact-form textarea:focus { border-color: ${targetProduct.color}; }`, 0);

        // Bring the new image back with a pop effect
        pImage.classList.remove('image-change');
    }, 300); 
}

// ====== MOBILE NAVBAR TOGGLE LOGIC ======
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navLinksList.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinksList.classList.remove('show');
    });
});

// Default execution loop on boot
changeProductEngine(0);