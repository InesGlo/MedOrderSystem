// MedOrder Musanze - Complete Medicine Ordering System
class MedOrderApp {
    constructor() {
        this.users = [];
        this.medicines = [];
        this.orders = [];
        this.prescriptions = [];
        this.pharmacies = [];
        this.notifications = [];
        this.currentUser = null;
        this.userLocation = null;
        this.encryptionKey = null;
        this.auditLog = [];
        this.init();
    }

    // Initialize Application
    init() {
        // Clear old localStorage data only if explicitly requested
        if (localStorage.getItem('medorder_musanze_clear_data') === 'true') {
            console.log('Clearing old localStorage data...');
            localStorage.removeItem('medorder_musanze_users_encrypted');
            localStorage.removeItem('medorder_musanze_medicines_encrypted');
            localStorage.removeItem('medorder_musanze_orders_encrypted');
            localStorage.removeItem('medorder_musanze_prescriptions_encrypted');
            localStorage.removeItem('medorder_musanze_pharmacies_encrypted');
            localStorage.removeItem('medorder_musanze_current_user_encrypted');
            localStorage.removeItem('medorder_musanze_clear_data');
        }
        
        this.loadMockData();
        this.setupEventListeners();
        this.checkAuthState();
        this.initializeGPS();
        this.initializeMap();
        this.setupSecurity();
        this.startRealTimeUpdates();
    }

