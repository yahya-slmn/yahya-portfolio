/* ---------- Loader ---------- */
const pageLoader = document.getElementById("page-loader");
const loaderProgress = document.getElementById("loader-progress");
const loaderPercent = document.getElementById("loader-percent");

function startPortfolioLoader() {
    if (!pageLoader || !loaderProgress || !loaderPercent) {
        document.body.classList.remove("loading");
        document.body.classList.add("site-ready");
        return;
    }

    let progress = 0;

    const loaderTimer = setInterval(() => {
        const step = progress < 75 ? 2 : 1;
        progress = Math.min(progress + step, 100);

        loaderProgress.style.width = `${progress}%`;
        loaderPercent.textContent = `${progress}%`;

        if (progress === 100) {
            clearInterval(loaderTimer);

            setTimeout(() => {
                pageLoader.classList.add("hide-loader");
                document.body.classList.remove("loading");
                document.body.classList.add("site-ready");
            }, 350);

            setTimeout(() => {
                pageLoader.remove();
            }, 1300);
        }
    }, 18);
}

window.addEventListener("load", startPortfolioLoader);

/* ---------- DOM Elements ---------- */
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const root = document.documentElement;
const profileImg = document.getElementById("profile-img");
const themeBtn = document.querySelector(".theme-btn");
const themeMenu = document.querySelector(".theme-menu");
const themeOptions = document.querySelectorAll(".theme-option");
const projectModal = document.getElementById("projectModal");
const revealElements = document.querySelectorAll(".reveal");
const skillCards = document.querySelectorAll(".skill-card");
const counters = document.querySelectorAll(".counter");
const magneticItems = document.querySelectorAll(".magnetic");
const cursorGlow = document.querySelector(".cursor-glow");


/* ---------- Mobile Menu ---------- */
if (menuIcon && navbar) {
    menuIcon.addEventListener("click", event => {
        event.stopPropagation();
        const isOpen = navbar.classList.toggle("active");

        menuIcon.classList.toggle("bx-x", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuIcon.classList.remove("bx-x");
            navbar.classList.remove("active");
            document.body.classList.remove("nav-open");
        });
    });

    document.addEventListener("click", event => {
        const clickedInsideNav = event.target.closest(".navbar");
        const clickedMenuIcon = event.target.closest("#menu-icon");

        if (!clickedInsideNav && !clickedMenuIcon && navbar.classList.contains("active")) {
            menuIcon.classList.remove("bx-x");
            navbar.classList.remove("active");
            document.body.classList.remove("nav-open");
        }
    });
}

/* ---------- Active Nav Link ---------- */
function updateActiveNavLink() {
    sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(`header nav a[href="#${id}"]`);

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

/* ---------- Theme Switcher ---------- */
function setActiveTheme(theme) {
    themeOptions.forEach(option => {
        option.classList.toggle("active-theme", option.dataset.theme === theme);
    });
}

function setDarkMode() {
    root.classList.remove("light-theme");

    if (profileImg) {
        profileImg.src = "me.jpeg";
    }

    localStorage.setItem("theme", "dark");
    setActiveTheme("dark");
}

function setLightMode() {
    root.classList.add("light-theme");

    if (profileImg) {
        profileImg.src = "me-2.jpeg";
    }

    localStorage.setItem("theme", "light");
    setActiveTheme("light");
}

if (themeBtn && themeMenu) {
    themeBtn.addEventListener("click", event => {
        event.stopPropagation();
        themeMenu.classList.toggle("active");
    });
}

themeOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedTheme = option.dataset.theme;

        if (selectedTheme === "light") {
            setLightMode();
        } else {
            setDarkMode();
        }

        if (themeMenu) {
            themeMenu.classList.remove("active");
        }
    });
});

document.addEventListener("click", event => {
    if (themeMenu && !event.target.closest(".theme-dropdown")) {
        themeMenu.classList.remove("active");
    }
});

if (localStorage.getItem("theme") === "light") {
    setLightMode();
} else {
    setDarkMode();
}

/* ---------- Image Preload ---------- */
const lightProfileImage = new Image();
lightProfileImage.src = "me-2.jpeg";

