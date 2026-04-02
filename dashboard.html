<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard - MedOrder Musanze</title>
    
    <!-- Bootstrap 5.3.0 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome 6.4.0 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Leaflet CSS for GPS Maps -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            color: #333;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 280px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            color: #333;
            padding: 2rem 1rem;
            overflow-y: auto;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .sidebar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
            padding-bottom: 1rem;
            border-bottom: 2px solid #1e3c72;
            color: #1e3c72;
        }

        .user-profile {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border-radius: 20px;
            color: white;
        }

        .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 1rem;
            border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .sidebar-menu {
            list-style: none;
            padding: 0;
        }

        .sidebar-menu li {
            margin-bottom: 0.5rem;
        }

        .sidebar-menu a {
            color: #333;
            text-decoration: none;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .sidebar-menu a:hover,
        .sidebar-menu a.active {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
        }

        .sidebar-menu i {
            margin-right: 1rem;
            width: 20px;
            text-align: center;
        }

        .main-content {
            margin-left: 280px;
            padding: 2rem;
            min-height: 100vh;
            transition: margin-left 0.3s ease;
        }

        .dashboard-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            color: #1e3c72;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .content-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            color: #333;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .stat-card {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            border-radius: 15px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(30, 62, 114, 0.3);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .table {
            color: #333;
        }

        .table th {
            border-bottom: 2px solid #1e3c72;
            font-weight: 600;
            color: #1e3c72;
            background: rgba(30, 60, 114, 0.05);
        }

        .table td {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            color: #555;
        }

        .btn-primary {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            border: none;
            border-radius: 10px;
            padding: 0.5rem 1.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(30, 62, 114, 0.3);
        }

        .form-control, .form-select {
            border-radius: 10px;
            border: 2px solid #e9ecef;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
            border-color: #1e3c72;
            box-shadow: 0 0 0 0.2rem rgba(30, 62, 114, 0.25);
        }

        .badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 500;
            font-size: 0.8rem;
        }

        .badge-pending {
            background: rgba(255, 193, 7, 0.2);
            color: #ffc107;
        }

        .badge-confirmed {
            background: rgba(23, 162, 184, 0.2);
            color: #17a2b8;
        }

        .badge-processing {
            background: rgba(102, 126, 234, 0.2);
            color: #667eea;
        }

        .badge-shipped {
            background: rgba(108, 117, 125, 0.2);
            color: #6c757d;
        }

        .badge-delivered {
            background: rgba(40, 167, 69, 0.2);
            color: #28a745;
        }

        .badge-cancelled {
            background: rgba(220, 53, 69, 0.2);
            color: #dc3545;
        }

        .real-time-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            background: rgba(40, 167, 69, 0.1);
            color: #28a745;
        }

        .real-time-indicator.pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .mobile-menu-toggle {
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.5rem 1rem;
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.active {
                transform: translateX(0);
            }

            .main-content {
                margin-left: 0;
            }

            .mobile-menu-toggle {
                display: block;
            }
        }

        .hidden {
            display: none !important;
        }

        .dashboard-section {
            display: block;
        }

        .medicine-card {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .medicine-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .medicine-image {
            width: 100%;
            height: 150px;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .medicine-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .medicine-info h6 {
            color: #1e3c72;
            margin-bottom: 0.5rem;
        }

        .medicine-price {
            font-size: 1.2rem;
            font-weight: 700;
            color: #28a745;
            margin-bottom: 0.5rem;
        }

        .stock-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .in-stock {
            background: rgba(40, 167, 69, 0.1);
            color: #28a745;
        }

        .low-stock {
            background: rgba(255, 193, 7, 0.1);
            color: #ffc107;
        }

        .out-of-stock {
            background: rgba(220, 53, 69, 0.1);
            color: #dc3545;
        }

        .prescription-badge {
            background: rgba(220, 53, 69, 0.1);
            color: #dc3545;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        #pharmacyMap {
            height: 400px;
            border-radius: 15px;
            overflow: hidden;
            margin-bottom: 2rem;
        }

        .search-result-item {
            padding: 0.75rem;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .search-result-item:hover {
            background: #f8f9fa;
            border-color: #1e3c72;
        }

        .notification-badge {
            background: #dc3545;
            color: white;
            border-radius: 10px;
            padding: 0.25rem 0.5rem;
            font-size: 0.7rem;
            margin-left: 0.5rem;
        }
    </style>
</head>
<body>
    <!-- Mobile Menu Toggle -->
    <button class="mobile-menu-toggle" onclick="toggleSidebar()">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-brand">
            <i class="fas fa-pills me-2"></i>Patient Dashboard
        </div>

        <div class="user-profile">
            <img src="https://picsum.photos/seed/patient/200/200" alt="User Avatar" class="user-avatar" id="userAvatar">
            <div id="userName">Patient Name</div>
            <div id="userRole">Patient</div>
            <div class="real-time-indicator pulse">
                <i class="fas fa-circle"></i> Online
            </div>
        </div>

        <ul class="sidebar-menu">
            <li>
                <a href="#" class="active" onclick="showSection('overview')">
                    <i class="fas fa-home"></i>Overview
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('medicines')">
                    <i class="fas fa-pills"></i>Medicines
                    <span class="real-time-indicator pulse">
                        <i class="fas fa-circle"></i> Live
                    </span>
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('orders')">
                    <i class="fas fa-shopping-cart"></i>My Orders
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('prescriptions')">
                    <i class="fas fa-file-medical"></i>Prescriptions
                </a>
            </li>
            <li id="writePrescriptionMenu" style="display: none;">
                <a href="#" onclick="showWritePrescriptionModal()">
                    <i class="fas fa-pen"></i>Write Prescription
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('pharmacies')">
                    <i class="fas fa-map-marked-alt"></i>Nearby Pharmacies
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('notifications')">
                    <i class="fas fa-bell"></i>Notifications
                    <span class="notification-badge" id="notificationBadge">0</span>
                </a>
            </li>
            <li>
                <a href="#" onclick="showSection('profile')">
                    <i class="fas fa-user"></i>Profile
                </a>
            </li>
            <li class="mt-4">
                <a href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>Logout
                </a>
            </li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Header -->
        <div class="dashboard-header">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h1>Patient Dashboard</h1>
                    <p>Manage your health orders and prescriptions</p>
                </div>
                <div class="real-time-indicator pulse">
                    <i class="fas fa-circle"></i> System Active
                </div>
            </div>
        </div>

        <!-- Overview Section -->
        <div id="overview-section" class="dashboard-section">
            <!-- Statistics -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-number" id="totalOrders">0</div>
                        <div>Total Orders</div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-number" id="pendingOrders">0</div>
                        <div>Pending Orders</div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-number" id="totalPrescriptions">0</div>
                        <div>Total Prescriptions</div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="stat-card">
                        <div class="stat-number" id="pendingPrescriptions">0</div>
                        <div>Pending Prescriptions</div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="content-card">
                        <h5>Quick Order</h5>
                        <p>Place an order for any medicine quickly</p>
                        <button class="btn btn-primary btn-lg" onclick="startQuickOrder()">
                            <i class="fas fa-bolt me-2"></i>Quick Order
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="content-card">
                        <h5>Test GPS</h5>
                        <p>Check your location for nearest pharmacy</p>
                        <button class="btn btn-primary btn-lg" onclick="testGPS()">
                            <i class="fas fa-satellite-dish me-2"></i>Test GPS
                        </button>
                    </div>
                </div>
            </div>

            <!-- Nearest Pharmacy Info -->
            <div id="nearestPharmacyInfo" class="content-card">
                <h6 class="mb-3">
                    <i class="fas fa-map me-2"></i>Your Location & Nearby Pharmacies
                </h6>
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin me-2"></i>
                    Detecting your location...
                </div>
                <button class="btn btn-sm btn-outline-secondary mt-3" onclick="toggleMap()">
                    <i class="fas fa-eye"></i> Show Map
                </button>
            </div>

            <!-- Map -->
            <div id="mapSection" class="content-card" style="display: none;">
                <div id="pharmacyMap"></div>
            </div>
        </div>

        <!-- Medicines Section -->
        <div id="medicines-section" class="dashboard-section hidden">
            <div class="content-card">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5>Available Medicines</h5>
                    <div class="d-flex gap-2">
                        <select class="form-select" id="categoryFilter">
                            <option value="">All Categories</option>
                        </select>
                        <button class="btn btn-primary" onclick="findNearestPharmacyWithMedicine()">
                            <i class="fas fa-location-arrow me-2"></i>Find Nearest
                        </button>
                    </div>
                </div>
                <div class="row" id="medicinesContainer">
                    <!-- Medicines will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Orders Section -->
        <div id="orders-section" class="dashboard-section hidden">
            <div class="content-card">
                <h5>My Orders</h5>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Medicine</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="ordersTable">
                            <tr>
                                <td colspan="7" class="text-center text-muted">No orders yet</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Prescriptions Section -->
        <div id="prescriptions-section" class="dashboard-section hidden">
            <div class="content-card">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5>Your Prescriptions</h5>
                    <button class="btn btn-primary" onclick="showPrescriptionUpload()">
                        <i class="fas fa-upload me-2"></i>Upload Prescription
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Doctor</th>
                                <th>Date Issued</th>
                                <th>Status</th>
                                <th>Verification Code</th>
                                <th>Expires</th>
                            </tr>
                        </thead>
                        <tbody id="prescriptionsTable">
                            <tr>
                                <td colspan="7" class="text-center text-muted">No prescriptions uploaded yet</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Pharmacies Section -->
        <div id="pharmacies-section" class="dashboard-section hidden">
            <div class="content-card">
                <h5>Nearby Pharmacies</h5>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Distance</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody id="pharmaciesTable">
                            <tr>
                                <td colspan="5" class="text-center text-muted">No pharmacies found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Notifications Section -->
        <div id="notifications-section" class="dashboard-section hidden">
            <div class="content-card">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5>Notifications</h5>
                    <button class="btn btn-primary btn-sm" onclick="markAllNotificationsRead()">
                        Mark All Read
                    </button>
                </div>
                <div id="notificationsList">
                    <!-- Notifications will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Profile Section -->
        <div id="profile-section" class="dashboard-section hidden">
            <div class="content-card">
                <h5>Profile Information</h5>
                <div id="profileContent">
                    <!-- Profile will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Order Modal -->
    <div class="modal fade" id="quickOrderModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white;">
                    <h5 class="modal-title">
                        <i class="fas fa-bolt me-2"></i>Quick Order
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="quickOrderForm">
                        <div class="mb-3">
                            <label class="form-label">Your Location</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="userLocationInput" 
                                       placeholder="e.g., KN 123 St, Musanze" readonly>
                                <button class="btn btn-outline-primary" type="button" onclick="getUserGPSLocation()">
                                    <i class="fas fa-location-arrow"></i> Use GPS
                                </button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Search Medicine</label>
                            <input type="text" class="form-control" id="quickOrderSearch" 
                                   placeholder="Type medicine name..." onkeyup="searchQuickOrderMedicine()">
                            <div id="quickOrderSearchResults" class="mt-2"></div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Selected Medicine</label>
                            <input type="text" class="form-control" id="quickOrderMedicine" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Quantity</label>
                            <input type="number" class="form-control" id="quickOrderQuantity" value="1" min="1">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Delivery Address</label>
                            <textarea class="form-control" id="quickOrderAddress" rows="3" 
                                      placeholder="Enter your delivery address"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="searchQuickOrderMedicine()" id="searchMedicineBtn">
                        <i class="fas fa-search me-2"></i>Search Medicine
                    </button>
                    <button type="button" class="btn btn-success" onclick="placeQuickOrder()" id="placeOrderBtn" style="display: none;">
                        <i class="fas fa-shopping-cart me-2"></i>Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Prescription Upload Modal -->
    <div class="modal fade" id="prescriptionUploadModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white;">
                    <h5 class="modal-title">
                        <i class="fas fa-file-medical me-2"></i>Upload Prescription
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="prescriptionUploadForm">
                        <div class="mb-3">
                            <label class="form-label">Doctor Name *</label>
                            <input type="text" class="form-control" id="doctorName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Doctor License Number *</label>
                            <input type="text" class="form-control" id="doctorLicense" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date Issued *</label>
                            <input type="date" class="form-control" id="dateIssued" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Medicines Prescribed *</label>
                            <textarea class="form-control" id="medicinesPrescribed" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Prescription Image</label>
                            <input type="file" class="form-control" id="prescriptionImage" accept="image/*">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Additional Notes</label>
                            <textarea class="form-control" id="prescriptionNotes" rows="2"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                            <i class="fas fa-upload me-2"></i>Upload Securely
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Doctor Prescription Writing Modal -->
    <div class="modal fade" id="writePrescriptionModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;">
                    <h5 class="modal-title">
                        <i class="fas fa-pen me-2"></i>Write Prescription
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="writePrescriptionForm">
                        <div class="mb-3">
                            <label class="form-label">Patient Name *</label>
                            <input type="text" class="form-control" id="prescriptionPatientName" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Medicines *</label>
                            <div id="prescriptionMedicines">
                                <div class="row mb-2">
                                    <div class="col-md-5">
                                        <input type="text" class="form-control" placeholder="Medicine name" required>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" placeholder="Dosage" required>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" placeholder="Duration" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-danger btn-sm" onclick="removeMedicineItem(this)">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="addMedicineItem()">
                                <i class="fas fa-plus me-1"></i>Add Another Medicine
                            </button>
                        </div>
                        <button type="submit" class="btn btn-success w-100">
                            <i class="fas fa-check me-2"></i>Submit Prescription
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
