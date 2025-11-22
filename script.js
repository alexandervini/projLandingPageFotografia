const modal = document.getElementById("imageModal")
const modalImg = document.getElementById("expandedImage")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const closeBtn = document.querySelector(".modal-close")
const prevBtn = document.querySelector(".modal-prev")
const nextBtn = document.querySelector(".modal-next")

let currentImageIndex = 0
const images = Array.from(portfolioItems).map((item) => item.querySelector("img"))

// Funcionalidade - Quando clica na foto do portfolio faz abrir
portfolioItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = index
    openModal()
  })
})

function openModal() 
{
  modal.classList.add("active")
  updateModalImage()
  document.body.style.overflow = "hidden"
}

function closeModal() 
{
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function updateModalImage() 
{
  const img = images[currentImageIndex]
  modalImg.src = img.src
  modalImg.alt = img.alt
}

// Funcionalidade - Fecha portfolio
closeBtn.addEventListener("click", closeModal)

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Funcionalidade - Navegação
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
  updateModalImage()
})

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  currentImageIndex = (currentImageIndex + 1) % images.length
  updateModalImage()
})

// Funcionalidade - Setas do modal
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return

  if (e.key === "Escape") {
    closeModal()
  } else if (e.key === "ArrowLeft") {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
    updateModalImage()
  } else if (e.key === "ArrowRight") {
    currentImageIndex = (currentImageIndex + 1) % images.length
    updateModalImage()
  }
})

// Scroll quando clica no tópico do header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Funcionalidade - Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    });
}