/* ---------- Project Data ---------- */
const projects = {
    bi360: {
        title: "Business Insights 360",
        category: "Power BI Project",
        domain: "Domain/Function: Sales, Finance, Marketing, Supply Chain",
        description: "End-to-end executive Power BI solution for AtliQ Hardware, built on a star schema model and 1.8M+ rows to analyze revenue, profitability, customers, and operational performance across business functions.",
        image: "Bi projects/business-insights-360/Screenshots/Home_view.png",
        imageCaption: "Executive BI dashboard covering revenue, profit, customers, and cross-functional business performance.",
        linkedin: "https://www.linkedin.com/posts/yahya-sleiman-6b742a356_microsoft-power-bi-activity-7422237379362508800-ToqG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFiyOWsBlh38B-7ZHRHA01mOhGSoxoDz5tA",
        github: "https://github.com/yahya-slmn/business-insights-360",
        badges: ["Power BI", "Power Query", "DAX", "Star Schema", "1.8M+ Rows", "Executive Dashboard"],
        gallery: [
            "Bi projects/business-insights-360/Screenshots/Home_view.png",
            "Bi projects/business-insights-360/Screenshots/Executive_view.png",
            "Bi projects/business-insights-360/Screenshots/Finance_view.png",
            "Bi projects/business-insights-360/Screenshots/Sales_view.png",
            "Bi projects/business-insights-360/Screenshots/Marketing_view.png",
            "Bi projects/business-insights-360/Screenshots/Supply_Chain_view.png",
            "Bi projects/business-insights-360/Screenshots/Data_Model.png"
        ],
        skills: [
            "Modeled 1.8M+ rows using a clean star schema for scalable Power BI reporting.",
            "Built executive, finance, sales, marketing, and supply-chain dashboard pages.",
            "Created DAX measures for revenue, profitability, growth, and performance tracking.",
            "Used Power Query to clean, transform, and prepare business-ready datasets.",
            "Designed a stakeholder-ready analytics experience with slicers, navigation, and visual storytelling."
        ],
        link: "https://app.powerbi.com/view?r=eyJrIjoiYjRlYzdiNDMtZTM1Ny00ZGU3LWEwZjEtMjZlNDI3MWRjZmM3IiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9&pageName=12b8d28d202d035ab977"
    },

    hotel: {
        title: "AtliQ Grands Hospitality Analytics",
        category: "Power BI Project",
        domain: "Domain/Function: Hospitality, Revenue Management, Hotel Operations",
        description: "Power BI hospitality dashboard analyzing ADR, RevPAR, occupancy, realization, cancellations, booking platforms, and property performance across operational hotel datasets.",
        image: "Bi projects/atliq-hospitality-analytics/Screenshots/Home_Page.jpeg",
        imageCaption: "Hospitality executive view focused on hotel performance, booking trends, revenue metrics, and operational KPIs.",
        linkedin: "https://www.linkedin.com/posts/yahya-sleiman-6b742a356_microsoft-power-bi-activity-7425879582286974976-lNZl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFiyOWsBlh38B-7ZHRHA01mOhGSoxoDz5tA",
        github: "https://github.com/yahya-slmn/atliq-hospitality-analytics",
        badges: ["Power BI", "Hospitality Analytics", "ADR", "RevPAR", "DAX", "Revenue KPIs"],
        gallery: [
            "Bi projects/atliq-hospitality-analytics/Screenshots/Home_Page.jpeg",
            "Bi projects/atliq-hospitality-analytics/Screenshots/Executive_view.png",
            "Bi projects/atliq-hospitality-analytics/Screenshots/Data_Model.png"
        ],
        skills: [
            "Built hospitality dashboards for ADR, RevPAR, occupancy %, realization %, and cancellation analysis.",
            "Analyzed hotel and platform performance to identify revenue and booking patterns.",
            "Created DAX KPIs for operational hospitality performance tracking.",
            "Designed an executive view with clean KPI cards, trends, and interactive filters.",
            "Structured visuals to support revenue-management and hotel-operations decisions."
        ],
        link: "https://app.powerbi.com/view?r=eyJrIjoiOTRkYmI0ZjUtMzZmNy00ZGU2LWI5NzgtODEzMmMxNmI4NjYzIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9&pageName=c65bd517f429678dc156"
    },

    shield: {
        title: "Shield Insurance Analytics",
        category: "Power BI Project",
        domain: "Domain/Function: Insurance, Customer Analysis, Revenue & Claims Analytics",
        description: "Insurance analytics dashboard focused on customer segmentation, premium revenue, expected settlement, sales-mode performance, city analysis, and age-group insights.",
        image: "Bi projects/shield-insurance-analytics/Screenshots/Home_View.png",
        imageCaption: "Insurance analytics dashboard covering customer growth, revenue trends, age groups, settlements, and sales channels.",
        linkedin: "https://www.linkedin.com/posts/yahya-sleiman-6b742a356_dataanalytics-powerbi-businessintelligence-ugcPost-7460694479088271362-NRFZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFiyOWsBlh38B-7ZHRHA01mOhGSoxoDz5tA",
        github: "https://github.com/yahya-slmn/shield-insurance-analytics",
        badges: ["Power BI", "Insurance Analytics", "Advanced DAX", "Customer Segmentation", "Revenue", "Sales Mode"],
        gallery: [
            "Bi projects/shield-insurance-analytics/Screenshots/Home_View.png",
            "Bi projects/shield-insurance-analytics/Screenshots/General_view.png",
            "Bi projects/shield-insurance-analytics/Screenshots/Sales_Mode_analysis.png",
            "Bi projects/shield-insurance-analytics/Screenshots/Age_Group_analysis.png",
            "Bi projects/shield-insurance-analytics/Screenshots/Data_Model.png"
        ],
        skills: [
            "Analyzed 26.84K customers and 989.25M INR premium revenue across insurance segments.",
            "Created dynamic age-group, city, policy, month, and sales-mode analysis pages.",
            "Built DAX measures for customer growth, revenue growth, and expected settlement tracking.",
            "Compared online and offline sales channels to highlight performance differences.",
            "Designed a final presentation-ready Power BI report with modern dark visual storytelling."
        ],
        link: "https://app.powerbi.com/view?r=eyJrIjoiYjNkOGU2NGUtNTAwYy00YjEyLTk5YTQtOGIzM2MyNGRlYzA3IiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9&pageName=272372f9a00609542007"
    },

    pythonExpense: {
        title: "Expense Tracking Analytics System",
        category: "Python + FastAPI Project",
        domain: "Domain/Function: Expense Tracking, Financial Analytics, API Development",
        description: "Full-stack expense tracking analytics application built with Python, FastAPI, Streamlit, and MySQL to manage expenses, connect a REST API, and visualize category and monthly spending patterns.",
        image: "python projects/expense-tracking-analytics-system/screenshots/dashboard_overview.png",
        imageCaption: "Expense analytics system with dashboard overview, monthly trends, and category-level spending analysis.",
        linkedin: "#",
        github: "https://github.com/yahya-slmn/expense-tracking-analytics-system",
        demo: "https://expense-tracking-analytics.streamlit.app",
        badges: ["Python", "FastAPI", "Streamlit", "MySQL", "REST API", "Analytics Dashboard"],
        gallery: [
            "python projects/expense-tracking-analytics-system/screenshots/dashboard_overview.png",
            "python projects/expense-tracking-analytics-system/screenshots/monthly_analytics.png",
            "python projects/expense-tracking-analytics-system/screenshots/category_analysis.png"
        ],
        skills: [
            "Built a FastAPI backend to create, update, retrieve, and analyze expense records.",
            "Connected Streamlit frontend pages to backend endpoints using REST API requests.",
            "Used MySQL for persistent expense storage and SQL-based data retrieval.",
            "Created monthly and category analytics views for financial tracking.",
            "Structured the project like a real analytics product with separated frontend, backend, and database layers."
        ],
        link: "#"
    },

    pythonAnalytics: {
        title: "AI-Powered Business Analytics Dashboard",
        category: "Python + Streamlit Project",
        domain: "Domain/Function: Automated Data Analysis, Business Insights, Dashboarding",
        description: "Python analytics dashboard that accepts business datasets, generates KPI summaries, trend analysis, category performance views, anomaly detection, and business insights through an interactive Streamlit interface.",
        image: "python projects/ai-business-analytics-dashboard/screenshots/01_dashboard_overview.png",
        imageCaption: "AI-powered business analytics dashboard showing KPIs, trends, category analysis, anomaly detection, and insight sections.",
        linkedin: "#",
        github: "https://github.com/yahya-slmn/ai-business-analytics-dashboard",
        demo: "https://ai-business-analytics-dashboard-fsvu2gr6odbjshe5bdvsgu.streamlit.app",
        badges: ["Python", "Streamlit", "Pandas", "Matplotlib", "Anomaly Detection", "Business Insights"],
        gallery: [
            "python projects/ai-business-analytics-dashboard/screenshots/01_dashboard_overview.png",
            "python projects/ai-business-analytics-dashboard/screenshots/02_kpi_section.png",
            "python projects/ai-business-analytics-dashboard/screenshots/03_trend_analysis.png",
            "python projects/ai-business-analytics-dashboard/screenshots/04_category_analysis.png",
            "python projects/ai-business-analytics-dashboard/screenshots/05_anomaly_detection.png",
            "python projects/ai-business-analytics-dashboard/screenshots/06_business_insights.png"
        ],
        skills: [
            "Built an interactive Streamlit dashboard for uploaded or prepared business datasets.",
            "Generated KPI cards, trend analysis, category analysis, and anomaly-detection outputs.",
            "Used pandas for data preparation, aggregation, and analytical calculations.",
            "Improved dashboard readability with formatted numbers, clean charts, and business-friendly sections.",
            "Designed the project to show how coding skills can automate the first layer of data analysis."
        ],
        link: "#"
    },

    sqlSales: {
        title: "Sales Order SQL Analysis",
        category: "SQL Project",
        domain: "Domain/Function: Orders, Cities, Products, Delivery Performance",
        description: "SQL sales-order analysis project using MySQL to answer business questions about top products, city performance, monthly trends, delivery performance, and schema design.",
        image: "SQL projects/sql-sales-order-analysis/screenshots/sql_workbench_overview.png",
        imageCaption: "SQL workbench overview with query outputs for products, cities, monthly trends, and delivery performance.",
        linkedin: "#",
        github: "https://github.com/yahya-slmn/sql-sales-order-analysis",
        badges: ["SQL", "MySQL", "Joins", "Aggregations", "Schema Design", "Business Queries"],
        gallery: [
            "SQL projects/sql-sales-order-analysis/screenshots/sql_workbench_overview.png",
            "SQL projects/sql-sales-order-analysis/screenshots/schema_design.png",
            "SQL projects/sql-sales-order-analysis/screenshots/query_1_top_products.png",
            "SQL projects/sql-sales-order-analysis/screenshots/query_2_city_analysis.png",
            "SQL projects/sql-sales-order-analysis/screenshots/query_3_monthly_trend.png",
            "SQL projects/sql-sales-order-analysis/screenshots/query_4_delivery_performance.png"
        ],
        skills: [
            "Designed a clean SQL schema for sales-order analysis.",
            "Wrote queries to identify top products and city-level sales performance.",
            "Built monthly trend outputs using date-based aggregation.",
            "Analyzed delivery performance through SQL grouping and business filters.",
            "Converted raw order tables into clear, reporting-ready business answers."
        ],
        link: "#"
    },

    sqlCustomer: {
        title: "Retail Sales SQL Analytics",
        category: "SQL Project",
        domain: "Domain/Function: Retail Revenue, Product Ranking, Profit Margin, Stored Procedures",
        description: "Retail SQL analytics project using MySQL to analyze revenue growth, sales volume, product revenue ranking, profit margin logic, and reusable SQL procedures/functions.",
        image: "SQL projects/retail-sales-sql-analytics/screenshots/erd_diagram.png",
        imageCaption: "Retail SQL analytics case study with ERD, database volume, revenue growth, ranking, functions, and procedures.",
        linkedin: "#",
        github: "https://github.com/yahya-slmn/retail-sales-sql-analytics",
        badges: ["SQL", "MySQL", "ERD", "Stored Procedures", "Functions", "Revenue Analysis"],
        gallery: [
            "SQL projects/retail-sales-sql-analytics/screenshots/erd_diagram.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/database_volume.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/monthly_revenue_growth.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/monthly_sales_view_output.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/product_revenue_ranking.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/profit_margin_function.png",
            "SQL projects/retail-sales-sql-analytics/screenshots/store_sales_procedure_output.png"
        ],
        skills: [
            "Designed a retail database structure and documented the ERD for the project.",
            "Analyzed monthly revenue growth and sales-volume patterns using SQL queries.",
            "Ranked products by revenue to identify strongest retail performers.",
            "Created reusable SQL functions for profit-margin logic.",
            "Built stored procedures and reporting-ready outputs for repeatable business analysis."
        ],
        link: "#"
    }

};