    // Load Mock Data
    loadMockData() {
        // Load from localStorage or use mock data
        const savedUsers = localStorage.getItem('medorder_musanze_users_encrypted');
        if (savedUsers) {
            this.users = this.decryptData(savedUsers) || [];
        } else {
            // Mock user data
            this.users = [
                {
                    id: 1,
                    username: 'admin',
                    email: 'admin@medorder.musanze.rw',
                    password: this.hashPassword('admin123'),
                    fullName: 'System Administrator',
                    accountType: 'admin',
                    phone: '+250788123456',
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true,
                    securityLevel: 'high'
                },
                {
                    id: 2,
                    username: 'patient1',
                    email: 'patient@medorder.musanze.rw',
                    password: this.hashPassword('patient123'),
                    fullName: 'Jean Patient',
                    accountType: 'patient',
                    phone: '+250787654321',
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true,
                    securityLevel: 'standard'
                },
                {
                    id: 3,
                    username: 'pharmacy1',
                    email: 'pharmacy@medorder.musanze.rw',
                    password: this.hashPassword('pharmacy123'),
                    fullName: 'Marie Pharmacist',
                    accountType: 'pharmacy',
                    phone: '+250786543210',
                    licenseNumber: 'PHARM-2024-001',
                    pharmacyId: 1, // Assigned to Musanze Central Pharmacy
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true,
                    securityLevel: 'high'
                },
                {
                    id: 4,
                    username: 'doctor1',
                    email: 'doctor@medorder.musanze.rw',
                    password: this.hashPassword('doctor123'),
                    fullName: 'Dr. Paul Mugisha',
                    accountType: 'doctor',
                    phone: '+250785432109',
                    licenseNumber: 'MED-2024-001',
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true,
                    securityLevel: 'high'
                }
            ];
            this.saveUsers();
        }

        const savedOrders = localStorage.getItem('medorder_musanze_orders_encrypted');
        if (savedOrders) {
            this.orders = this.decryptData(savedOrders) || [];
        } else {
            this.orders = [];
        }

        const savedMedicines = localStorage.getItem('medorder_musanze_medicines_encrypted');
        if (savedMedicines) {
            this.medicines = this.decryptData(savedMedicines) || [];
        } else {
            // Mock data for medicines - Rwanda/Musanze specific
            this.medicines = [
                {
                    id: 1,
                    name: 'Panadol Extra 500mg',
                    genericName: 'Paracetamol + Caffeine',
                    category: 'Pain Relief',
                    price: 600,
                    stock: 150,
                    requiresPrescription: false,
                    description: 'Advanced pain relief with caffeine for faster action',
                    manufacturer: 'GSK Rwanda',
                    expiryDate: '2025-12-31',
                    dosage: '500mg + 65mg tablets',
                    sideEffects: 'Rare allergic reactions, insomnia',
                    contraindications: 'Severe liver disease',
                    activeIngredients: 'Paracetamol 500mg, Caffeine 65mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.5,
                    reviews: 234,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 2,
                    name: 'Amoxil 500mg',
                    genericName: 'Amoxicillin Trihydrate',
                    category: 'Antibiotics',
                    price: 2500,
                    stock: 80,
                    requiresPrescription: true,
                    description: 'Broad-spectrum antibiotic for bacterial infections',
                    manufacturer: 'GSK Rwanda',
                    expiryDate: '2025-06-30',
                    dosage: '500mg capsules',
                    sideEffects: 'Nausea, diarrhea, allergic reactions',
                    contraindications: 'Penicillin allergy',
                    activeIngredients: 'Amoxicillin Trihydrate 500mg',
                    storageConditions: 'Store below 30°C',
                    rating: 4.7,
                    reviews: 156,
                    availability: 'available'
                },
                {
                    id: 3,
                    name: 'Brufen 400mg',
                    genericName: 'Ibuprofen',
                    category: 'Pain Relief',
                    price: 800,
                    stock: 120,
                    requiresPrescription: false,
                    description: 'Anti-inflammatory pain relief for arthritis and pain',
                    manufacturer: 'Pfizer Rwanda',
                    expiryDate: '2025-09-30',
                    dosage: '400mg tablets',
                    sideEffects: 'Stomach irritation, dizziness',
                    contraindications: 'Stomach ulcers, asthma',
                    activeIngredients: 'Ibuprofen 400mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.3,
                    reviews: 189,
                    availability: 'available'
                },
                {
                    id: 4,
                    name: 'Glucophage 500mg',
                    genericName: 'Metformin Hydrochloride',
                    category: 'Diabetes',
                    price: 1500,
                    stock: 60,
                    requiresPrescription: true,
                    description: 'Type 2 diabetes medication for blood sugar control',
                    manufacturer: 'Merck Rwanda',
                    expiryDate: '2025-08-31',
                    dosage: '500mg tablets',
                    sideEffects: 'Gastrointestinal upset, metallic taste',
                    contraindications: 'Kidney disease, metabolic acidosis',
                    activeIngredients: 'Metformin Hydrochloride 500mg',
                    storageConditions: 'Store below 30°C',
                    rating: 4.6,
                    reviews: 203,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 5,
                    name: 'Vitamin D3 1000IU',
                    genericName: 'Cholecalciferol',
                    category: 'Vitamins',
                    price: 1200,
                    stock: 200,
                    requiresPrescription: false,
                    description: 'Vitamin D supplement for bone health and immunity',
                    manufacturer: 'HealthPlus Rwanda',
                    expiryDate: '2026-03-31',
                    dosage: '1000IU softgels',
                    sideEffects: 'Rare allergic reactions',
                    contraindications: 'Hypercalcemia',
                    activeIngredients: 'Cholecalciferol 1000IU',
                    storageConditions: 'Store below 25°C',
                    rating: 4.8,
                    reviews: 145,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 6,
                    name: 'Coartem 80/480mg',
                    genericName: 'Artemether + Lumefantrine',
                    category: 'Malaria Treatment',
                    price: 3500,
                    stock: 100,
                    requiresPrescription: true,
                    description: 'Malaria treatment for uncomplicated malaria',
                    manufacturer: 'Novartis Rwanda',
                    expiryDate: '2025-11-30',
                    dosage: '80mg/480mg tablets (6 dose pack)',
                    sideEffects: 'Headache, dizziness, nausea',
                    contraindications: 'Severe malaria, pregnancy first trimester',
                    activeIngredients: 'Artemether 80mg, Lumefantrine 480mg',
                    storageConditions: 'Store below 30°C, protect from moisture',
                    rating: 4.9,
                    reviews: 312,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 7,
                    name: 'Loratadine 10mg',
                    genericName: 'Loratadine',
                    category: 'Allergy',
                    price: 900,
                    stock: 85,
                    requiresPrescription: false,
                    description: 'Antihistamine for allergy relief',
                    manufacturer: 'Bayer Rwanda',
                    expiryDate: '2025-10-31',
                    dosage: '10mg tablets',
                    sideEffects: 'Drowsiness, dry mouth',
                    contraindications: 'Severe liver impairment',
                    activeIngredients: 'Loratadine 10mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.4,
                    reviews: 167,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 8,
                    name: 'Omeprazole 20mg',
                    genericName: 'Omeprazole',
                    category: 'Digestive Health',
                    price: 1800,
                    stock: 70,
                    requiresPrescription: true,
                    description: 'Proton pump inhibitor for acid reflux and ulcers',
                    manufacturer: 'AstraZeneca Rwanda',
                    expiryDate: '2025-07-31',
                    dosage: '20mg capsules',
                    sideEffects: 'Headache, diarrhea, abdominal pain',
                    contraindications: 'Severe liver disease',
                    activeIngredients: 'Omeprazole 20mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.6,
                    reviews: 198,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 9,
                    name: 'Artemisinin 100mg',
                    genericName: 'Artemisinin',
                    category: 'Malaria Treatment',
                    price: 2800,
                    stock: 90,
                    requiresPrescription: true,
                    description: 'Traditional malaria treatment supplement',
                    manufacturer: 'Rwanda BioPharma',
                    expiryDate: '2025-09-30',
                    dosage: '100mg capsules',
                    sideEffects: 'Nausea, dizziness',
                    contraindications: 'Pregnancy, severe malaria',
                    activeIngredients: 'Artemisinin 100mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.5,
                    reviews: 134,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 10,
                    name: 'Folic Acid 5mg',
                    genericName: 'Folic Acid',
                    category: 'Vitamins',
                    price: 500,
                    stock: 180,
                    requiresPrescription: false,
                    description: 'Essential B vitamin for pregnancy and blood health',
                    manufacturer: 'Rwanda Pharmaceuticals',
                    expiryDate: '2026-01-31',
                    dosage: '5mg tablets',
                    sideEffects: 'Rare allergic reactions',
                    contraindications: 'Vitamin B12 deficiency',
                    activeIngredients: 'Folic Acid 5mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.7,
                    reviews: 156,
                    availability: 'available'
                },
                {
                    id: 11,
                    name: 'Ciprofloxacin 500mg',
                    genericName: 'Ciprofloxacin',
                    category: 'Antibiotics',
                    price: 2200,
                    stock: 65,
                    requiresPrescription: true,
                    description: 'Broad-spectrum antibiotic for various infections',
                    manufacturer: 'Cipla Rwanda',
                    expiryDate: '2025-08-31',
                    dosage: '500mg tablets',
                    sideEffects: 'Nausea, diarrhea, tendon inflammation',
                    contraindications: 'Pregnancy, children under 18',
                    activeIngredients: 'Ciprofloxacin 500mg',
                    storageConditions: 'Store below 30°C',
                    rating: 4.4,
                    reviews: 143,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 12,
                    name: 'Salbutamol Inhaler 100mcg',
                    genericName: 'Albuterol',
                    category: 'Respiratory',
                    price: 4500,
                    stock: 45,
                    requiresPrescription: true,
                    description: 'Bronchodilator for asthma and COPD',
                    manufacturer: 'GSK Rwanda',
                    expiryDate: '2025-06-30',
                    dosage: '100mcg per dose, 200 doses',
                    sideEffects: 'Tremor, headache, rapid heartbeat',
                    contraindications: 'Severe heart conditions',
                    activeIngredients: 'Albuterol sulfate 100mcg',
                    storageConditions: 'Store below 25°C, protect from sunlight',
                    rating: 4.8,
                    reviews: 267,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 13,
                    name: 'Iron Tablets 200mg',
                    genericName: 'Ferrous Sulfate',
                    category: 'Vitamins',
                    price: 800,
                    stock: 120,
                    requiresPrescription: false,
                    description: 'Iron supplement for anemia prevention',
                    manufacturer: 'Rwanda Pharmaceuticals',
                    expiryDate: '2025-12-31',
                    dosage: '200mg elemental iron',
                    sideEffects: 'Constipation, dark stools',
                    contraindications: 'Hemochromatosis',
                    activeIngredients: 'Ferrous Sulfate 200mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.3,
                    reviews: 189,
                    availability: 'available'
                },
                {
                    id: 14,
                    name: 'Hydrochlorothiazide 25mg',
                    genericName: 'HCTZ',
                    category: 'Heart Health',
                    price: 1200,
                    stock: 95,
                    requiresPrescription: true,
                    description: 'Diuretic for high blood pressure and fluid retention',
                    manufacturer: 'Novartis Rwanda',
                    expiryDate: '2025-09-30',
                    dosage: '25mg tablets',
                    sideEffects: 'Frequent urination, dizziness, electrolyte imbalance',
                    contraindications: 'Severe kidney disease, gout',
                    activeIngredients: 'Hydrochlorothiazide 25mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.5,
                    reviews: 178,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 15,
                    name: 'Azithromycin 500mg',
                    genericName: 'Azithromycin',
                    category: 'Antibiotics',
                    price: 3200,
                    stock: 55,
                    requiresPrescription: true,
                    description: 'Macrolide antibiotic for respiratory infections',
                    manufacturer: 'Pfizer Rwanda',
                    expiryDate: '2025-07-31',
                    dosage: '500mg tablets (3-day course)',
                    sideEffects: 'Nausea, diarrhea, abdominal pain',
                    contraindications: 'Severe liver disease',
                    activeIngredients: 'Azithromycin 500mg',
                    storageConditions: 'Store below 30°C',
                    rating: 4.6,
                    reviews: 145,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 16,
                    name: 'Vitamin C 500mg',
                    genericName: 'Ascorbic Acid',
                    category: 'Vitamins',
                    price: 400,
                    stock: 250,
                    requiresPrescription: false,
                    description: 'Vitamin C supplement for immunity and skin health',
                    manufacturer: 'HealthPlus Rwanda',
                    expiryDate: '2026-02-28',
                    dosage: '500mg chewable tablets',
                    sideEffects: 'Rare allergic reactions',
                    contraindications: 'Kidney stones (high doses)',
                    activeIngredients: 'Ascorbic Acid 500mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.7,
                    reviews: 234,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 17,
                    name: 'Amlodipine 10mg',
                    genericName: 'Amlodipine Besylate',
                    category: 'Heart Health',
                    price: 2800,
                    stock: 75,
                    requiresPrescription: true,
                    description: 'Calcium channel blocker for high blood pressure',
                    manufacturer: 'Pfizer Rwanda',
                    expiryDate: '2025-10-31',
                    dosage: '10mg tablets',
                    sideEffects: 'Swelling, headache, dizziness',
                    contraindications: 'Severe aortic stenosis',
                    activeIngredients: 'Amlodipine Besylate 10mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.5,
                    reviews: 167,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 18,
                    name: 'Deworming Tablets 400mg',
                    genericName: 'Albendazole',
                    category: 'Parasite Treatment',
                    price: 600,
                    stock: 150,
                    requiresPrescription: false,
                    description: 'Broad-spectrum deworming medication',
                    manufacturer: 'Rwanda Pharmaceuticals',
                    expiryDate: '2025-11-30',
                    dosage: '400mg single dose tablet',
                    sideEffects: 'Abdominal pain, nausea, headache',
                    contraindications: 'Pregnancy (first trimester)',
                    activeIngredients: 'Albendazole 400mg',
                    storageConditions: 'Store below 25°C',
                    rating: 4.4,
                    reviews: 198,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 19,
                    name: 'Antacid Liquid 200ml',
                    genericName: 'Aluminum Hydroxide + Magnesium',
                    category: 'Digestive Health',
                    price: 1500,
                    stock: 85,
                    requiresPrescription: false,
                    description: 'Antacid for heartburn and indigestion relief',
                    manufacturer: 'GSK Rwanda',
                    expiryDate: '2025-08-31',
                    dosage: '200ml bottle',
                    sideEffects: 'Constipation, diarrhea',
                    contraindications: 'Kidney disease',
                    activeIngredients: 'Aluminum Hydroxide, Magnesium Hydroxide',
                    storageConditions: 'Store below 25°C',
                    rating: 4.3,
                    reviews: 156,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                },
                {
                    id: 20,
                    name: 'Multivitamin Tablets',
                    genericName: 'Multivitamin Complex',
                    category: 'Vitamins',
                    price: 1800,
                    stock: 110,
                    requiresPrescription: false,
                    description: 'Complete daily multivitamin supplement',
                    manufacturer: 'HealthPlus Rwanda',
                    expiryDate: '2026-01-31',
                    dosage: '30 tablets (1 month supply)',
                    sideEffects: 'Rare allergic reactions',
                    contraindications: 'Hypervitaminosis',
                    activeIngredients: 'Vitamins A, B Complex, C, D, E, Minerals',
                    storageConditions: 'Store below 25°C',
                    rating: 4.6,
                    reviews: 189,
                    availability: 'available',
                    pharmacyId: 1 // Assigned to Musanze Central Pharmacy
                }
            ];
            this.saveMedicines();
        }

        const savedPharmacies = localStorage.getItem('medorder_musanze_pharmacies_encrypted');
        if (savedPharmacies) {
            this.pharmacies = this.decryptData(savedPharmacies) || [];
        } else {
            // Mock data for pharmacies
            this.pharmacies = [
                {
                    id: 1,
                    name: 'Musanze Central Pharmacy',
                    address: 'KN 123 St, Musanze District, Rwanda',
                    phone: '+250788123456',
                    email: 'info@medorder.musanze.rw',
                    coordinates: [-1.5078, 29.6323],
                    operatingHours: 'Mon-Sat: 8AM-8PM, Sun: 9AM-6PM',
                    rating: 4.8,
                    licenseNumber: 'PHARM-2024-001',
                    services: ['Prescription Filling', 'Health Consultation', 'Emergency Services'],
                    stock: [],
                    staff: []
                },
                {
                    id: 2,
                    name: 'Musanze District Pharmacy',
                    address: 'KN 456 St, Musanze District, Rwanda',
                    phone: '+250787654321',
                    email: 'contact@medorder.musanze.rw',
                    coordinates: [-1.5178, 29.6423],
                    operatingHours: 'Mon-Sat: 8AM-8PM, Sun: 9AM-6PM',
                    rating: 4.6,
                    licenseNumber: 'PHARM-2024-002',
                    services: ['Prescription Filling', 'Health Consultation', 'Delivery Service'],
                    stock: [],
                    staff: []
                }
            ];
            this.savePharmacies();
        }

        const savedPrescriptions = localStorage.getItem('medorder_musanze_prescriptions_encrypted');
        if (savedPrescriptions) {
            this.prescriptions = this.decryptData(savedPrescriptions) || [];
        } else {
            this.prescriptions = [];
        }
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(); // Use regular login without verification
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    // Authentication with Security
    checkAuthState() {
        const savedUser = localStorage.getItem('medorder_musanze_current_user_encrypted');
        console.log('checkAuthState - savedUser:', savedUser);
        console.log('checkAuthState - current path:', window.location.pathname);
        
        if (savedUser) {
            const decryptedUser = this.decryptData(savedUser);
            console.log('checkAuthState - decryptedUser:', decryptedUser);
            
            if (decryptedUser && decryptedUser.isActive) {
                this.currentUser = decryptedUser;
                this.logAuditEvent('AUTO_LOGIN', `User ${decryptedUser.username} auto-logged in`);
                
                // Only redirect if we're on landing page
                console.log('checkAuthState - path check:', window.location.pathname.endsWith('index.html') || window.location.pathname === '/');
                
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    console.log('checkAuthState - redirecting to dashboard');
                    this.redirectToDashboard();
                } else {
                    console.log('checkAuthState - staying on current page');
                }
            }
        } else {
            console.log('checkAuthState - no saved user found');
        }
    }