/* ---------- Project Modal ---------- */
function openProjectModal(projectKey) {
    const project = projects[projectKey];

    if (!project || !projectModal) return;

    document.getElementById("modalCategory").innerText = project.category;
    document.getElementById("modalTitle").innerText = project.title;
    document.getElementById("modalDomain").innerText = project.domain;
    document.getElementById("modalDescription").innerText = project.description;
    document.getElementById("modalImage").src = project.image;
    document.getElementById("modalImageCaption").innerText = project.imageCaption;
    const dashboardBtn = document.getElementById("dashboardBtn");
    const linkedinBtn = document.getElementById("linkedinBtn");
    const githubBtn = document.getElementById("githubBtn");
    const demoBtn = document.getElementById("demoBtn");

    if (dashboardBtn) {
        dashboardBtn.href = project.link || "#";
        dashboardBtn.style.display = project.link && project.link !== "#" ? "inline-flex" : "none";
    }

    if (githubBtn) {
        githubBtn.href = project.github || "#";
        githubBtn.style.display = project.github && project.github !== "#" ? "inline-flex" : "none";
    }

    if (linkedinBtn) {
        linkedinBtn.href = project.linkedin || "#";
        linkedinBtn.style.display = project.linkedin && project.linkedin !== "#" ? "inline-flex" : "none";
    }

    if (demoBtn) {
        demoBtn.href = project.demo || "#";
        demoBtn.style.display = project.demo ? "inline-flex" : "none";
    }

    renderProjectBadges(project.badges);
    renderProjectSkills(project.skills);

    projectModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    setupProjectGallery(project);
}

function closeProjectModal() {
    if (!projectModal) return;

    projectModal.style.display = "none";
    document.body.style.overflow = "";
}


function setupProjectGallery(project) {
    const modalImage = document.getElementById("modalImage");
    const galleryCounter = document.getElementById("galleryCounter");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    if (!modalImage) return;

    window.currentProjectGallery = Array.isArray(project.gallery) && project.gallery.length
        ? project.gallery
        : [project.image];

    window.currentGalleryIndex = 0;

    modalImage.src = window.currentProjectGallery[0];
    modalImage.alt = `${project.title} preview`;

    const hasMultipleImages = window.currentProjectGallery.length > 1;

    if (prevBtn && nextBtn) {
        prevBtn.style.display = hasMultipleImages ? "flex" : "none";
        nextBtn.style.display = hasMultipleImages ? "flex" : "none";
    }

    if (galleryCounter) {
        galleryCounter.style.display = hasMultipleImages ? "block" : "none";
    }

    renderGalleryThumbnails();
    updateGalleryState();
}

function changeProjectImage(direction) {
    if (!window.currentProjectGallery || window.currentProjectGallery.length <= 1) return;

    window.currentGalleryIndex =
        (window.currentGalleryIndex + direction + window.currentProjectGallery.length) %
        window.currentProjectGallery.length;

    updateGalleryState(true);
}