    // Handle Login
    handleLogin() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        this.showLoadingSpinner();
        this.logAuditEvent('LOGIN_ATTEMPT', `Login attempt for username: ${username}`);

        // Simulate secure authentication delay
        setTimeout(() => {
            // Debug: Check if users are loaded
            console.log('Available users:', this.users);
            console.log('Login attempt:', username, this.hashPassword(password));
            
            const user = this.users.find(u => 
                (u.username === username || u.email === username) && u.password === this.hashPassword(password)
            );
            
            console.log('Found user:', user);

            if (user) {
                this.currentUser = user;
                localStorage.setItem('medorder_musanze_current_user_encrypted', this.encryptData(user));
                
                this.showNotification('Login successful! Redirecting...', 'success');
                
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                
                setTimeout(() => {
                    this.redirectToDashboard();
                }, 1500);
            } else {
                this.showNotification('Invalid username or password', 'error');
                this.hideLoadingSpinner();
            }
        }, 1000);
    }

    // Handle Registration
    handleRegister() {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const fullName = document.getElementById('regFullName').value;
        const phone = document.getElementById('regPhone').value;
        const accountType = document.getElementById('accountType').value;
        const licenseNumber = document.getElementById('licenseNumber').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Validation
        if (!username || !email || !password || !confirmPassword || !fullName || !phone || !accountType) {
            this.showNotification('Please fill in all required fields', 'error');
            this.hideLoadingSpinner();
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            this.hideLoadingSpinner();
            return;
        }

        if (password.length < 8) {
            this.showNotification('Password must be at least 8 characters', 'error');
            this.hideLoadingSpinner();
            return;
        }

        if (!agreeTerms) {
            this.showNotification('Please agree to the terms and conditions', 'error');
            this.hideLoadingSpinner();
            return;
        }

        // Check if username already exists
        if (this.users.find(u => u.username === username)) {
            this.showNotification('Username already exists', 'error');
            this.hideLoadingSpinner();
            return;
        }

        // Check if email already exists
        if (this.users.find(u => u.email === email)) {
            this.showNotification('Email already exists', 'error');
            this.hideLoadingSpinner();
            return;
        }

        // Validate license number for pharmacy and doctor accounts
        if ((accountType === 'pharmacy' || accountType === 'doctor') && !licenseNumber) {
            this.showNotification('License number is required for pharmacy and doctor accounts', 'error');
            this.hideLoadingSpinner();
            return;
        }

        // Create new user
        const newUser = {
            id: this.generateId(),
            username: username,
            email: email,
            password: this.hashPassword(password),
            fullName: fullName,
            phone: phone,
            accountType: accountType,
            licenseNumber: licenseNumber,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true,
            securityLevel: accountType === 'admin' ? 'high' : 'standard'
        };

        this.users.push(newUser);
        this.saveUsers();

        this.logAuditEvent('REGISTRATION_SUCCESS', `New user registered: ${username} (${accountType})`);
        this.showNotification('Registration successful! You can now login securely.', 'success');
        this.hideLoadingSpinner();

        // Close modal and switch to login
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();

        setTimeout(() => {
            this.showLoginModal();
        }, 1500);
    }

    // Redirect to Dashboard
    redirectToDashboard() {
        if (this.currentUser.accountType === 'admin') {
            window.location.href = 'admin.html';
        } else if (this.currentUser.accountType === 'pharmacy') {
            window.location.href = 'pharmacy-dashboard.html';
        } else if (this.currentUser.accountType === 'doctor') {
            window.location.href = 'dashboard.html'; // Doctors use patient dashboard with additional features
        } else {
            window.location.href = 'dashboard.html'; // Patients
        }
    }

    // Show Login Modal
    showLoginModal() {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }

    // Show Register Modal
    showRegisterModal() {
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.show();
    }

    // Logout User
    logout() {
        this.logAuditEvent('LOGOUT', `User ${this.currentUser?.username} logged out`);
        
        // Clear current user
        this.currentUser = null;
        localStorage.removeItem('medorder_musanze_current_user_encrypted');
        
        // Show notification
        this.showNotification('Logged out successfully! Redirecting...', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // Initialize GPS
    initializeGPS() {
        console.log('GPS initialization starting...');
        
        if (navigator.geolocation) {
            console.log('GPS is supported by browser');
            
            // Request high accuracy for better location detection
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            console.log('Requesting GPS position with options:', options);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    };
                    
                    console.log('GPS Location obtained successfully:', this.userLocation);
                    this.logAuditEvent('GPS_LOCATION', `Location obtained: ${this.userLocation.lat.toFixed(6)}, ${this.userLocation.lng.toFixed(6)} (Accuracy: ${this.userLocation.accuracy}m)`);
                    
                    // Update UI with location info
                    this.updateLocationDisplay();
                    
                    // Start real-time tracking
                    this.startRealTimeTracking();
                    
                    this.showNotification('Location detected successfully!', 'success');
                },
                (error) => {
                    console.error('GPS Error:', error);
                    let errorMessage = '';
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'GPS permission denied. Please enable location access.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'GPS information unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'GPS request timed out.';
                            break;
                        default:
                            errorMessage = 'Unknown GPS error.';
                    }
                    
                    console.log('GPS Error message:', errorMessage);
                    this.logAuditEvent('GPS_ERROR', `GPS error: ${errorMessage}`);
                    this.showNotification(errorMessage, 'warning');
                    
                    // Fallback to default location (Musanze District center)
                    this.userLocation = {
                        lat: -1.5078,
                        lng: 29.6323,
                        accuracy: 1000,
                        timestamp: Date.now()
                    };
                    
                    console.log('Using fallback location:', this.userLocation);
                    this.updateLocationDisplay();
                },
                options
            );
        } else {
            console.error('GPS not supported by this browser');
            this.showNotification('GPS is not supported by your browser', 'error');
            
            // Fallback location
            this.userLocation = {
                lat: -1.5078,
                lng: 29.6323,
                accuracy: 1000,
                timestamp: Date.now()
            };
            
            console.log('Using fallback location (GPS not supported):', this.userLocation);
        }
    }

    // Start real-time GPS tracking
    startRealTimeTracking() {
        if (navigator.geolocation && this.userLocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    };
                    
                    // Only update if location changed significantly (more than 10 meters)
                    const distance = this.calculateDistance(this.userLocation, {
                        coordinates: [newLocation.lat, newLocation.lng]
                    });
                    
                    if (distance > 0.01) { // 10 meters
                        this.userLocation = newLocation;
                        this.updateLocationDisplay();
                        console.log('Location updated:', newLocation);
                    }
                },
                (error) => {
                    console.error('GPS Tracking Error:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 60000 // Accept 1 minute old positions
                }
            );
        }
    }

    // Update location display in UI
    updateLocationDisplay() {
        const locationDisplay = document.getElementById('locationDisplay');
        if (locationDisplay && this.userLocation) {
            locationDisplay.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-map-marker-alt me-2"></i>
                    <strong>Your Location:</strong> ${this.userLocation.lat.toFixed(4)}, ${this.userLocation.lng.toFixed(4)}
                    <br>
                    <small>Accuracy: ${this.userLocation.accuracy}m</small>
                </div>
            `;
        }
    }

    // Initialize Map
    initializeMap() {
        const mapElement = document.getElementById('pharmacyMap');
        if (mapElement && this.userLocation) {
            const map = L.map('pharmacyMap').setView([this.userLocation.lat, this.userLocation.lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add pharmacy markers
            this.pharmacies.forEach(pharmacy => {
                const marker = L.marker([pharmacy.coordinates[0], pharmacy.coordinates[1]])
                    .addTo(map)
                    .bindPopup(`
                        <strong>${pharmacy.name}</strong><br>
                        ${pharmacy.address}<br>
                        Phone: ${pharmacy.phone}<br>
                        Rating: ${pharmacy.rating} ⭐
                    `);
            });
        }
    }

    // Setup Security
    setupSecurity() {
        this.encryptionKey = this.generateEncryptionKey();
    }

    // Generate Encryption Key
    generateEncryptionKey() {
        return 'medorder_musanze_secure_key_2024';
    }

    // Encrypt Data
    encryptData(data) {
        const jsonString = JSON.stringify(data);
        return btoa(jsonString);
    }

    // Decrypt Data
    decryptData(encryptedData) {
        try {
            const jsonString = atob(encryptedData);
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }

    // Hash Password
    hashPassword(password) {
        return btoa(password + 'medorder_salt_2024');
    }

    // Save Users
    saveUsers() {
        localStorage.setItem('medorder_musanze_users_encrypted', this.encryptData(this.users));
    }

    // Save Medicines
    saveMedicines() {
        localStorage.setItem('medorder_musanze_medicines_encrypted', this.encryptData(this.medicines));
    }

    // Save Orders
    saveOrders() {
        localStorage.setItem('medorder_musanze_orders_encrypted', this.encryptData(this.orders));
    }

    // Save Prescriptions
    savePrescriptions() {
        localStorage.setItem('medorder_musanze_prescriptions_encrypted', this.encryptData(this.prescriptions));
    }

    // Save Pharmacies
    savePharmacies() {
        localStorage.setItem('medorder_musanze_pharmacies_encrypted', this.encryptData(this.pharmacies));
    }

    // Log Audit Event
    logAuditEvent(event, details) {
        const auditEntry = {
            timestamp: new Date().toISOString(),
            event: event,
            details: details,
            userId: this.currentUser?.id || null,
            ipAddress: '127.0.0.1' // In production, get real IP
        };

        this.auditLog.push(auditEntry);
        
        // Keep only last 1000 entries
        if (this.auditLog.length > 1000) {
            this.auditLog = this.auditLog.slice(-1000);
        }

        localStorage.setItem('medorder_musanze_audit_log', JSON.stringify(this.auditLog));
    }

    // Show Loading Spinner
    showLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'flex';
        }
    }

    // Hide Loading Spinner
    hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    // Show Notification
    showNotification(message, type = 'info', duration = 5000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.remove()">×</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }

    // Generate ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Create Order
    createOrder(medicineId, quantity = 1, pharmacyId = null) {
        const medicine = this.medicines.find(m => m.id === medicineId);
        if (!medicine) return null;

        if (quantity > medicine.stock) {
            this.showNotification(`Only ${medicine.stock} units available in stock`, 'warning');
            return null;
        }

        const order = {
            id: this.generateId(),
            medicineId: medicineId,
            medicineName: medicine.name,
            quantity: quantity,
            price: medicine.price,
            total: medicine.price * quantity,
            status: 'pending',
            paymentStatus: 'pending',
            userId: this.currentUser?.id,
            userName: this.currentUser?.fullName,
            userPhone: this.currentUser?.phone,
            pharmacyId: pharmacyId || this.getNearestPharmacy()?.id,
            orderDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            estimatedDelivery: this.calculateEstimatedDelivery(),
            trackingNumber: this.generateTrackingNumber(),
            priority: this.determineOrderPriority(medicine)
        };

        this.orders.push(order);
        this.saveOrders();
        
        // Update stock in real-time
        medicine.stock -= quantity;
        medicine.availability = medicine.stock > 50 ? 'available' : 
                             medicine.stock > 10 ? 'limited' : 'unavailable';
        
        // Create notification
        this.createNotification(
            order.userId,
            'Order Placed',
            `Your order for ${quantity}x ${medicine.name} has been placed successfully.`,
            'order'
        );
        
        this.logAuditEvent('ORDER_CREATED', `Order ${order.id} created for ${medicine.name}`);
        
        return order;
    }

    // Get Nearest Pharmacy
    getNearestPharmacy() {
        if (!this.userLocation || !this.pharmacies.length) return this.pharmacies[0];
        
        return this.pharmacies
            .map(pharmacy => ({
                ...pharmacy,
                distance: this.calculateDistance(this.userLocation, pharmacy)
            }))
            .sort((a, b) => a.distance - b.distance)[0];
    }

    // Get Pharmacy by ID
    getPharmacyById(pharmacyId) {
        return this.pharmacies.find(p => p.id === pharmacyId);
    }

    // Calculate Distance
    calculateDistance(location1, location2) {
        const R = 6371; // Earth's radius in km
        const dLat = (location2.coordinates[0] - location1.lat) * Math.PI / 180;
        const dLon = (location2.coordinates[1] - location1.lng) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(location1.lat * Math.PI / 180) * Math.cos(location2.coordinates[0] * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // Find Pharmacies with Specific Medicine in Stock
    findPharmaciesWithMedicine(medicineName) {
        if (!this.userLocation) {
            // If no GPS location, return all pharmacies with the medicine
            return this.pharmacies
                .filter(pharmacy => {
                    const pharmacyMedicines = this.medicines.filter(m => 
                        m.pharmacyId === pharmacy.id && 
                        m.stock > 0 &&
                        m.name.toLowerCase().includes(medicineName.toLowerCase())
                    );
                    return pharmacyMedicines.length > 0;
                })
                .map(pharmacy => ({
                    ...pharmacy,
                    medicines: this.medicines.filter(m => 
                        m.pharmacyId === pharmacy.id && 
                        m.stock > 0 &&
                        m.name.toLowerCase().includes(medicineName.toLowerCase())
                    ),
                    distance: 0 // No GPS available
                }));
        }

        // With GPS location, calculate distances and sort by nearest
        return this.pharmacies
            .filter(pharmacy => {
                const pharmacyMedicines = this.medicines.filter(m => 
                    m.pharmacyId === pharmacy.id && 
                    m.stock > 0 &&
                    m.name.toLowerCase().includes(medicineName.toLowerCase())
                );
                return pharmacyMedicines.length > 0;
            })
            .map(pharmacy => ({
                ...pharmacy,
                medicines: this.medicines.filter(m => 
                    m.pharmacyId === pharmacy.id && 
                    m.stock > 0 &&
                    m.name.toLowerCase().includes(medicineName.toLowerCase())
                ),
                distance: this.calculateDistance(this.userLocation, pharmacy)
            }))
            .sort((a, b) => a.distance - b.distance);
    }

    // Get Real Nearest Pharmacy with Medicine
    getNearestPharmacyWithMedicine(medicineName) {
        const pharmaciesWithMedicine = this.findPharmaciesWithMedicine(medicineName);
        return pharmaciesWithMedicine.length > 0 ? pharmaciesWithMedicine[0] : null;
    }

    // Calculate Estimated Delivery
    calculateEstimatedDelivery() {
        const nearestPharmacy = this.getNearestPharmacy();
        if (!nearestPharmacy) return 'Unknown';
        
        const deliveryTime = nearestPharmacy.deliveryTime || '2 hours';
        const now = new Date();
        
        if (deliveryTime.includes('hour')) {
            const hours = parseInt(deliveryTime);
            now.setHours(now.getHours() + hours);
        } else if (deliveryTime.includes('day')) {
            const days = parseInt(deliveryTime);
            now.setDate(now.getDate() + days);
        }
        
        return now.toISOString();
    }

    // Generate Tracking Number
    generateTrackingNumber() {
        return 'MD' + Date.now().toString().slice(-8);
    }

    // Determine Order Priority
    determineOrderPriority(medicine) {
        if (medicine.requiresPrescription) return 'high';
        if (medicine.stock < 10) return 'medium';
        return 'low';
    }

    // Create Notification
    createNotification(userId, title, message, type) {
        const notification = {
            id: this.generateId(),
            userId: userId,
            title: title,
            message: message,
            type: type,
            read: false,
            createdAt: new Date().toISOString()
        };

        this.notifications.push(notification);
        
        // Save notifications
        localStorage.setItem('medorder_musanze_notifications', JSON.stringify(this.notifications));
    }

    // Start Real-time Updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateStockLevels();
            this.checkNewOrders();
        }, 30000); // Update every 30 seconds
    }

    // Update Stock Levels
    updateStockLevels() {
        // Simulate stock changes
        this.medicines.forEach(medicine => {
            if (Math.random() > 0.95) {
                const change = Math.floor(Math.random() * 10) - 5;
                medicine.stock = Math.max(0, medicine.stock + change);
                medicine.availability = medicine.stock > 50 ? 'available' : 
                                     medicine.stock > 10 ? 'limited' : 'unavailable';
            }
        });
        this.saveMedicines();
    }

    // Check New Orders (Real notifications only)
    checkNewOrders() {
        // Only show real order notifications when actual orders are placed
        // No more fake notifications - only real orders trigger notifications
        console.log('Checking for real orders...');
    }

    // Update Order Status (Pharmacy Only)
    updateOrderStatus(orderId, status, userRole = null) {
        // Check if user is pharmacy staff
        const currentUser = this.currentUser;
        if (!currentUser || currentUser.accountType !== 'pharmacy') {
            this.showNotification('Only pharmacy staff can update order status', 'error');
            return false;
        }
        
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            // Validate order status flow
            const validStatusFlow = {
                'pending': ['approved', 'denied'],
                'approved': ['confirmed'],
                'confirmed': ['processing'],
                'processing': ['shipped'],
                'shipped': ['delivered'],
                'delivered': [], // Final status
                'denied': [] // Final status
            };
            
            // Check if status transition is valid
            if (validStatusFlow[order.status] && !validStatusFlow[order.status].includes(status)) {
                this.showNotification(`Cannot change order from ${order.status} to ${status}`, 'error');
                return false;
            }
            
            // Update status with timestamp
            const oldStatus = order.status;
            order.status = status;
            order.statusUpdatedAt = new Date().toISOString();
            
            // Add status history
            if (!order.statusHistory) {
                order.statusHistory = [];
            }
            order.statusHistory.push({
                status: status,
                timestamp: order.statusUpdatedAt,
                updatedBy: currentUser.fullName,
                userId: currentUser.id
            });
            
            this.saveOrders();
            
            // Create notifications
            this.createOrderStatusNotifications(order, oldStatus, status);
            
            this.showNotification(`Order ${orderId.substring(0, 8)} status updated to ${status}`, 'success');
            this.logAuditEvent('ORDER_STATUS_UPDATE', `Order ${orderId.substring(0, 8)}: ${oldStatus} → ${status} by ${currentUser.fullName}`);
            
            return true;
        }
        return false;
    }
    
    // Create notifications for order status changes
    createOrderStatusNotifications(order, oldStatus, newStatus) {
        // Notify patient
        this.createNotification(
            order.userId,
            'Order Status Update',
            `Your order ${order.id.substring(0, 8)} is now ${newStatus}`,
            'order'
        );
        
        // Notify pharmacy staff
        const pharmacyUsers = this.users.filter(u => u.accountType === 'pharmacy');
        pharmacyUsers.forEach(user => {
            this.createNotification(
                user.id,
                'Order Status Update',
                `Order ${order.id.substring(0, 8)} status: ${oldStatus} → ${newStatus}`,
                'order'
            );
        });
    }

    // Create Prescription (by Doctor)
    createPrescription(prescriptionData) {
        const prescription = {
            id: this.generateId(),
            ...prescriptionData,
            status: 'pending_pharmacy_approval', // New status for pharmacy approval
            createdBy: this.currentUser.id,
            createdAt: new Date().toISOString(),
            verificationCode: this.generateVerificationCode()
        };

        // If doctor creates prescription, assign to nearest pharmacy by default
        if (this.currentUser.accountType === 'doctor') {
            // Find nearest pharmacy to doctor's location (or default to first pharmacy)
            const nearestPharmacy = this.pharmacies[0]; // Simplified - could use GPS
            prescription.pharmacyId = nearestPharmacy.id;
            prescription.pharmacyName = nearestPharmacy.name;
            prescription.doctorId = this.currentUser.id;
            prescription.doctorName = this.currentUser.fullName;
            prescription.doctorLicense = this.currentUser.licenseNumber;
            
            // Create notification for pharmacy
            this.createNotification(
                nearestPharmacy.id,
                'New Prescription to Review',
                `Dr. ${this.currentUser.fullName} has written a new prescription for ${prescription.patientName}`,
                'prescription'
            );
        }

        this.prescriptions.push(prescription);
        this.savePrescriptions();
        
        this.logAuditEvent('PRESCRIPTION_CREATED', `Prescription ${prescription.id} created by ${this.currentUser.fullName}`);
        return prescription;
    }

    // Doctor writes prescription
    writePrescription(patientData, medicinesData, notes) {
        if (!this.currentUser || this.currentUser.accountType !== 'doctor') {
            this.showNotification('Only doctors can write prescriptions', 'error');
            return null;
        }

        const prescription = {
            patientName: patientData.patientName,
            patientId: patientData.patientId,
            patientPhone: patientData.patientPhone,
            medicines: medicinesData,
            notes: notes,
            diagnosis: patientData.diagnosis || '',
            doctorId: this.currentUser.id,
            doctorName: this.currentUser.fullName,
            doctorLicense: this.currentUser.licenseNumber,
            doctorPhone: this.currentUser.phone,
            doctorEmail: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        return this.createPrescription(prescription);
    }

    // Pharmacy approves prescription
    approvePrescription(prescriptionId, approvalNotes = '') {
        if (!this.currentUser || this.currentUser.accountType !== 'pharmacy') {
            this.showNotification('Only pharmacy staff can approve prescriptions', 'error');
            return false;
        }

        const prescription = this.prescriptions.find(p => p.id === prescriptionId);
        if (!prescription) {
            this.showNotification('Prescription not found', 'error');
            return false;
        }

        if (prescription.status !== 'pending_pharmacy_approval') {
            this.showNotification('This prescription cannot be approved', 'error');
            return false;
        }

        // Update prescription status
        prescription.status = 'approved';
        prescription.approvedBy = this.currentUser.id;
        prescription.approvedByPharmacy = this.currentUser.fullName;
        prescription.approvedAt = new Date().toISOString();
        prescription.approvalNotes = approvalNotes;
        prescription.pharmacyId = this.currentUser.pharmacyId || 1; // Assign to current pharmacy

        // Create notification for doctor
        this.createNotification(
            prescription.doctorId,
            'Prescription Approved',
            `Your prescription for ${prescription.patientName} has been approved by ${this.currentUser.fullName}`,
            'prescription'
        );

        // Create notification for patient
        if (prescription.patientId) {
            this.createNotification(
                prescription.patientId,
                'Prescription Ready',
                `Your prescription has been approved and is ready for pickup at ${prescription.pharmacyName}`,
                'prescription'
            );
        }

        this.savePrescriptions();
        this.showNotification('Prescription approved successfully', 'success');
        this.logAuditEvent('PRESCRIPTION_APPROVED', `Prescription ${prescriptionId} approved by ${this.currentUser.fullName}`);
        
        return true;
    }

    // Pharmacy denies prescription
    denyPrescription(prescriptionId, denialReason) {
        if (!this.currentUser || this.currentUser.accountType !== 'pharmacy') {
            this.showNotification('Only pharmacy staff can deny prescriptions', 'error');
            return false;
        }

        const prescription = this.prescriptions.find(p => p.id === prescriptionId);
        if (!prescription) {
            this.showNotification('Prescription not found', 'error');
            return false;
        }

        if (prescription.status !== 'pending_pharmacy_approval') {
            this.showNotification('This prescription cannot be denied', 'error');
            return false;
        }

        // Update prescription status
        prescription.status = 'denied';
        prescription.deniedBy = this.currentUser.id;
        prescription.deniedByPharmacy = this.currentUser.fullName;
        prescription.deniedAt = new Date().toISOString();
        prescription.denialReason = denialReason;

        // Create notification for doctor
        this.createNotification(
            prescription.doctorId,
            'Prescription Denied',
            `Your prescription for ${prescription.patientName} has been denied. Reason: ${denialReason}`,
            'prescription'
        );

        // Create notification for patient
        if (prescription.patientId) {
            this.createNotification(
                prescription.patientId,
                'Prescription Denied',
                `Your prescription has been denied. Reason: ${denialReason}`,
                'prescription'
            );
        }

        this.savePrescriptions();
        this.showNotification('Prescription denied', 'warning');
        this.logAuditEvent('PRESCRIPTION_DENIED', `Prescription ${prescriptionId} denied by ${this.currentUser.fullName}`);
        
        return true;
    }

    // Generate Verification Code
    generateVerificationCode() {
        return 'RX' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    // Get User Notifications
    getUserNotifications(userId) {
        return this.notifications.filter(n => n.userId === userId && !n.read);
    }

    // Mark Notification as Read
    markNotificationAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            localStorage.setItem('medorder_musanze_notifications', JSON.stringify(this.notifications));
        }
    }
}

// Custom CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .custom-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
        background: #d4edda;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
        background: #f8d7da;
    }
    
    .notification-warning {
        border-left: 4px solid #ffc107;
        background: #fff3cd;
    }
    
    .notification-info {
        border-left: 4px solid #17a2b8;
        background: #d1ecf1;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

document.head.appendChild(style);

// Patient Dashboard Functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Update menu
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Load section-specific data
    if (window.app && window.app.currentUser) {
        loadSectionData(sectionName);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function startQuickOrder() {
    if (window.app && window.app.showQuickOrderModal) {
        window.app.showQuickOrderModal();
    }
}

function showPrescriptionUpload() {
    if (window.app && window.app.showPrescriptionUploadModal) {
        window.app.showPrescriptionUploadModal();
    }
}

function testGPS() {
    if (window.app && window.app.testGPS) {
        window.app.testGPS();
    }
}

function findNearestPharmacyWithMedicine() {
    if (window.app && window.app.findNearestPharmacyWithMedicine) {
        window.app.findNearestPharmacyWithMedicine();
    }
}

function toggleMap() {
    const mapSection = document.getElementById('mapSection');
    const button = event.target;
    
    if (mapSection.style.display === 'none') {
        mapSection.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Map';
        initializePharmacyMap();
    } else {
        mapSection.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i> Show Map';
    }
}

function getUserGPSLocation() {
    if (window.app && window.app.getUserGPSLocation) {
        window.app.getUserGPSLocation();
    }
}

function searchQuickOrderMedicine() {
    if (window.app && window.app.searchQuickOrderMedicine) {
        window.app.searchQuickOrderMedicine();
    }
}

function placeQuickOrder() {
    if (window.app && window.app.placeQuickOrder) {
        window.app.placeQuickOrder();
    }
}

function removeMedicineItem(button) {
    if (window.app && window.app.removeMedicineItem) {
        window.app.removeMedicineItem(button);
    }
}

function addMedicineItem() {
    if (window.app && window.app.addMedicineItem) {
        window.app.addMedicineItem();
    }
}

function submitPrescription() {
    if (window.app && window.app.submitPrescription) {
        window.app.submitPrescription();
    }
}

function addNewPharmacy() {
    if (window.app && window.app.addNewPharmacy) {
        window.app.addNewPharmacy();
    }
}

function showWritePrescriptionModal() {
    if (window.app && window.app.showWritePrescriptionModal) {
        window.app.showWritePrescriptionModal();
    }
}

function showPharmacyManagementModal() {
    if (window.app && window.app.showPharmacyManagementModal) {
        window.app.showPharmacyManagementModal();
    }
}

function markAllNotificationsRead() {
    if (window.app && window.app.markAllNotificationsRead) {
        window.app.markAllNotificationsRead();
    }
}

function logout() {
    if (window.app && window.app.logout) {
        window.app.logout();
    }
}

function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'overview':
            loadOverviewData();
            break;
        case 'medicines':
            loadMedicines();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'prescriptions':
            loadPrescriptions();
            break;
        case 'pharmacies':
            loadPharmacies();
            break;
        case 'notifications':
            loadNotifications();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

function loadOverviewData() {
    if (!window.app || !window.app.currentUser) return;
    
    const currentUser = window.app.currentUser;
    const userOrders = window.app.orders.filter(o => o.userId === currentUser.id);
    const userPrescriptions = window.app.prescriptions.filter(p => p.patientId === currentUser.id);
    
    // Update statistics
    document.getElementById('totalOrders').textContent = userOrders.length;
    document.getElementById('pendingOrders').textContent = userOrders.filter(o => o.status === 'pending').length;
    document.getElementById('totalPrescriptions').textContent = userPrescriptions.length;
    document.getElementById('pendingPrescriptions').textContent = userPrescriptions.filter(p => p.status === 'pending_verification').length;
    
    // Update nearest pharmacy info
    updateNearestPharmacyDisplay();
}

function loadMedicines() {
    if (!window.app || !window.app.medicines) return;
    
    const medicinesContainer = document.getElementById('medicinesContainer');
    if (!medicinesContainer) return;
    
    // Load categories
    const categories = [...new Set(window.app.medicines.map(m => m.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">All Categories</option>' + 
            categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }
    
    medicinesContainer.innerHTML = window.app.medicines.map(medicine => {
        const stockStatus = getStockStatus(medicine.stock);
        return `
            <div class="col-md-4 mb-3">
                <div class="medicine-card">
                    <div class="medicine-image">
                        <img src="https://picsum.photos/seed/${medicine.name}/200/200" alt="${medicine.name}">
                    </div>
                    <div class="medicine-info">
                        <h6>${medicine.name}</h6>
                        <p class="text-muted small">${medicine.category}</p>
                        <div class="medicine-price">RWF ${medicine.price.toLocaleString()}</div>
                        <div class="stock-indicator ${stockStatus.class}">
                            <i class="fas ${stockStatus.icon}"></i>
                            ${medicine.stock} units
                        </div>
                        ${medicine.requiresPrescription ? '<span class="prescription-badge">Prescription Required</span>' : ''}
                        <button class="btn btn-primary btn-sm" onclick="orderMedicine('${medicine.id}')">
                            <i class="fas fa-shopping-cart"></i> Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadOrders() {
    if (!window.app || !window.app.currentUser) return;
    
    const ordersTable = document.getElementById('ordersTable');
    if (!ordersTable) return;
    
    const currentUser = window.app.currentUser;
    const userOrders = window.app.orders.filter(o => o.userId === currentUser.id);
    
    if (userOrders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No orders yet</td></tr>';
        return;
    }
    
    ordersTable.innerHTML = userOrders.map(order => {
        const statusBadge = getStatusBadge(order.status);
        return `
            <tr>
                <td><code>${order.id.substring(0, 8)}</code></td>
                <td>${order.medicineName}</td>
                <td>${order.quantity}</td>
                <td><strong>RWF ${order.total.toLocaleString()}</strong></td>
                <td>${statusBadge}</td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                    ${order.status === 'approved' && order.paymentStatus === 'pending' ? `
                        <button class="btn btn-success btn-sm" onclick="showPaymentModal('${order.id}')">
                            <i class="fas fa-credit-card"></i> Pay
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    }).join('');
}

function loadPrescriptions() {
    if (!window.app || !window.app.currentUser) return;
    
    const prescriptionsTable = document.getElementById('prescriptionsTable');
    if (!prescriptionsTable) return;
    
    const currentUser = window.app.currentUser;
    const userPrescriptions = window.app.prescriptions.filter(p => p.patientId === currentUser.id);
    
    if (userPrescriptions.length === 0) {
        prescriptionsTable.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No prescriptions uploaded yet</td></tr>';
        return;
    }
    
    prescriptionsTable.innerHTML = userPrescriptions.map(prescription => {
        const statusBadge = getPrescriptionStatusBadge(prescription.status);
        return `
            <tr>
                <td><code>${prescription.id.substring(0, 8)}</code></td>
                <td>${prescription.patientName}</td>
                <td>${prescription.doctorName}</td>
                <td>${new Date(prescription.dateIssued).toLocaleDateString()}</td>
                <td>${statusBadge}</td>
                <td><code>${prescription.verificationCode}</code></td>
                <td>${new Date(prescription.expiryDate).toLocaleDateString()}</td>
            </tr>
        `;
    }).join('');
}

function loadPharmacies() {
    if (!window.app || !window.app.pharmacies) return;
    
    const pharmaciesTable = document.getElementById('pharmaciesTable');
    if (!pharmaciesTable) return;
    
    if (window.app.pharmacies.length === 0) {
        pharmaciesTable.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No pharmacies found</td></tr>';
        return;
    }
    
    pharmaciesTable.innerHTML = window.app.pharmacies.map(pharmacy => `
        <tr>
            <td>${pharmacy.name}</td>
            <td>${pharmacy.address}</td>
            <td>${pharmacy.phone}</td>
            <td>${pharmacy.distance ? pharmacy.distance.toFixed(2) + ' km' : 'N/A'}</td>
            <td>${pharmacy.rating || 'N/A'}</td>
        </tr>
    `).join('');
}

function loadNotifications() {
    if (!window.app || !window.app.currentUser) return;
    
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    const currentUser = window.app.currentUser;
    const userNotifications = window.app.notifications.filter(n => n.userId === currentUser.id);
    const unreadCount = userNotifications.filter(n => !n.read).length;
    
    // Update notification badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
    
    if (userNotifications.length === 0) {
        notificationsList.innerHTML = '<div class="text-center text-muted">No notifications</div>';
        return;
    }
    
    notificationsList.innerHTML = userNotifications.map(notification => `
        <div class="alert alert-${notification.type} alert-dismissible fade show" role="alert">
            <strong>${notification.title}</strong><br>
            ${notification.message}
            <small class="text-muted d-block">${new Date(notification.timestamp).toLocaleString()}</small>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `).join('');
}

function loadProfile() {
    if (!window.app || !window.app.currentUser) return;
    
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;
    
    const currentUser = window.app.currentUser;
    profileContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Personal Information</h6>
                <p><strong>Name:</strong> ${currentUser.fullName}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Phone:</strong> ${currentUser.phone}</p>
                <p><strong>Account Type:</strong> ${currentUser.accountType.charAt(0).toUpperCase() + currentUser.accountType.slice(1)}</p>
            </div>
            <div class="col-md-6">
                <h6>Account Statistics</h6>
                <p><strong>Member Since:</strong> ${new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}</p>
                <p><strong>Total Orders:</strong> ${window.app.orders.filter(o => o.userId === currentUser.id).length}</p>
                <p><strong>Total Prescriptions:</strong> ${window.app.prescriptions.filter(p => p.patientId === currentUser.id).length}</p>
            </div>
        </div>
    `;
}

function updateNearestPharmacyDisplay() {
    const nearestPharmacyInfo = document.getElementById('nearestPharmacyInfo');
    if (!nearestPharmacyInfo || !window.app) return;
    
    if (!window.app.userLocation || !window.app.pharmacies || window.app.pharmacies.length === 0) {
        nearestPharmacyInfo.innerHTML = `
            <h6 class="mb-3">
                <i class="fas fa-map me-2"></i>Your Location & Nearby Pharmacies
            </h6>
            <div class="text-center">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Location not available or no pharmacies found
            </div>
            <button class="btn btn-sm btn-outline-secondary mt-3" onclick="toggleMap()">
                <i class="fas fa-eye"></i> Show Map
            </button>
        `;
        return;
    }
    
    const nearestPharmacy = window.app.findNearestPharmacy();
    if (nearestPharmacy) {
        nearestPharmacyInfo.innerHTML = `
            <h6 class="mb-3">
                <i class="fas fa-map me-2"></i>Your Location & Nearby Pharmacies
            </h6>
            <div class="alert alert-info">
                <strong>📍 Nearest Pharmacy:</strong> ${nearestPharmacy.name}<br>
                <strong>📍 Address:</strong> ${nearestPharmacy.address}<br>
                <strong>📞 Phone:</strong> ${nearestPharmacy.phone}<br>
                <strong>📏 Distance:</strong> ${nearestPharmacy.distance ? nearestPharmacy.distance.toFixed(2) + ' km' : 'Calculating...'}
            </div>
            <button class="btn btn-sm btn-outline-secondary" onclick="toggleMap()">
                <i class="fas fa-eye"></i> Show Map
            </button>
        `;
    }
}

function initializePharmacyMap() {
    if (!window.app || !document.getElementById('pharmacyMap')) return;
    
    const mapContainer = document.getElementById('pharmacyMap');
    if (mapContainer && window.app.userLocation && window.app.pharmacies.length > 0) {
        // Initialize map
        const map = L.map('pharmacyMap').setView([window.app.userLocation.lat, window.app.userLocation.lng], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add user location marker
        L.marker([window.app.userLocation.lat, window.app.userLocation.lng])
            .addTo(map)
            .bindPopup('Your Location')
            .openPopup();
        
        // Add pharmacy markers
        window.app.pharmacies.forEach(pharmacy => {
            if (pharmacy.location) {
                L.marker([pharmacy.location.lat, pharmacy.location.lng])
                    .addTo(map)
                    .bindPopup(`
                        <strong>${pharmacy.name}</strong><br>
                        ${pharmacy.address}<br>
                        ${pharmacy.phone}<br>
                        Distance: ${pharmacy.distance ? pharmacy.distance.toFixed(2) + ' km' : 'N/A'}
                    `);
            }
        });
    }
}

function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'out-of-stock', text: 'Out of Stock', icon: 'fas fa-times-circle' };
    } else if (stock < 10) {
        return { class: 'low-stock', text: 'Low Stock', icon: 'fas fa-exclamation-triangle' };
    } else {
        return { class: 'in-stock', text: 'In Stock', icon: 'fas fa-check-circle' };
    }
}

function getStatusBadge(status) {
    const badges = {
        'pending': 'badge-pending',
        'confirmed': 'badge-confirmed',
        'processing': 'badge-processing',
        'shipped': 'badge-shipped',
        'delivered': 'badge-delivered',
        'cancelled': 'badge-cancelled'
    };
    return `<span class="badge ${badges[status] || 'badge-secondary'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

function getPrescriptionStatusBadge(status) {
    const badges = {
        'pending_verification': 'badge-pending',
        'verified': 'badge-verified',
        'rejected': 'badge-rejected'
    };
    return `<span class="badge ${badges[status] || 'badge-secondary'}">${status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}</span>`;
}

function orderMedicine(medicineId) {
    if (!window.app || !window.app.medicines) return;
    
    const medicine = window.app.medicines.find(m => m.id === medicineId);
    if (medicine) {
        if (medicine.stock === 0) {
            window.app.showNotification('This medicine is out of stock', 'error');
            return;
        }
        
        if (medicine.requiresPrescription) {
            showPrescriptionUploadForMedicine(medicine);
        } else {
            showOrderModal(medicine);
        }
    }
}

function showOrderModal(medicine) {
    // Implementation for order modal - for now just show quick order modal
    document.getElementById('quickOrderMedicine').value = medicine.name;
    document.getElementById('quickOrderQuantity').value = 1;
    
    const modal = new bootstrap.Modal(document.getElementById('quickOrderModal'));
    modal.show();
}

function showPrescriptionUploadForMedicine(medicine) {
    // Pre-fill medicine name in prescription upload
    document.getElementById('medicinesPrescribed').value = medicine.name;
    
    const modal = new bootstrap.Modal(document.getElementById('prescriptionUploadModal'));
    modal.show();
}

function showPaymentModal(orderId) {
    // Implementation for payment modal
    window.app.showNotification('Payment functionality would be implemented here', 'info');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.app = new MedOrderApp();
    
    // Initialize dashboard-specific features
    if (window.location.pathname.includes('dashboard.html')) {
        setTimeout(() => {
            if (window.app && window.app.currentUser) {
                // Update user profile
                const userNameElement = document.getElementById('userName');
                const userRoleElement = document.getElementById('userRole');
                const userAvatarElement = document.getElementById('userAvatar');
                
                if (userNameElement) userNameElement.textContent = window.app.currentUser.fullName;
                if (userRoleElement) userRoleElement.textContent = window.app.currentUser.accountType.charAt(0).toUpperCase() + window.app.currentUser.accountType.slice(1);
                if (userAvatarElement) userAvatarElement.src = 'https://picsum.photos/seed/' + window.app.currentUser.username + '/200/200';
                
                // Show doctor-specific menu items if user is a doctor
                if (window.app.currentUser.accountType === 'doctor') {
                    const writePrescriptionMenu = document.getElementById('writePrescriptionMenu');
                    if (writePrescriptionMenu) {
                        writePrescriptionMenu.style.display = 'block';
                    }
                }
                
                // Load initial data
                loadOverviewData();
            }
        }, 1000);
    }
});