function selectProjectImage(index) {
    if (!window.currentProjectGallery || !window.currentProjectGallery[index]) return;

    window.currentGalleryIndex = index;
    updateGalleryState(true);
}

function updateGalleryState(animate = false) {
    const modalImage = document.getElementById("modalImage");
    const galleryCounter = document.getElementById("galleryCounter");
    const thumbnails = document.querySelectorAll(".gallery-thumb");

    if (!modalImage || !window.currentProjectGallery) return;

    const activeImage = window.currentProjectGallery[window.currentGalleryIndex];

    if (animate) {
        modalImage.classList.add("image-switching");

        setTimeout(() => {
            modalImage.src = activeImage;
            modalImage.classList.remove("image-switching");
        }, 160);
    } else {
        modalImage.src = activeImage;
    }

    if (galleryCounter) {
        galleryCounter.textContent = `${window.currentGalleryIndex + 1} / ${window.currentProjectGallery.length}`;
    }

    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === window.currentGalleryIndex);
    });
}

function renderGalleryThumbnails() {
    const thumbnailsBox = document.getElementById("galleryThumbnails");

    if (!thumbnailsBox || !window.currentProjectGallery) return;

    thumbnailsBox.innerHTML = "";

    if (window.currentProjectGallery.length <= 1) {
        thumbnailsBox.style.display = "none";
        return;
    }

    thumbnailsBox.style.display = "flex";

    window.currentProjectGallery.forEach((image, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "gallery-thumb";
        button.setAttribute("aria-label", `Show project image ${index + 1}`);
        button.onclick = () => selectProjectImage(index);

        const imageName = image.toLowerCase();

        if (
            imageName.includes("sql") ||
            imageName.includes("ad_hoc")
        ) {
            button.classList.add("sql-thumb");
        }

        if (
            imageName.includes("python") ||
            imageName.includes("automation") ||
            imageName.includes("analytics") ||
            imageName.includes("category") ||
            imageName.includes("add_update")
        ) {
            button.classList.add("python-thumb");
        }

        const img = document.createElement("img");
        img.src = image;
        img.alt = "";

        button.appendChild(img);
        thumbnailsBox.appendChild(button);
    });
}


function renderProjectBadges(badges) {
    const badgesBox = document.getElementById("modalBadges");

    if (!badgesBox) return;

    badgesBox.innerHTML = "";

    badges.forEach(badge => {
        const span = document.createElement("span");
        span.innerText = badge;
        badgesBox.appendChild(span);
    });
}

function renderProjectSkills(skills) {
    const skillsList = document.getElementById("modalSkills");

    if (!skillsList) return;

    skillsList.innerHTML = "";

    skills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        skillsList.appendChild(li);
    });
}

window.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});

/* ---------- Scroll Reveal ---------- */
function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const revealPoint = 120;

        const isVisible = elementTop < windowHeight - revealPoint && elementBottom > revealPoint;

        element.classList.toggle("active", isVisible);
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ---------- Animated Skill Bars ---------- */
function initSkillLevels() {
    skillCards.forEach(card => {
        const percent = card.dataset.percent || "0";
        card.style.setProperty("--skill-level", `${percent}%`);
    });
}

function revealSkillBars() {
    skillCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const visible = cardTop < window.innerHeight - 80;

        if (visible) {
            card.classList.add("skill-visible");
        }
    });
}

initSkillLevels();
window.addEventListener("scroll", revealSkillBars);
window.addEventListener("load", revealSkillBars);

/* ---------- Interactive Profile Image ---------- */
const homeImgBox = document.querySelector(".home-img");
const homeImg = document.querySelector(".home-img img");

if (homeImgBox && homeImg) {
    homeImgBox.addEventListener("mousemove", event => {
        if (window.innerWidth <= 991) return;

        const rect = homeImgBox.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((centerY - y) / centerY) * 8;

        homeImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    homeImgBox.addEventListener("mouseleave", () => {
        homeImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
}


/* ---------- Animated KPI Counters ---------- */
function animateCounter(counter) {
    if (counter.dataset.counted === "true") return;

    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const duration = 1200;
    const startTime = performance.now();

    counter.dataset.counted = "true";

    function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);

        counter.textContent = `${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

function revealCounters() {
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();

        if (rect.top < window.innerHeight - 80) {
            animateCounter(counter);
        }
    });
}

window.addEventListener("scroll", revealCounters);
window.addEventListener("load", revealCounters);

/* ---------- Cursor Glow ---------- */
if (cursorGlow) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let glowX = cursorX;
    let glowY = cursorY;

    window.addEventListener("pointermove", event => {
        cursorX = event.clientX;
        cursorY = event.clientY;
        cursorGlow.classList.add("cursor-active");
    });

    const hoverTargets = document.querySelectorAll("a, button, .project-card, .skill-card, .about-card, .cert-card, .stat-box");

    hoverTargets.forEach(target => {
        target.addEventListener("mouseenter", () => cursorGlow.classList.add("cursor-strong"));
        target.addEventListener("mouseleave", () => cursorGlow.classList.remove("cursor-strong"));
    });

    function animateGlow() {
        glowX += (cursorX - glowX) * 0.14;
        glowY += (cursorY - glowY) * 0.14;
        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ---------- Magnetic Buttons ---------- */
magneticItems.forEach(item => {
    item.addEventListener("mousemove", event => {
        if (window.innerWidth <= 991) return;

        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        item.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0, 0)";
    });
});

/* ---------- Cinematic Project Parallax ---------- */
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth <= 991) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${-y * 8}deg`);
        card.style.setProperty("--tilt-y", `${x * 10}deg`);
        card.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
    });
});

/* ---------- Portfolio Chatbot Assistant ---------- */
const portfolioBotBtn = document.getElementById("portfolioBotBtn");
const portfolioChatbot = document.getElementById("portfolioChatbot");
const portfolioBotClose = document.getElementById("portfolioBotClose");
const assistantMessages = document.getElementById("assistantMessages");
const portfolioChatForm = document.getElementById("portfolioChatForm");
const portfolioChatInput = document.getElementById("portfolioChatInput");

const assistantReplies = {
    projects: "Yahya's strongest projects are Business Insights 360, Shield Insurance Analytics, AtliQ Grands Hospitality Analytics, plus Python and SQL portfolio cases. They show dashboard storytelling, KPI thinking, data modeling, and business-focused analysis.",
    skills: "Core skills include Power BI, SQL, DAX, Power Query, Excel, Python, MySQL, data modeling, dashboard UX design, and presentation storytelling.",
    hire: "Yahya combines technical analytics with strong visual communication. He builds dashboards that are clean, decision-ready, and designed for stakeholders, not just for charts.",
    contact: "You can contact Yahya by email at yahyasleiman01@gmail.com, LinkedIn, WhatsApp, or phone using the buttons in the Contact section."
};

function openPortfolioBot() {
    if (!portfolioChatbot) return;

    portfolioChatbot.classList.add("active");
    portfolioChatbot.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        if (portfolioChatInput) portfolioChatInput.focus();
    }, 250);
}

function closePortfolioBot() {
    if (!portfolioChatbot) return;

    portfolioChatbot.classList.remove("active");
    portfolioChatbot.setAttribute("aria-hidden", "true");
}

if (portfolioBotBtn) {
    portfolioBotBtn.addEventListener("click", () => {

        const isOpen =
            portfolioChatbot.classList.contains("active");

        if (isOpen) {
            closePortfolioBot();
        } else {
            openPortfolioBot();
        }

    });
}

if (portfolioBotClose) {
    portfolioBotClose.addEventListener("click", closePortfolioBot);
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closePortfolioBot();
    }
});

function addAssistantMessage(text, type = "bot") {
    if (!assistantMessages) return;

    const message = document.createElement("div");
    message.className = type === "user" ? "user-message" : "bot-message";
    message.textContent = text;

    assistantMessages.appendChild(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function getPortfolioAnswer(question) {
    const q = question.toLowerCase();

    if (q.includes("power bi") || q.includes("dashboard") || q.includes("bi")) {
        return "Yahya's Power BI work includes Business Insights 360, Shield Insurance Analytics, and AtliQ Grands Hospitality Analytics. These projects focus on KPIs, DAX, data modeling, executive reporting, and dashboard storytelling.";
    }

    if (q.includes("sql") || q.includes("mysql") || q.includes("database") || q.includes("schema") || q.includes("stored") || q.includes("view") || q.includes("function")) {
        return "Yahya's SQL projects include ad-hoc sales analysis and SQL database architecture. They cover joins, aggregations, schema design, stored procedures, SQL functions, views, and reporting-ready outputs.";
    }

    if (q.includes("python") || q.includes("fastapi") || q.includes("streamlit") || q.includes("pandas") || q.includes("automation")) {
        return "Yahya's Python work includes an Expense Tracking Analytics System using FastAPI, Streamlit, MySQL, and analytics workflows, plus an automation-focused Python analytics app using pandas and reporting logic.";
    }

    if (q.includes("skill") || q.includes("tools") || q.includes("tech")) {
        return assistantReplies.skills;
    }

    if (q.includes("cert") || q.includes("pl-300") || q.includes("microsoft")) {
        return "Yahya holds the Microsoft PL-300 Power BI Data Analyst certification and has also completed data analytics, Python, SQL, IBM Full Stack, and Codebasics internship-related learning paths.";
    }

    if (q.includes("hire") || q.includes("why") || q.includes("strength")) {
        return assistantReplies.hire;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("whatsapp")) {
        return assistantReplies.contact;
    }

    if (q.includes("project")) {
        return assistantReplies.projects;
    }

    return "This portfolio focuses on data analytics, Power BI dashboards, SQL analysis, Python analytics apps, and business storytelling. Try asking: 'What are Yahya's strongest projects?', 'What SQL skills does he show?', or 'Why hire Yahya?'.";
}

document.querySelectorAll(".assistant-quick-actions button").forEach(button => {
    button.addEventListener("click", () => {
        const key = button.dataset.question;
        const questionText = button.textContent.trim();

        addAssistantMessage(questionText, "user");

        setTimeout(() => {
            addAssistantMessage(assistantReplies[key] || getPortfolioAnswer(questionText));
        }, 220);
    });
});

if (portfolioChatForm) {
    portfolioChatForm.addEventListener("submit", event => {
        event.preventDefault();

        const question = portfolioChatInput.value.trim();
        if (!question) return;

        addAssistantMessage(question, "user");
        portfolioChatInput.value = "";

        setTimeout(() => {
            addAssistantMessage(getPortfolioAnswer(question));
        }, 260);
    });
}

/* ---------- Hidden Easter Egg ---------- */
let secretKeys = "";
const secretWord = "powerbi";

window.addEventListener("keydown", event => {
    secretKeys = (secretKeys + event.key.toLowerCase()).slice(-secretWord.length);

    if (secretKeys === secretWord) {
        document.body.classList.add("analytics-mode");
        addAssistantMessage("Analytics Mode Activated ⚡ Power BI energy unlocked.");

        setTimeout(() => {
            document.body.classList.remove("analytics-mode");
        }, 2600);
    }
});

/* ---------- Clean JavaScript Typing Animation ---------- */
/* ---------- Smooth JavaScript Typing Animation ---------- */
const typedRole = document.getElementById("typed-role");

const roles = [
    "Power BI Analyst",
    "BI Storyteller",
    "SQL Analyst",
    "Python Builder",
    "Data Viz Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    if (!typedRole) return;

    const currentRole = roles[roleIndex];

    typedRole.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
    } else {
        charIndex--;
    }

    let speed = isDeleting ? 45 : 75;

    if (!isDeleting && charIndex > currentRole.length) {
        speed = 1400;
        isDeleting = true;
    }

    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }

    setTimeout(typeRole, speed);
}

setTimeout(typeRole, 600);

const certModal = document.getElementById("certModal");
const certFrame = document.getElementById("certFrame");
const certModalTitle = document.getElementById("certModalTitle");
const certPdfStage = document.getElementById("certPdfStage");
const certZoomIn = document.getElementById("certZoomIn");
const certZoomOut = document.getElementById("certZoomOut");
const certZoomLabel = document.getElementById("certZoomLabel");
const certOpenPdf = document.getElementById("certOpenPdf");

let currentCertPath = "";
let certZoomLevel = 1;

function updateCertZoom() {
    if (!certPdfStage || !certZoomLabel) return;

    certPdfStage.style.transform = `scale(${certZoomLevel})`;
    certZoomLabel.textContent = `${Math.round(certZoomLevel * 100)}%`;
}

function openCertModal(pdfPath, title) {
    if (!certModal || !certFrame || !certModalTitle) return;

    currentCertPath = pdfPath;
    certZoomLevel = 1;

    certModalTitle.textContent = title;
    certFrame.src = pdfPath;

    if (certOpenPdf) {
        certOpenPdf.onclick = () => window.open(currentCertPath, "_blank", "noopener,noreferrer");
    }

    updateCertZoom();

    certModal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeCertModal() {
    if (!certModal || !certFrame) return;

    certModal.style.display = "none";
    certFrame.src = "";
    currentCertPath = "";
    certZoomLevel = 1;
    updateCertZoom();
    document.body.style.overflow = "";
}

if (certZoomIn) {
    certZoomIn.addEventListener("click", () => {
        certZoomLevel = Math.min(certZoomLevel + 0.15, 2.2);
        updateCertZoom();
    });
}

if (certZoomOut) {
    certZoomOut.addEventListener("click", () => {
        certZoomLevel = Math.max(certZoomLevel - 0.15, 0.75);
        updateCertZoom();
    });
}

/* ---------- Certificate Modal Close Helpers ---------- */
window.addEventListener("click", event => {
    if (event.target === certModal) {
        closeCertModal();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCertModal();
    }
});


/* ---------- Mobile Project Category Toggle ---------- */
document.querySelectorAll(".project-category-card .category-header").forEach(header => {
    header.addEventListener("click", () => {
        if (window.innerWidth > 991) return;
        const card = header.closest(".project-category-card");
        document.querySelectorAll(".project-category-card.active").forEach(openCard => {
            if (openCard !== card) openCard.classList.remove("active");
        });
        card.classList.toggle("active");
    });
});

/* =========================================================
   INSANE PROJECT SECTION UPGRADE
   Mouse glow, depth tilt, keyboard access, reveal animation
   ========================================================= */
(function initInsaneProjectHub() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card, index) => {
        card.style.setProperty("--project-index", index % 3);

        card.addEventListener("mousemove", event => {
            if (window.innerWidth <= 991) return;

            const rect = card.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const xPercent = (mouseX / rect.width) * 100;
            const yPercent = (mouseY / rect.height) * 100;

            const rotateY = ((mouseX / rect.width) - 0.5) * 13;
            const rotateX = ((mouseY / rect.height) - 0.5) * -11;

            card.style.setProperty("--mouse-x", `${xPercent}%`);
            card.style.setProperty("--mouse-y", `${yPercent}%`);
            card.style.setProperty("--shine-x", `${xPercent}%`);
            card.style.setProperty("--shine-y", `${yPercent}%`);
            card.style.setProperty("--tilt-x", `${rotateX}deg`);
            card.style.setProperty("--tilt-y", `${rotateY}deg`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--tilt-x", "0deg");
            card.style.setProperty("--tilt-y", "0deg");
            card.style.setProperty("--mouse-x", "50%");
            card.style.setProperty("--mouse-y", "50%");
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });
    });

    if ("IntersectionObserver" in window) {
        const projectObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("project-visible");
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.22 });

        cards.forEach(card => projectObserver.observe(card));
    } else {
        cards.forEach(card => card.classList.add("project-visible"));
    }
})();


/* ---------- Modal Gallery Keyboard Controls ---------- */
document.addEventListener("keydown", event => {
    if (!projectModal || projectModal.style.display !== "flex") return;

    if (event.key === "ArrowRight") {
        changeProjectImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeProjectImage(-1);
    }
});

/* ---------- Certificate Zoom ---------- */

document.querySelectorAll(".cert-image-wrapper").forEach(wrapper => {

    wrapper.addEventListener("click", () => {

        wrapper.classList.toggle("zoomed");

    });

});

/* ---------- Mobile Project Category Toggle ---------- */

document.querySelectorAll(".project-category-card").forEach(category => {
    category.addEventListener("click", event => {
        if (event.target.closest(".project-card")) return;

        category.classList.toggle("active");
    });
});
